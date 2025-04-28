
import React from 'react';
import { X } from 'lucide-react';
import { FilterOptions } from '../../utils/type';
import { Select, SelectContent, SelectItem } from '../ui/select';
import { SelectTrigger, SelectValue } from '@radix-ui/react-select';
import { categories, cities, durations, tags } from '../../utils/events';
import { Badge } from '../ui/badge';
import { Slider } from '../ui/slider';
import { Button } from '../ui/button';

interface EventFilterProps {
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
  onReset: () => void;
}

const EventFilter: React.FC<EventFilterProps> = ({ filters, onFilterChange, onReset }) => {
  const handleCategoryChange = (value: string) => {
    onFilterChange({
      ...filters,
      category: value === 'All' ? null : value
    });
  };

  const handleCityChange = (value: string) => {
    onFilterChange({
      ...filters,
      city: value === 'All' ? null : value
    });
  };

  const handleDurationChange = (value: string) => {
    onFilterChange({
      ...filters,
      duration: value === 'All' ? null : value
    });
  };

  const handleTagSelect = (value: string) => {
    if (value === 'All') {
      onFilterChange({
        ...filters,
        tags: null
      });
      return;
    }
    
    const currentTags = filters.tags || [];
    if (!currentTags.includes(value)) {
      onFilterChange({
        ...filters,
        tags: [...currentTags, value]
      });
    }
  };

  const handleRemoveTag = (tag: string) => {
    const currentTags = filters.tags || [];
    onFilterChange({
      ...filters,
      tags: currentTags.filter(t => t !== tag)
    });
  };

  const handlePriceChange = (value: number[]) => {
    onFilterChange({
      ...filters,
      priceRange: [value[0], value[0] === 0 && value[1] === 0 ? 1000000 : value[1]]
    });
  };

  return (
    <div className="bg-white p-4 rounded-lg border border-border shadow-sm rwanda-pattern">
      <h3 className="font-semibold mb-4 text-primary">Filter Events</h3>
      
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-1 block">Category</label>
          <Select onValueChange={handleCategoryChange} value={filters.category || 'All'}>
            <SelectTrigger className="border-secondary">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label className="text-sm font-medium mb-1 block">Location</label>
          <Select onValueChange={handleCityChange} value={filters.city || 'All'}>
            <SelectTrigger className="border-secondary">
              <SelectValue placeholder="Select location" />
            </SelectTrigger>
            <SelectContent>
              {cities.map(city => (
                <SelectItem key={city} value={city}>{city}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label className="text-sm font-medium mb-1 block">Duration</label>
          <Select onValueChange={handleDurationChange} value={filters.duration || 'All'}>
            <SelectTrigger className="border-secondary">
              <SelectValue placeholder="Select duration" />
            </SelectTrigger>
            <SelectContent>
              {durations.map(duration => (
                <SelectItem key={duration} value={duration}>{duration}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label className="text-sm font-medium mb-1 block">Tags</label>
          <Select onValueChange={handleTagSelect}>
            <SelectTrigger className="border-secondary">
              <SelectValue placeholder="Add tags" />
            </SelectTrigger>
            <SelectContent>
              {tags.map(tag => (
                <SelectItem key={tag} value={tag}>{tag}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          {filters.tags && filters.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {filters.tags.map(tag => (
                <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                  {tag}
                  <button 
                    onClick={() => handleRemoveTag(tag)} 
                    className="ml-1 rounded-full hover:bg-black/10 p-0.5"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}
        </div>
        
        <div>
          <label className="text-sm font-medium mb-1 block">
            Price Range: {filters.priceRange ? `${filters.priceRange[0].toLocaleString('en-RW')} - ${filters.priceRange[1].toLocaleString('en-RW')} RWF` : '0 - 1,000,000 RWF'}
          </label>
          <Slider
            defaultValue={[0, 200000]}
            value={[filters.priceRange?.[0] || 0, filters.priceRange?.[1] || 200000]}
            max={300000}
            step={10000}
            onValueChange={handlePriceChange}
            className="my-4"
          />
        </div>
        
        <Button variant="outline" size="sm" onClick={onReset} className="w-full border-primary text-primary hover:bg-primary/10">
          Reset Filters
        </Button>
      </div>
    </div>
  );
};

export default EventFilter;
