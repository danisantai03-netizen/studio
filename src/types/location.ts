
// types/location.ts
export type TripPhase = 'REQUESTED' | 'ACCEPTED' | 'ON_THE_WAY' | 'ARRIVED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELED';
export type DriverRT = { 
  id: string; 
  lat: number; 
  lng: number; 
  bearing?: number; 
  name: string; 
  vehicle: string; 
  plate: string; 
  avatar?: string; 
};
export type Dropoff = { 
  id: string; 
  label: string; 
  lat: number; 
  lng: number; 
  distanceM?: number 
};

/**
 * Calculates a bounding box that encompasses two points with a specified padding in meters.
 * @param a - The first point [lat, lng].
 * @param b - The second point [lat, lng].
 * @param padMeters - The padding to add around the bounds in meters.
 * @returns A tuple containing the southwest and northeast corners of the padded bounding box.
 */
export function padBoundsAround(a: [number, number], b: [number, number], padMeters = 2000): [[number, number], [number, number]] {
  const sw: [number, number] = [Math.min(a[0], b[0]), Math.min(a[1], b[1])];
  const ne: [number, number] = [Math.max(a[0], b[0]), Math.max(a[1], b[1])];
  
  // A simple approximation for converting meters to degrees, suitable for city-scale distances.
  const dLat = padMeters / 111000; // ~111km per degree latitude
  const dLng = padMeters / (111320 * Math.cos(((a[0] + b[0]) / 2) * (Math.PI / 180)));
  
  return [
    [sw[0] - dLat, sw[1] - dLng],
    [ne[0] + dLat, ne[1] + dLng]
  ];
}
