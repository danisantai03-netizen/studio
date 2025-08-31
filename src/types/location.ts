// types/location.ts
export type DriverLocation = {
  id: string;        // driver id
  lat: number;
  lng: number;
  updatedAt: number; // unix ms
  heading?: number;  // optional
  speed?: number;    // optional
};
