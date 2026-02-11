import { useEffect, useState, useCallback, useRef } from 'react';
import Globe from 'globe.gl';
import * as THREE from 'three';
import type { GlobeConfig, DataPoint, ArcData, RingData, CountryData, LabelData } from '../types/globe.types';

export const useGlobe = (config: GlobeConfig) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const globeRef = useRef<any>(null);
  const [isReady, setIsReady] = useState(false);

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
        .pointAltitude('altitude')
        .pointRadius('size')
        .pointLabel('label');
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
      globeRef.current
        .labelsData(labels)
        .labelLat('lat')
        .labelLng('lng')
        .labelText('label')
        .labelSize('size')
        .labelDotRadius('dotRadius')
        .labelColor('color')
        .labelAltitude('altitude')
        .labelResolution(2);
    }
  }, []);

  return {
    globeRef,
    isReady,
    updatePoints,
    updateArcs,
    updateRings,
    updateCountries,
    updateLabels
  };
};
