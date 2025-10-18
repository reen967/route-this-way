export interface SavedLocation {
  id: string;
  name: string;
  emoji?: string;
  address: string;
  latitude: number;
  longitude: number;
  createdAt: string;
}

export type TransportMode = 'walk' | 'cycle' | 'transit';
