import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LocationCard } from '@/components/LocationCard';
import { TransportModeSheet } from '@/components/TransportModeSheet';
import { AddLocationDialog } from '@/components/AddLocationDialog';
import { SavedLocation, TransportMode } from '@/types/location';
import { getLocations, addLocation, updateLocation, deleteLocation } from '@/utils/locationStorage';
import { openNavigation } from '@/utils/navigation';
import { toast } from '@/hooks/use-toast';

const Index = () => {
  const [locations, setLocations] = useState<SavedLocation[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<SavedLocation | null>(null);
  const [showTransportSheet, setShowTransportSheet] = useState(false);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [editingLocation, setEditingLocation] = useState<SavedLocation | null>(null);

  useEffect(() => {
    setLocations(getLocations());
  }, []);

  const handleNavigate = (location: SavedLocation) => {
    setSelectedLocation(location);
    setShowTransportSheet(true);
  };

  const handleSelectMode = (mode: TransportMode) => {
    if (selectedLocation) {
      openNavigation(selectedLocation.latitude, selectedLocation.longitude, mode);
    }
  };

  const handleAddLocation = (locationData: Omit<SavedLocation, 'id' | 'createdAt'>) => {
    if (editingLocation) {
      updateLocation(editingLocation.id, locationData);
      setLocations(getLocations());
      setEditingLocation(null);
    } else {
      addLocation(locationData);
      setLocations(getLocations());
    }
  };

  const handleEdit = (location: SavedLocation) => {
    setEditingLocation(location);
    setShowAddDialog(true);
  };

  const handleDelete = (location: SavedLocation) => {
    if (confirm(`Delete "${location.name}"?`)) {
      deleteLocation(location.id);
      setLocations(getLocations());
      toast({
        title: 'Location deleted',
        description: `${location.name} has been removed`,
      });
    }
  };

  const handleCloseDialog = () => {
    setShowAddDialog(false);
    setEditingLocation(null);
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">QuickRoute</h1>
          <p className="text-muted-foreground">Your frequently visited places</p>
        </div>

        {locations.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
              <Plus className="w-10 h-10 text-accent" />
            </div>
            <h2 className="text-xl font-semibold mb-2">No locations yet</h2>
            <p className="text-muted-foreground mb-6">
              Add your first location to get started
            </p>
          </div>
        ) : (
          <div className="grid gap-3">
            {locations.map((location) => (
              <LocationCard
                key={location.id}
                location={location}
                onNavigate={() => handleNavigate(location)}
                onEdit={() => handleEdit(location)}
                onDelete={() => handleDelete(location)}
              />
            ))}
          </div>
        )}
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background via-background to-transparent">
        <div className="max-w-2xl mx-auto">
          <Button
            onClick={() => setShowAddDialog(true)}
            className="w-full h-14 text-lg rounded-2xl shadow-lg"
            size="lg"
          >
            <Plus className="w-6 h-6 mr-2" />
            Add Location
          </Button>
        </div>
      </div>

      <TransportModeSheet
        open={showTransportSheet}
        onClose={() => setShowTransportSheet(false)}
        onSelectMode={handleSelectMode}
        locationName={selectedLocation?.name || ''}
      />

      <AddLocationDialog
        open={showAddDialog}
        onClose={handleCloseDialog}
        onAdd={handleAddLocation}
        editLocation={editingLocation || undefined}
      />
    </div>
  );
};

export default Index;
