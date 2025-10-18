import { MapPin, MoreVertical } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SavedLocation } from '@/types/location';

interface LocationCardProps {
  location: SavedLocation;
  onNavigate: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export const LocationCard = ({ location, onNavigate, onEdit, onDelete }: LocationCardProps) => {
  return (
    <Card 
      className="p-4 cursor-pointer hover:shadow-md transition-all duration-200 active:scale-98"
      onClick={onNavigate}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          {location.emoji ? (
            <div className="text-3xl flex-shrink-0">{location.emoji}</div>
          ) : (
            <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
              <MapPin className="w-6 h-6 text-accent" />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg text-foreground truncate">
              {location.name}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
              {location.address}
            </p>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
            <Button variant="ghost" size="icon" className="flex-shrink-0">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onEdit(); }}>
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={(e) => { e.stopPropagation(); onDelete(); }}
              className="text-destructive"
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </Card>
  );
};
