import { useState, useCallback } from 'react';
import type { ArcData, RingData, VisitorData } from '../types/globe.types';

const MAX_POINTS = 300;
const MAX_ARCS = 200;
const MAX_RINGS = 200;

function limitList<T>(items: T[], max: number) {
  if (items.length <= max) return items;
  return items.slice(items.length - max);
}

export const useRealtimeData = () => {
  const [points, setPoints] = useState<VisitorData[]>([]);
  const [arcs, setArcs] = useState<ArcData[]>([]);
  const [rings, setRings] = useState<RingData[]>([]);

  const addPoint = useCallback((point: VisitorData) => {
    setPoints(prev => limitList([...prev, point], MAX_POINTS));
  }, []);

  const removePoint = useCallback((lat: number, lng: number) => {
    setPoints(prev => prev.filter(p => p.lat !== lat || p.lng !== lng));
  }, []);

  const clearPoints = useCallback(() => {
    setPoints([]);
  }, []);

  const addArc = useCallback((arc: ArcData) => {
    setArcs(prev => limitList([...prev, arc], MAX_ARCS));
  }, []);

  const removeArc = useCallback((startLat: number, startLng: number) => {
    setArcs(prev => prev.filter(a => a.startLat !== startLat || a.startLng !== startLng));
  }, []);

  const clearArcs = useCallback(() => {
    setArcs([]);
  }, []);

  const addRing = useCallback((ring: RingData) => {
    setRings(prev => limitList([...prev, ring], MAX_RINGS));
  }, []);

  const clearRings = useCallback(() => {
    setRings([]);
  }, []);

  const clearAll = useCallback(() => {
    setPoints([]);
    setArcs([]);
    setRings([]);
  }, []);

  return {
    points,
    arcs,
    rings,
    addPoint,
    removePoint,
    clearPoints,
    addArc,
    removeArc,
    clearArcs,
    addRing,
    clearRings,
    clearAll
  };
};
