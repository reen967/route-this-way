import { TransportMode } from '@/types/location';

export const openNavigation = (
  latitude: number,
  longitude: number,
  address: string,
  mode: TransportMode
): void => {
  const coordinateDestination = `${latitude},${longitude}`;

  if (mode === 'transit') {
    // Try Google Maps first for public transit - use address for better routing
    const googleMapsApp = `comgooglemaps://?daddr=${encodeURIComponent(address)}&directionsmode=transit`;
    const googleMapsWeb = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}&travelmode=transit`;
    
    // Try to open Google Maps app, fallback to web
    window.location.href = googleMapsApp;
    
    // Set a timeout to open web version if app doesn't open
    setTimeout(() => {
      window.open(googleMapsWeb, '_blank');
    }, 500);
  } else {
    // Use Apple Maps for walking and cycling
    const directionFlag = mode === 'walk' ? 'w' : 'b'; // w = walking, b = bicycling
    const appleMapsUrl = `http://maps.apple.com/?daddr=${coordinateDestination}&dirflg=${directionFlag}`;
    window.location.href = appleMapsUrl;
  }
};
