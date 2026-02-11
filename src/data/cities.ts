export interface City {
  name: string;
  lat: number;
  lng: number;
  population?: number;
}

export const CITIES: City[] = [
  { name: 'New York', lat: 40.7128, lng: -74.0060 },
  { name: 'London', lat: 51.5074, lng: -0.1278 },
  { name: 'Tokyo', lat: 35.6762, lng: 139.6503 },
  { name: 'Paris', lat: 48.8566, lng: 2.3522 },
  { name: 'Shanghai', lat: 31.2304, lng: 121.4737 },
  { name: 'Singapore', lat: 1.3521, lng: 103.8198 },
  { name: 'Dubai', lat: 25.2048, lng: 55.2708 },
  { name: 'Sydney', lat: -33.8688, lng: 151.2093 },
  { name: 'Sao Paulo', lat: -23.5505, lng: -46.6333 },
  { name: 'Mumbai', lat: 19.0760, lng: 72.8777 },
  { name: 'Cairo', lat: 30.0444, lng: 31.2357 },
  { name: 'Moscow', lat: 55.7558, lng: 37.6173 },
  { name: 'Istanbul', lat: 41.0082, lng: 28.9784 },
  { name: 'Los Angeles', lat: 34.0522, lng: -118.2437 },
  { name: 'Bangkok', lat: 13.7563, lng: 100.5018 },
  { name: 'Seoul', lat: 37.5665, lng: 126.9780 },
  { name: 'Mexico City', lat: 19.4326, lng: -99.1332 },
  { name: 'Beijing', lat: 39.9042, lng: 116.4074 },
  { name: 'Jakarta', lat: -6.2088, lng: 106.8456 },
  { name: 'Lagos', lat: 6.5244, lng: 3.3792 },
  { name: 'Delhi', lat: 28.6139, lng: 77.2090 },
  { name: 'Karachi', lat: 24.8607, lng: 67.0011 },
  { name: 'Dhaka', lat: 23.8103, lng: 90.4125 },
  { name: 'Manila', lat: 14.5995, lng: 120.9842 },
  { name: 'Rio de Janeiro', lat: -22.9068, lng: -43.1729 }
];
