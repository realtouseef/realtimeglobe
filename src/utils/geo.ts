
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Position = any[]; // [lng, lat]
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Polygon = any[][]; // array of rings
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type MultiPolygon = any[][][]; // array of polygons

interface Geometry {
  type: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  coordinates: any;
}

interface Feature {
  type: "Feature";
  geometry: Geometry;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  properties: Record<string, any>;
}

export function getGeoCentroid(feature: Feature): { lat: number, lng: number } | null {
  const { geometry } = feature;

  if (!geometry || !geometry.coordinates) return null;

  if (geometry.type === 'Polygon') {
    return getPolygonCenter(geometry.coordinates as Polygon);
  } else if (geometry.type === 'MultiPolygon') {
    return getMultiPolygonCenter(geometry.coordinates as MultiPolygon);
  }

  return null;
}

function getPolygonCenter(polygon: Polygon): { lat: number, lng: number } {
  // First ring is the outer boundary
  const ring = polygon[0];
  let minLng = 180, maxLng = -180, minLat = 90, maxLat = -90;

  // Simple bounding box center
  // Note: This doesn't handle the antimeridian (180/-180) crossing perfectly 
  // but suffices for basic visualization of countries.
  ring.forEach((pos: Position) => {
    const lng = pos[0];
    const lat = pos[1];
    if (lng < minLng) minLng = lng;
    if (lng > maxLng) maxLng = lng;
    if (lat < minLat) minLat = lat;
    if (lat > maxLat) maxLat = lat;
  });

  return {
    lat: (minLat + maxLat) / 2,
    lng: (minLng + maxLng) / 2
  };
}

function getMultiPolygonCenter(multiPolygon: MultiPolygon): { lat: number, lng: number } {
  // Find the largest polygon by number of points in outer ring
  // This is a heuristic: more points usually means larger or more detailed main landmass
  let maxPoints = 0;
  let largestPolygonIndex = 0;

  multiPolygon.forEach((polygon, index) => {
    if (polygon[0].length > maxPoints) {
      maxPoints = polygon[0].length;
      largestPolygonIndex = index;
    }
  });

  return getPolygonCenter(multiPolygon[largestPolygonIndex]);
}
