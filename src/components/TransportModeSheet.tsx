import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Footprints, Bike, Bus } from 'lucide-react';
import { TransportMode } from '@/types/location';

interface TransportModeSheetProps {
  open: boolean;
  onClose: () => void;
  onSelectMode: (mode: TransportMode) => void;
  locationName: string;
}

export const TransportModeSheet = ({ 
  open, 
  onClose, 
  onSelectMode, 
  locationName 
}: TransportModeSheetProps) => {
  const handleSelect = (mode: TransportMode) => {
    onSelectMode(mode);
    onClose();
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="bottom" className="rounded-t-3xl">
        <SheetHeader className="mb-6">
          <SheetTitle className="text-center">Navigate to {locationName}</SheetTitle>
        </SheetHeader>
        <div className="space-y-3 pb-6">
          <Button
            onClick={() => handleSelect('walk')}
            className="w-full h-16 text-lg flex items-center justify-start gap-4 px-6"
            variant="secondary"
          >
            <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
              <Footprints className="w-5 h-5 text-accent" />
            </div>
            <span>Walk</span>
          </Button>
          <Button
            onClick={() => handleSelect('cycle')}
            className="w-full h-16 text-lg flex items-center justify-start gap-4 px-6"
            variant="secondary"
          >
            <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
              <Bike className="w-5 h-5 text-accent" />
            </div>
            <span>Cycle</span>
          </Button>
          <Button
            onClick={() => handleSelect('transit')}
            className="w-full h-16 text-lg flex items-center justify-start gap-4 px-6"
            variant="secondary"
          >
            <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
              <Bus className="w-5 h-5 text-accent" />
            </div>
            <span>Public Transport</span>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};
