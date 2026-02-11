import { useEffect, useState, useCallback, useRef } from 'react';
import Globe from 'globe.gl';
import * as THREE from 'three';
import type { GlobeConfig, DataPoint, ArcData, RingData, CountryData, LabelData, VisitorData } from '../types/globe.types';

export const useGlobe = (config: GlobeConfig) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const globeRef = useRef<any>(null);
  const [isReady, setIsReady] = useState(false);
  const isZoomedInRef = useRef<boolean | null>(null);
  const zoomThreshold = 1.4;

  useEffect(() => {
    if (!config.containerRef.current) return;

    // Initialize Globe
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const globe = (Globe as any)()(config.containerRef.current)
      .globeImageUrl(config.globeImageUrl === null ? null : (config.globeImageUrl || '//unpkg.com/three-globe/example/img/earth-night.jpg'))
      .bumpImageUrl(config.bumpImageUrl === null ? null : (config.bumpImageUrl || '//unpkg.com/three-globe/example/img/earth-topology.png'))
      .backgroundImageUrl(config.backgroundImageUrl === null ? null : (config.backgroundImageUrl || '//unpkg.com/three-globe/example/img/night-sky.png'))
      .backgroundColor(config.backgroundColor || '#000011')
      .showGlobe(true)
      .showAtmosphere(config.enableAtmosphere !== false)
      .atmosphereColor(config.atmosphereColor || '#3a228a')
      .atmosphereAltitude(config.atmosphereAltitude || 0.15);

    // Optimize renderer
    const renderer = globe.renderer();
    if (renderer) {
      // Limit pixel ratio to 2 to avoid performance issues on high-DPI screens
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      // Enable shadow map only if needed (not needed here)
      renderer.shadowMap.enabled = false;
    }

    if (config.enableAutoRotate) {
      globe.controls().autoRotate = true;
      globe.controls().autoRotateSpeed = config.autoRotateSpeed || 0.5;
    }
    
    // Set initial camera distance
    globe.pointOfView({ altitude: 2.5 });

    // Handle Zoom to scale avatars appropriately
    // When zooming in (altitude decreases), we want the avatar to grow to match the growing dot
    const updateScale = () => {
        const altitude = globe.pointOfView().altitude;
        // Base altitude is 2.5. 
        // We invert the relationship: as altitude gets smaller, scale gets larger.
        // Scale = 2.5 / altitude
        // Clamp minimum altitude to avoid infinity, and cap max scale
        const scale = Math.min(10, 2.5 / Math.max(0.2, altitude));
        
        const isZoomedIn = altitude < zoomThreshold;

        if (config.containerRef.current) {
            config.containerRef.current.style.setProperty('--avatar-scale', scale.toString());
            
            // Toggle zoomed-in class for city labels
            if (isZoomedIn) {
                config.containerRef.current.classList.add('zoomed-in');
            } else {
                config.containerRef.current.classList.remove('zoomed-in');
            }
        }

        // Update label size based on zoom
        // Show city labels when altitude is low (< 1.2)
        // Only update if state changed to prevent performance issues
        if (isZoomedIn !== isZoomedInRef.current) {
            isZoomedInRef.current = isZoomedIn;
            globe.labelSize((d: LabelData) => {
                if (d.type === 'city') {
                    return isZoomedIn ? (d.size || 0.5) : 0;
                }
                return d.size || 0.6;
            });
            
            // Also toggle dot radius for cities so they disappear when zoomed out
            globe.labelDotRadius((d: LabelData) => {
                if (d.type === 'city') {
                    return isZoomedIn ? (d.dotRadius || 0.3) : 0;
                }
                return d.dotRadius || 0;
            });
        }
    };
    
    globe.controls().addEventListener('change', updateScale);
    updateScale(); // Initial call

    // Custom Lighting
    const scene = globe.scene();
    
    // Ambient light (soft)
    const ambientLight = new THREE.AmbientLight(0xbbbbbb, 0.3);
    scene.add(ambientLight);

    // Directional Light 1 (Top Right)
    const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.5);
    dirLight1.position.set(50, 50, 50);
    scene.add(dirLight1);

    // Directional Light 2 (Bottom Left - darker/blueish for depth)
    const dirLight2 = new THREE.DirectionalLight(0x4a5fff, 0.5);
    dirLight2.position.set(-50, -50, 50);
    scene.add(dirLight2);

    globeRef.current = globe;
    
    // Use setTimeout to avoid synchronous state update in effect
    setTimeout(() => {
        setIsReady(true);
    }, 0);

    const handleResize = () => {
        if (config.containerRef.current) {
            globe.width(config.containerRef.current.clientWidth);
            globe.height(config.containerRef.current.clientHeight);
        }
    };
    
    // Debounce resize to prevent excessive updates
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let resizeTimeout: any;
    const debouncedResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(handleResize, 100);
    };
    
    window.addEventListener('resize', debouncedResize);
    // Initial resize
    handleResize();

    return () => {
      window.removeEventListener('resize', debouncedResize);
      clearTimeout(resizeTimeout);
      const renderer = globe.renderer();
      if (renderer) {
          renderer.dispose();
          // Also dispose controls to prevent memory leaks
          if (globe.controls()) globe.controls().dispose();
      }
      if (config.containerRef.current) {
        config.containerRef.current.innerHTML = ''; // Clear container
      }
      globeRef.current = null;
    };
  }, [config.containerRef]); // Only run once on mount when ref is available

  // Memoize update functions to prevent unnecessary re-renders
  const updatePoints = useCallback((points: DataPoint[]) => {
    if (globeRef.current) {
      globeRef.current
        .pointsData(points)
        .pointLat('lat')
        .pointLng('lng')
        .pointColor('color')
        .pointAltitude(0.001) // Very close to surface
        .pointRadius('size')
        .pointLabel('label')
        .pointResolution(32); // Higher resolution for smoother circles
    }
  }, []);

  const updateArcs = useCallback((arcs: ArcData[]) => {
    if (globeRef.current) {
      globeRef.current
        .arcsData(arcs)
        .arcStartLat('startLat')
        .arcStartLng('startLng')
        .arcEndLat('endLat')
        .arcEndLng('endLng')
        .arcColor('color')
        .arcAltitude('altitude')
        .arcStroke('strokeWidth')
        .arcDashLength('dashLength')
        .arcDashGap('dashGap')
        .arcDashAnimateTime('animationTime');
    }
  }, []);

  const updateRings = useCallback((rings: RingData[]) => {
    if (globeRef.current) {
      globeRef.current
        .ringsData(rings)
        .ringLat('lat')
        .ringLng('lng')
        .ringMaxRadius('maxRadius')
        .ringPropagationSpeed('propagationSpeed')
        .ringRepeatPeriod('repeatPeriod')
        .ringColor('color');
    }
  }, []);

  const updateCountries = useCallback((countries: CountryData[]) => {
    if (globeRef.current) {
      globeRef.current
        .polygonsData(countries)
        .polygonCapColor(() => 'rgba(0, 0, 0, 0)') // Transparent cap to show earth texture
        .polygonSideColor(() => 'rgba(255, 255, 255, 0.05)')
        .polygonStrokeColor(() => 'rgba(255, 255, 255, 0.15)') // Subtle borders
        .polygonLabel(() => ''); // Disable hover label as we use static labels now
    }
  }, []);

  const updateLabels = useCallback((labels: LabelData[]) => {
    if (globeRef.current) {
      const altitude = globeRef.current.pointOfView().altitude;
      const isZoomedIn = altitude < zoomThreshold;
      globeRef.current
        .labelsData(labels)
        .labelLat('lat')
        .labelLng('lng')
        .labelText('label')
        .labelSize((d: LabelData) => {
            if (d.type === 'city') {
                return isZoomedIn ? (d.size || 0.5) : 0;
            }
            return d.size || 0.6;
        })
        .labelDotRadius((d: LabelData) => {
            if (d.type === 'city') {
                return isZoomedIn ? (d.dotRadius || 0.3) : 0;
            }
            return d.dotRadius || 0;
        })
        .labelColor('color')
        .labelAltitude('altitude')
        .labelResolution(2);
    }
  }, []);

  const updateHtmlElements = useCallback((elements: VisitorData[]) => {
    if (globeRef.current) {
        globeRef.current
            .htmlElementsData(elements)
            .htmlLat('lat')
            .htmlLng('lng')
            .htmlAltitude(0) // Stick to surface
            .htmlElement((d: VisitorData) => {
                const el = document.createElement('div');
                // Center the avatar on the dot (lat/lng) but offset slightly to the right to be "next to" it
                el.innerHTML = `
                    <div style="
                        transform: translate(0%, -50%); /* Vertically center */
                        pointer-events: auto;
                        cursor: pointer;
                        display: flex;
                        align-items: center;
                        position: absolute;
                        left: 0;
                        top: 0;
                        z-index: 10; /* Ensure on top */
                    ">
                        <!-- Wrapper for positioning and scaling -->
                        <div style="
                            transform: scale(var(--avatar-scale, 1));
                            transform-origin: left center;
                            display: flex;
                            align-items: center;
                            padding-left: 4px; /* Small gap from the center point (where dot is) */
                        ">
                            <!-- Avatar -->
                            <div style="
                                width: 24px; 
                                height: 24px; 
                                border-radius: 50%; 
                                background: ${d.color || '#fff'}; 
                                border: 1px solid rgba(255, 255, 255, 0.8);
                                box-shadow: 0 0 4px ${d.color || '#fff'};
                                overflow: hidden;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                position: relative;
                            ">
                                <img src="${d.avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${d.label}`}" 
                                     style="width: 100%; height: 100%; object-fit: cover;" 
                                     alt="Avatar" />
                            </div>
                            
                            <!-- City Label (Hidden by default, shown when zoomed in) -->
                            <div class="city-label" style="
                                margin-left: 8px;
                                background: rgba(0, 0, 0, 0.7);
                                padding: 2px 6px;
                                border-radius: 4px;
                                color: #fff;
                                font-size: 12px;
                                white-space: nowrap;
                                font-family: sans-serif;
                                border: 1px solid rgba(255, 255, 255, 0.3);
                                opacity: 0;
                                transition: opacity 0.3s ease;
                                pointer-events: none;
                            ">
                                ${d.city || ''}
                            </div>
                        </div>
                    </div>
                `;
                
                // Add click listener
                el.style.pointerEvents = 'auto';
                el.onclick = (e) => {
                    e.stopPropagation();
                    // Dispatch event for Globe.tsx to pick up
                    const event = new CustomEvent('visitor-click', { detail: d });
                    window.dispatchEvent(event);
                };

                return el;
            });
    }
  }, []);

  const getScreenCoords = useCallback((lat: number, lng: number, altitude: number = 0) => {
    if (!globeRef.current) return null;
    return globeRef.current.getScreenCoords(lat, lng, altitude);
  }, []);

  return {
    globeRef,
    isReady,
    updatePoints,
    updateArcs,
    updateRings,
    updateCountries,
    updateLabels,
    updateHtmlElements,
    getScreenCoords
  };
};
