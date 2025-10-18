import { SavedLocation } from '@/types/location';

const STORAGE_KEY = 'quickroute_locations';

export const getLocations = (): SavedLocation[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error reading locations:', error);
    return [];
  }
};

export const saveLocations = (locations: SavedLocation[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(locations));
  } catch (error) {
    console.error('Error saving locations:', error);
  }
};

export const addLocation = (location: Omit<SavedLocation, 'id' | 'createdAt'>): SavedLocation => {
  const locations = getLocations();
  const newLocation: SavedLocation = {
    ...location,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  saveLocations([...locations, newLocation]);
  return newLocation;
};

export const updateLocation = (id: string, updates: Partial<SavedLocation>): void => {
  const locations = getLocations();
  const updated = locations.map(loc => 
    loc.id === id ? { ...loc, ...updates } : loc
  );
  saveLocations(updated);
};

export const deleteLocation = (id: string): void => {
  const locations = getLocations();
  saveLocations(locations.filter(loc => loc.id !== id));
};
