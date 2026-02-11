import { useState, useCallback } from 'react';
import type { ArcData, RingData, VisitorData } from '../types/globe.types';

export const useRealtimeData = () => {
  const [points, setPoints] = useState<VisitorData[]>([]);
  const [arcs, setArcs] = useState<ArcData[]>([]);
  const [rings, setRings] = useState<RingData[]>([]);

  const addPoint = useCallback((point: VisitorData) => {
    setPoints(prev => [...prev, point]);
  }, []);

  const removePoint = useCallback((lat: number, lng: number) => {
    setPoints(prev => prev.filter(p => p.lat !== lat || p.lng !== lng));
  }, []);

  const clearPoints = useCallback(() => {
    setPoints([]);
  }, []);

  const addArc = useCallback((arc: ArcData) => {
    setArcs(prev => [...prev, arc]);
  }, []);

  const removeArc = useCallback((startLat: number, startLng: number) => {
    setArcs(prev => prev.filter(a => a.startLat !== startLat || a.startLng !== startLng));
  }, []);

  const clearArcs = useCallback(() => {
    setArcs([]);
  }, []);

  const addRing = useCallback((ring: RingData) => {
    setRings(prev => [...prev, ring]);
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
