
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Clock } from 'lucide-react';
import { formatCurrency, formatDateRange } from '../../utils/helper';
import { Badge } from '../ui/badge';
import { Event } from '../../utils/type';

interface EventCardProps {
    event: Event;
  }


  export default function EventCard({ event }: EventCardProps) {
  return (
    <Link to={`/event/${event.id}`} className="block">
      <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-border card-hover transition-all duration-300 h-full">
        <div className="relative h-48 overflow-hidden">
            <div className='size-full absolute bg-gradient-to-b from-black/10 to-black'/>
          <img 
            src={event.image} 
            alt={event.title} 
            className="w-full h-full object-cover  z-20 transition-transform duration-700 hover:scale-105"
          />
          {event.featured && (
            <span className="absolute top-2 right-2 bg-purple-700 text-primary-foreground text-xs px-2 py-1 rounded-full">
              Featured
            </span>
          )}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
            <div className="flex items-center text-white gap-1">
              <img 
                src={event.organizer.logo || "https://via.placeholder.com/30"} 
                alt={event.organizer.name}
                className="w-6 h-6 rounded- object-contain mr-1"
              />
              <span className="text-xs">{event.organizer.name}</span>
            </div>
          </div>
        </div>
        <div className="p-4">
          <div className="flex items-center text-sm text-muted-foreground mb-2">
            <Calendar className="h-4 w-4 mr-1" />
            <span>{formatDateRange(event.startDate, event.endDate)}</span>
            <span className="mx-2">•</span>
            <MapPin className="h-4 w-4 mr-1" />
            <span>{event.location.city}</span>
          </div>
          <h3 className="font-semibold text-lg mb-2 line-clamp-1">{event.title}</h3>
          <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
            {event.description}
          </p>
          <div className="flex flex-wrap gap-1 mb-3">
            {event.tags.slice(0, 3).map(tag => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
            {event.tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{event.tags.length - 3}
              </Badge>
            )}
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center text-xs text-muted-foreground">
              <Clock className="h-3 w-3 mr-1" />
              <span>{event.duration}</span>
            </div>
            <span className="font-semibold text-primary">{formatCurrency(event.price)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};


