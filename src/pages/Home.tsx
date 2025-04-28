import React from 'react'
import FeaturedSections from '../components/sections/featuredSections'
import EventsFilterSection from '../components/card/EventsFilterSection'

const Home = () => {
  return (
    <div>
        <section className="pt-24 pb-12 px-4 bg-gradient-to-r text-primary-foreground from-blue-500 to-purple-600">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 animate-fade-in">
            Discover Amazing Events in Burundi
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto opacity-90 animate-slide-in">
            Find and book tickets for the best events happening in Burundi
          </p>
        </div>
      </section>
      <FeaturedSections/>
      <EventsFilterSection/>
      
    </div>
  )
}

export default Home