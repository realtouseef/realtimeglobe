import React, { useRef, useEffect, memo } from 'react';
import { useGlobe } from '../hooks/useGlobe';
import type { GlobeProps } from '../types/globe.types';

export const Globe = memo(({
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
  
  const { globeRef, isReady, updatePoints, updateArcs, updateRings, updateCountries, updateLabels } = useGlobe({
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
    if (isReady && globeRef.current) {
      if (onPointClick) {
        globeRef.current.onPointClick(onPointClick);
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
});
