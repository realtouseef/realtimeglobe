import { useEffect, useState, useCallback, useRef } from 'react';
import Globe from 'globe.gl';
import * as THREE from 'three';
import type { GlobeConfig, DataPoint, ArcData, RingData, CountryData, LabelData, VisitorData } from '../types/globe.types';

type MaterialWithMaps = THREE.Material & {
  color?: THREE.Color;
  [key: string]: THREE.Texture | THREE.Color | number | string | boolean | null | undefined;
};

type GlobeInstance = {
  globeImageUrl: (url: string | null) => GlobeInstance;
  bumpImageUrl: (url: string | null) => GlobeInstance;
  atmosphereColor: (color: string) => GlobeInstance;
  globeMaterial: () => MaterialWithMaps | null;
};

function disposeMaterialMaps(material: MaterialWithMaps | null | undefined) {
  if (!material) return;
  const mapKeys = [
    'map',
    'lightMap',
    'bumpMap',
    'normalMap',
    'specularMap',
    'envMap',
    'alphaMap',
    'aoMap',
    'displacementMap',
    'emissiveMap',
    'gradientMap',
    'metalnessMap',
    'roughnessMap'
  ];
  mapKeys.forEach((key) => {
    const texture = material[key];
    if (texture instanceof THREE.Texture) {
      texture.dispose();
      material[key] = null;
    }
  });
}

function applyThemeToGlobe(globe: GlobeInstance | null, theme: GlobeConfig['theme']) {
  if (!globe) return;
  const selectedTheme = theme || 'minimal';
  const material = globe.globeMaterial();
  disposeMaterialMaps(material);

  if (selectedTheme === 'minimal') {
    globe.globeImageUrl(null).bumpImageUrl(null);
    if (material) {
      material.color = new THREE.Color('#1a1a1a');
      material.opacity = 1;
      material.transparent = false;
    }
    globe.atmosphereColor('#3a228a');
    return;
  }

  if (selectedTheme === 'earth-night') {
    globe
      .globeImageUrl('//unpkg.com/three-globe/example/img/earth-night.jpg')
      .bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png');
    if (material) material.color = new THREE.Color('#ffffff');
    globe.atmosphereColor('#3a228a');
    return;
  }

  if (selectedTheme === 'earth-day') {
    globe
      .globeImageUrl('//unpkg.com/three-globe/example/img/earth-blue-marble.jpg')
      .bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png');
    if (material) material.color = new THREE.Color('#ffffff');
    globe.atmosphereColor('#1976d2');
  }
}

function getVisitorKey(visitor: VisitorData) {
  return `${visitor.lat.toFixed(4)}:${visitor.lng.toFixed(4)}:${visitor.label || ''}`;
}

