import type { MutableRefObject } from 'react';

export interface GlobeConfig {
  containerRef: MutableRefObject<HTMLDivElement | null>;
  globeImageUrl?: string | null;
  bumpImageUrl?: string | null;
  backgroundImageUrl?: string | null;
  enableAutoRotate?: boolean;
  autoRotateSpeed?: number;
  backgroundColor?: string;
  atmosphereColor?: string;
  atmosphereAltitude?: number;
  enableAtmosphere?: boolean;
}

export interface DataPoint {
  lat: number;
  lng: number;
  color?: string;
  size?: number;
  altitude?: number;
  label?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  customData?: any;
}

export interface ArcData {
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  color?: string | string[];
  altitude?: number;
  strokeWidth?: number;
  dashLength?: number;
  dashGap?: number;
  animationTime?: number;
}

export interface RingData {
  lat: number;
  lng: number;
  maxRadius?: number;
  propagationSpeed?: number;
  repeatPeriod?: number;
  color?: string;
}

export interface CountryData {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  geometry: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  properties: any;
  type: string;
}

export interface LabelData {
  lat: number;
  lng: number;
  label: string;
  size?: number;
  color?: string;
  dotRadius?: number;
  altitude?: number;
}

export interface GlobeProps {
  config?: Partial<Omit<GlobeConfig, 'containerRef'>>;
  points?: DataPoint[];
  arcs?: ArcData[];
  rings?: RingData[];
  countries?: CountryData[];
  labels?: LabelData[];
  onPointClick?: (point: DataPoint, event: MouseEvent) => void;
  onGlobeReady?: () => void;
  width?: number;
  height?: number;
}
