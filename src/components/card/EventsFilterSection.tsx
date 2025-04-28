import React, { useEffect, useState } from 'react'
import { events, getEventsByCategory, getEventsByCity, getEventsByDuration } from '../../utils/events';
import { useNavigate } from 'react-router-dom';
import { FilterOptions } from '../../utils/type';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import EventFilter from './EventFilter';
import EventCard from './EventCard';
import { Button } from '../ui/button';

const EventsFilterSection = () => {
    const navigate = useNavigate();
    const [filteredEvents, setFilteredEvents] = useState<Event[]>(events);
    const [filters, setFilters] = useState<FilterOptions>({
      category: null,
      city: null,
      date: null,
      priceRange: [0, 200000],
      tags: null,
      duration: null
    });
    const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
    const [mapHeight, setMapHeight] = useState('600px');
    useEffect(() => {
        let result = [...events];
        
        if (filters.category) {
          result = getEventsByCategory(filters.category);
        }
        
        if (filters.city) {
          result = getEventsByCity(filters.city);
        }
        
        if (filters.tags && filters.tags.length > 0) {
          result = result.filter(event => 
            filters.tags!.some(tag => event.tags.includes(tag))
          );
        }
        
        if (filters.duration) {
          result = getEventsByDuration(filters.duration);
        }
        
        if (filters.priceRange) {
          const [min, max] = filters.priceRange;
          result = result.filter(event => event.price >= min && event.price <= max);
        }
        
        setFilteredEvents(result);
      }, [filters]);
      const handleFilterChange = (newFilters: FilterOptions) => {
        setFilters(newFilters);
      };
    
      const resetFilters = () => {
        setFilters({
          category: null,
          city: null,
          date: null,
          priceRange: [0, 200000],
          tags: null,
          duration: null
        });
      };
  return (
    <section className="py-12 px-4 bg-secondary/20">
    <div className="container mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start mb-8">
        <h2 className="text-2xl font-semibold mb-4 md:mb-0 text-primary">All Events</h2>
        <Tabs 
          value={viewMode} 
          onValueChange={(value) => setViewMode(value as 'grid' | 'map')}
          className="w-full md:w-auto"
        >
          <TabsList className="grid w-full md:w-[200px] grid-cols-2 bg-secondary/50">
            <TabsTrigger value="grid" className="data-[state=active]:bg-primary data-[state=active]:text-white">Grid View</TabsTrigger>
            <TabsTrigger value="map" className="data-[state=active]:bg-primary data-[state=active]:text-white">Map View</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar with filters */}
        <div className="w-full md:w-[300px] md:sticky md:top-20">
          <EventFilter 
            filters={filters} 
            onFilterChange={handleFilterChange} 
            onReset={resetFilters} 
          />
        </div>
        
        {/* Event listings */}
        <div className="flex-1">
          <Tabs value={viewMode} className="w-full">
            <TabsContent value="grid" className="mt-0">
              {filteredEvents.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredEvents.map((event,index) => (
                    <EventCard key={index} event={event} />
                  ))}
                </div>
              ) : (
                <div className="bg-white p-8 rounded-lg text-center rwanda-pattern">
                  <p className="text-lg mb-4">No events match your filters</p>
                  <Button variant="outline" onClick={resetFilters} className="border-primary text-primary hover:bg-primary/10">
                    Reset Filters
                  </Button>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="map" className="mt-0">
              {filteredEvents.length > 0 ? (
                <div className="bg-white p-4 rounded-lg border border-border rwanda-pattern">
                  {/* <Map 
                    events={filteredEvents} 
                    height={mapHeight} 
                    onMarkerClick={handleMarkerClick} 
                  /> */}
                  <div className="mt-4 text-sm text-muted-foreground">
                    <p>Click on markers to view event details. Showing {filteredEvents.length} events.</p>
                  </div>
                </div>
              ) : (
                <div className="bg-white p-8 rounded-lg text-center rwanda-pattern">
                  <p className="text-lg mb-4">No events match your filters</p>
                  <Button variant="outline" onClick={resetFilters} className="border-primary text-primary hover:bg-primary/10">
                    Reset Filters
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  </section>
  )
}

export default EventsFilterSection