export const useGlobe = (config: GlobeConfig) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const globeRef = useRef<any>(null);
  const [isReady, setIsReady] = useState(false);
  const isZoomedInRef = useRef<boolean | null>(null);
  const zoomThreshold = 1.4;
  const htmlElementCacheRef = useRef<Map<string, HTMLElement>>(new Map());
  const configRef = useRef(config);

  useEffect(() => {
    configRef.current = config;
  }, [config]);

  useEffect(() => {
    const currentConfig = configRef.current;
    if (!currentConfig.containerRef.current) return;

    // Initialize Globe
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const globe = (Globe as any)()(currentConfig.containerRef.current)
      .globeImageUrl(currentConfig.globeImageUrl === null ? null : (currentConfig.globeImageUrl || null))
      .bumpImageUrl(currentConfig.bumpImageUrl === null ? null : (currentConfig.bumpImageUrl || null))
      .backgroundImageUrl(currentConfig.backgroundImageUrl === null ? null : (currentConfig.backgroundImageUrl || null))
      .backgroundColor(currentConfig.backgroundColor || 'rgba(0,0,0,0)')
      .showGlobe(true)
      .showAtmosphere(currentConfig.enableAtmosphere !== false)
      .atmosphereColor(currentConfig.atmosphereColor || '#3a228a')
      .atmosphereAltitude(currentConfig.atmosphereAltitude || 0.15);

    // Optimize renderer
    const renderer = globe.renderer();
    if (renderer) {
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1));
      // Enable shadow map only if needed (not needed here)
      renderer.shadowMap.enabled = false;
      // Enable transparent background
      renderer.setClearColor(0x000000, 0);
    }

    if (currentConfig.enableAutoRotate) {
      globe.controls().autoRotate = true;
      globe.controls().autoRotateSpeed = currentConfig.autoRotateSpeed || 0.5;
    }
    
    // Set initial camera distance
    globe.pointOfView({ altitude: 2.5 });
    
    // Limit zoom out
    // Standard globe radius is 100.
    // Altitude 2.5 corresponds to distance 350 (100 * (2.5 + 1))
    // We want to limit zoom out to slightly more than this
    if (globe.controls()) {
        globe.controls().minDistance = 101; // Don't go inside earth
        globe.controls().maxDistance = 400; // Limit zoom out
    }
    
    // Set ocean color directly on the sphere material since we don't use an image
    // This allows us to have a dark grey ocean instead of black
    const globeMaterial = globe.globeMaterial();
    if (globeMaterial) {
        globeMaterial.color = new THREE.Color('#1a1a1a'); // Dark grey ocean
        globeMaterial.opacity = 1;
        globeMaterial.transparent = false;
    }

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

        if (currentConfig.containerRef.current) {
            currentConfig.containerRef.current.style.setProperty('--avatar-scale', scale.toString());
            
            // Calculate glow spread based on altitude
            // Zoomed in (alt < 2.5) -> constant glow (no shrinking)
            // Zoomed out (alt >= 2.5) -> larger glow (expanding)
            // Increased base size and expansion rate as requested
            const minGlow = 60; // Increased from 45
            const glowThreshold = 2.5;
            const glowSpread = altitude < glowThreshold 
                ? minGlow 
                : Math.min(120, minGlow + (altitude - glowThreshold) * 40); // Increased max and rate
            
            currentConfig.containerRef.current.style.setProperty('--glow-spread', `${glowSpread}%`);
            
            // Toggle zoomed-in class for city labels
            if (isZoomedIn) {
                currentConfig.containerRef.current.classList.add('zoomed-in');
            } else {
                currentConfig.containerRef.current.classList.remove('zoomed-in');
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
    
    applyThemeToGlobe(globe, currentConfig.theme);
    
    // Use setTimeout to avoid synchronous state update in effect
    setTimeout(() => {
        setIsReady(true);
    }, 0);

    // Use ResizeObserver for more robust resizing
    const resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
            if (entry.target === currentConfig.containerRef.current) {
                 if (currentConfig.containerRef.current) {
                      globe.width(currentConfig.containerRef.current.clientWidth);
                      globe.height(currentConfig.containerRef.current.clientHeight);
                 }
            }
        }
    });

    if (currentConfig.containerRef.current) {
        resizeObserver.observe(currentConfig.containerRef.current);
    }
    
    // Initial resize
    if (currentConfig.containerRef.current) {
        globe.width(currentConfig.containerRef.current.clientWidth);
        globe.height(currentConfig.containerRef.current.clientHeight);
    }

    return () => {
      // Remove event listeners
      if (globe.controls()) {
          globe.controls().removeEventListener('change', updateScale);
          globe.controls().dispose();
      }

      resizeObserver.disconnect();
      
      // Stop animation loop if possible (globe.gl doesn't expose stop directly, but disposing renderer helps)
       if (globe._destructor) globe._destructor(); // Try to call destructor if available

       // Dispose of Three.js resources
       const scene = globe.scene();
       if (scene) {
           // eslint-disable-next-line @typescript-eslint/no-explicit-any
           scene.traverse((object: any) => {
               if (!object.isMesh) return;
               
               if (object.geometry) {
                   object.geometry.dispose();
               }

               if (object.material) {
                  if (Array.isArray(object.material)) {
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      object.material.forEach((material: any) => {
                          if (material.map) material.map.dispose();
                          if (material.lightMap) material.lightMap.dispose();
                          if (material.bumpMap) material.bumpMap.dispose();
                          if (material.normalMap) material.normalMap.dispose();
                          if (material.specularMap) material.specularMap.dispose();
                          if (material.envMap) material.envMap.dispose();
                          if (material.alphaMap) material.alphaMap.dispose();
                          if (material.aoMap) material.aoMap.dispose();
                          if (material.displacementMap) material.displacementMap.dispose();
                          if (material.emissiveMap) material.emissiveMap.dispose();
                          if (material.gradientMap) material.gradientMap.dispose();
                          if (material.metalnessMap) material.metalnessMap.dispose();
                          if (material.roughnessMap) material.roughnessMap.dispose();
                          material.dispose();
                      });
                  } else {
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      const mat = object.material as any;
                      if (mat.map) mat.map.dispose();
                      if (mat.lightMap) mat.lightMap.dispose();
                      if (mat.bumpMap) mat.bumpMap.dispose();
                      if (mat.normalMap) mat.normalMap.dispose();
                      if (mat.specularMap) mat.specularMap.dispose();
                      if (mat.envMap) mat.envMap.dispose();
                      if (mat.alphaMap) mat.alphaMap.dispose();
                      if (mat.aoMap) mat.aoMap.dispose();
                      if (mat.displacementMap) mat.displacementMap.dispose();
                      if (mat.emissiveMap) mat.emissiveMap.dispose();
                      if (mat.gradientMap) mat.gradientMap.dispose();
                      if (mat.metalnessMap) mat.metalnessMap.dispose();
                      if (mat.roughnessMap) mat.roughnessMap.dispose();
                      mat.dispose();
                  }
              }
          });
      }

      const renderer = globe.renderer();
      if (renderer) {
          renderer.dispose();
          renderer.forceContextLoss();
      }

      if (currentConfig.containerRef.current) {
        currentConfig.containerRef.current.innerHTML = ''; // Clear container
      }
      globeRef.current = null;
    };
  }, []);

  // React to theme changes
  useEffect(() => {
    if (!globeRef.current) return;
    applyThemeToGlobe(globeRef.current, config.theme);
  }, [config.theme]);

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
        .pointResolution(12); // Lower resolution for better performance
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
      const theme = config.theme || 'minimal';
      
      globeRef.current.polygonsData(countries);

      if (theme === 'minimal') {
        globeRef.current
          .polygonCapColor(() => '#2b2b2b') // Dark grey for land matching screenshot
          .polygonSideColor(() => 'rgba(0, 0, 0, 0.2)')
          .polygonStrokeColor(() => '#555555'); // Lighter grey for borders
      } else {
        // For image based themes, we make polygons transparent but keep subtle borders
        globeRef.current
          .polygonCapColor(() => 'rgba(0, 0, 0, 0)') 
          .polygonSideColor(() => 'rgba(0, 0, 0, 0)')
          .polygonStrokeColor(() => 'rgba(255, 255, 255, 0.1)'); // Very subtle borders
      }
      
      globeRef.current.polygonLabel(() => ''); // Disable hover label
    }
  }, [config.theme]);

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
    if (!globeRef.current) return;
    const cache = htmlElementCacheRef.current;
    const nextKeys = new Set<string>();

    elements.forEach((element) => {
      const key = getVisitorKey(element);
      nextKeys.add(key);
      const color = element.color || '#fff';
      const avatarUrl = element.avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${element.label}`;
      const template = `
        <div class="-translate-y-1/2 pointer-events-auto cursor-pointer flex items-center absolute left-0 top-0 z-10">
          <div class="origin-left flex items-center pl-1" style="transform: scale(var(--avatar-scale, 1))">
            <div class="w-6 h-6 rounded-full border border-white/80 overflow-hidden flex items-center justify-center relative" style="background: ${color}; box-shadow: 0 0 4px ${color}">
              <img src="${avatarUrl}" class="w-full h-full object-cover" alt="Avatar" />
            </div>
          </div>
        </div>
      `;

      let el = cache.get(key);
      if (!el) {
        el = document.createElement('div');
        cache.set(key, el);
      }

      if (el.dataset.template !== template) {
        el.innerHTML = template;
        el.dataset.template = template;
        const img = el.querySelector('img');
        if (img instanceof HTMLImageElement) {
          img.loading = 'lazy';
          img.decoding = 'async';
        }
      }

      el.style.pointerEvents = 'auto';
      el.onclick = (event) => {
        event.stopPropagation();
        const clickEvent = new CustomEvent('visitor-click', { detail: element });
        window.dispatchEvent(clickEvent);
      };
    });

    cache.forEach((value, key) => {
      if (!nextKeys.has(key)) {
        value.remove();
        cache.delete(key);
      }
    });

    globeRef.current
      .htmlElementsData(elements)
      .htmlLat('lat')
      .htmlLng('lng')
      .htmlAltitude(0)
      .htmlElement((d: VisitorData) => {
        const key = getVisitorKey(d);
        return cache.get(key) || document.createElement('div');
      });
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
