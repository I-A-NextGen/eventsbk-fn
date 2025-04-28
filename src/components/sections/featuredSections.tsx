import React from 'react'
import EventCard from '../card/EventCard'
import { getFeaturedEvents } from '../../utils/events';

const FeaturedSections = () => {
    const featuredEvents = getFeaturedEvents();
  return (
    <section className="py-12 px-4">
        <div className="container mx-auto">
          <h2 className="text-2xl font-semibold mb-6 text-primary">Featured Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredEvents.slice(0, 3).map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </section>
  )
}

export default FeaturedSections