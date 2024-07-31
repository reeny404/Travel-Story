import { LatLng } from "@/types/LatLng";

function calculateCenter(positions: LatLng[]): LatLng {
  let lat = 0
  let lng = 0;
  const totalCount = positions.length;

  for (let i = 0; i < totalCount; i++) {
    const item = positions[i];
    lat += item.lat;
    lng += item.lng;
  }

  return { lat: lat / totalCount, lng: lng / totalCount };
}

export const LatLngUtil = {
  calculateCenter
};