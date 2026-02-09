import { useRef, useEffect } from 'react';
import { useGlobe } from '../hooks/useGlobe';
import type { GlobeProps } from '../types/globe.types';

export const Globe = ({
  config = {},
  points = [],
  arcs = [],
  rings = [],
  countries = [],
  labels = [],
  onPointClick,
  onGlobeReady,
  width,
  height
}: GlobeProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { globe, isReady, updatePoints, updateArcs, updateRings, updateCountries, updateLabels } = useGlobe({
    containerRef,
    ...config
  });

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

  // Handle callbacks
  useEffect(() => {
    if (isReady && globe) {
      if (onPointClick) {
        globe.onPointClick(onPointClick);
      }
      
      if (onGlobeReady) {
        onGlobeReady();
      }
    }
  }, [isReady, globe, onPointClick, onGlobeReady]);

  // Handle size updates if props change
  useEffect(() => {
      if (isReady && globe && (width || height)) {
          if (width) globe.width(width);
          if (height) globe.height(height);
      }
  }, [isReady, globe, width, height]);

  return (
    <div 
      ref={containerRef} 
      style={{ 
        width: width ? `${width}px` : '100%', 
        height: height ? `${height}px` : '100%',
        position: 'relative',
        overflow: 'hidden' 
      }} 
    />
  );
};
