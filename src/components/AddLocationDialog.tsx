import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface AddLocationDialogProps {
  open: boolean;
  onClose: () => void;
  onAdd: (location: {
    name: string;
    emoji?: string;
    address: string;
    latitude: number;
    longitude: number;
  }) => void;
  editLocation?: {
    id: string;
    name: string;
    emoji?: string;
    address: string;
    latitude: number;
    longitude: number;
  };
}

export const AddLocationDialog = ({ 
  open, 
  onClose, 
  onAdd,
  editLocation 
}: AddLocationDialogProps) => {
  const [name, setName] = useState(editLocation?.name || '');
  const [emoji, setEmoji] = useState(editLocation?.emoji || '');
  const [address, setAddress] = useState(editLocation?.address || '');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !address.trim()) {
      toast({
        title: 'Missing information',
        description: 'Please provide both name and address',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('geocode', {
        body: { address: address.trim() },
      });

      if (error) throw error;

      if (data.error) {
        toast({
          title: 'Address not found',
          description: 'Please check the address and try again',
          variant: 'destructive',
        });
        return;
      }

      onAdd({
        name: name.trim(),
        emoji: emoji.trim() || undefined,
        address: data.displayName,
        latitude: data.latitude,
        longitude: data.longitude,
      });

      setName('');
      setEmoji('');
      setAddress('');
      onClose();
      
      toast({
        title: editLocation ? 'Location updated' : 'Location added',
        description: `${name} has been ${editLocation ? 'updated' : 'saved'} successfully`,
      });
    } catch (error) {
      console.error('Geocoding error:', error);
      toast({
        title: 'Error',
        description: 'Failed to geocode address. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{editLocation ? 'Edit Location' : 'Add New Location'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                placeholder="e.g., Home, Work, Gym"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={50}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="emoji">Emoji (optional)</Label>
              <Input
                id="emoji"
                placeholder="🏠"
                value={emoji}
                onChange={(e) => setEmoji(e.target.value)}
                maxLength={2}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address *</Label>
              <Input
                id="address"
                placeholder="123 Main St, City, Country"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                maxLength={200}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="secondary"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {editLocation ? 'Updating...' : 'Adding...'}
                </>
              ) : (
                editLocation ? 'Update' : 'Add Location'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
