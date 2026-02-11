import { useRef, useEffect, memo } from 'react';
import { useGlobe } from '../hooks/useGlobe';
import type { GlobeProps } from '../types/globe.types';

export const Globe = memo((props: GlobeProps) => {
  const {
    config = {},
    points = [],
    arcs = [],
    rings = [],
    countries = [],
    labels = [],
    htmlElements = [],
    onPointClick,
    onGlobeReady,
    width,
    height,
    getScreenCoords: getScreenCoordsCallback
  } = props;

  const containerRef = useRef<HTMLDivElement>(null);
  
  const { globeRef, isReady, updatePoints, updateArcs, updateRings, updateCountries, updateLabels, updateHtmlElements, getScreenCoords } = useGlobe({
    containerRef,
    ...config
  });

  // Expose getScreenCoords to parent if requested
  useEffect(() => {
    if (isReady && getScreenCoordsCallback) {
        getScreenCoordsCallback(getScreenCoords);
    }
  }, [isReady, getScreenCoords, getScreenCoordsCallback]);

  // Handle updates when data props change
  useEffect(() => {
    if (isReady) {
      updatePoints(points);
    }
  }, [isReady, points, updatePoints]);

  useEffect(() => {
    if (isReady) {
      updateArcs(arcs);
    }
  }, [isReady, arcs, updateArcs]);

  useEffect(() => {
    if (isReady) {
      updateRings(rings);
    }
  }, [isReady, rings, updateRings]);

  useEffect(() => {
    if (isReady) {
      updateCountries(countries);
    }
  }, [isReady, countries, updateCountries]);

  useEffect(() => {
    if (isReady) {
      updateLabels(labels);
    }
  }, [isReady, labels, updateLabels]);

  useEffect(() => {
    if (isReady) {
      updateHtmlElements(htmlElements);
    }
  }, [isReady, htmlElements, updateHtmlElements]);

  // Handle callbacks
  useEffect(() => {
    if (isReady && globeRef.current) {
      if (onPointClick) {
        globeRef.current.onPointClick(onPointClick);
        
        // Listen for custom visitor click events from html elements
        const handleVisitorClick = (e: Event) => {
            const customEvent = e as CustomEvent;
            if (customEvent.detail && onPointClick) {
                // Pass null for mouse event as it's a custom event dispatch
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                onPointClick(customEvent.detail, null as any, null);
            }
        };
        
        window.addEventListener('visitor-click', handleVisitorClick);
        
        return () => {
            window.removeEventListener('visitor-click', handleVisitorClick);
        };
      }
      
      if (onGlobeReady) {
        onGlobeReady();
      }
    }
  }, [isReady, globeRef, onPointClick, onGlobeReady]);

  // Handle size updates if props change
  useEffect(() => {
      if (isReady && globeRef.current && (width || height)) {
          if (width) globeRef.current.width(width);
          if (height) globeRef.current.height(height);
      }
  }, [isReady, globeRef, width, height]);

  return (
    <>
        <div 
          ref={containerRef} 
          style={{  
            width: width ? `${width}px` : '100%', 
            height: height ? `${height}px` : '100%',
            position: 'relative',
            overflow: 'hidden' 
          }} 
        />
    </>
  );
});
