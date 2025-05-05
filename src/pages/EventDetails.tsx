import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, MapPin, User, ArrowLeft } from 'lucide-react';

import { toast } from 'sonner';
import { getEventById } from '../utils/events';
import Navbar from '../components/Navbar';
import { Separator } from '../components/ui/separator';
import { formatCurrency, formatDateTime } from '../utils/helper';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';

const EventDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  
  const event = getEventById(id || '');
  
  if (!event) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 pt-32 pb-12 text-center">
          <h1 className="text-2xl font-semibold mb-4">Event Not Found</h1>
          <p className="mb-6">The event you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate('/')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Events
          </Button>
        </div>
      </div>
    );
  }
  
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value > 0 && value <= event.ticketsAvailable) {
      setQuantity(value);
    }
  };
  
  const handlePurchase = () => {
    if (quantity > 0) {
      
      const cartItem = {
        eventId: event.id,
        quantity: quantity,
        eventTitle: event.title,
        eventDate: event.startDate, 
        price: event.price,
        totalPrice: event.price * quantity
      };
      
      console.log('Added to cart:', cartItem);
      
      
      toast.success("Tickets added to cart", {
        description: `${quantity} ticket${quantity > 1 ? 's' : ''} for ${event.title}`,
      });
      
      
      navigate('/payment', { 
        state: { 
          items: [cartItem],
          totalAmount: event.price * quantity
        } 
      });
    }
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        <Button 
          className="ghost mb-6" 
          onClick={() => navigate('/')}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Events
        </Button>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Event Details */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg overflow-hidden border border-border shadow-sm">
              <div className="relative h-64 md:h-80">
                <img 
                  src={event.image} 
                  alt={event.title} 
                  className="w-full h-full object-cover"
                />
                {event.featured && (
                  <span className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                    Featured
                  </span>
                )}
              </div>
              
              <div className="p-6">
                <h1 className="text-2xl md:text-3xl font-bold mb-2">{event.title}</h1>
                
                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-2" />
                    {formatDateTime(event.startDate, event.time)} {/* Changed from event.date to event.startDate */}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-2" />
                    {event.location.name}, {event.location.city}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <User className="h-4 w-4 mr-2" />
                    {event.organizer.name} 
                  </div>
                </div>
                
                <Separator className="my-6" />
                
                <h2 className="text-xl font-semibold mb-3">About this event</h2>
                <p className="text-muted-foreground mb-6">
                  {event.description}
                </p>
                
                <h2 className="text-xl font-semibold mb-3">Location</h2>
                <p className="text-muted-foreground mb-2">
                  {event.location.name}<br />
                  {event.location.address}<br />
                  {event.location.city}
                </p>
                
                <div className="mt-4 h-[300px]">
                  {/* <Map event={event} /> */}
                </div>
              </div>
            </div>
          </div>
          
          {/* Ticket Purchase */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-border shadow-sm p-6 sticky top-24">
              <h2 className="text-xl font-semibold mb-4">Get Tickets</h2>
              
              <div className="flex justify-between items-center mb-4">
                <span className="text-muted-foreground">Price:</span>
                <span className="font-semibold text-lg">{formatCurrency(event.price)}</span>
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium mb-1">
                  Quantity
                </label>
                <div className="grid grid-cols-3 gap-2 place-items-center">
                  <Button
                    variant="outline"
                    size="icon"
                    className='col-span-1'
                    onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                    disabled={quantity <= 1}
                  >
                    -
                  </Button>
                  <Input
                    type="number"
                    min="1"
                    max={event.ticketsAvailable}
                    value={quantity}
                    onChange={handleQuantityChange}
                    className="text-center col-span-1"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    className='col-span-1'
                    onClick={() => quantity < event.ticketsAvailable && setQuantity(quantity + 1)}
                    disabled={quantity >= event.ticketsAvailable}
                  >
                    +
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {event.ticketsAvailable} tickets available
                </p>
              </div>
              
              <Separator className="my-4" />
              
              <div className="flex justify-between items-center font-semibold text-lg mb-6">
                <span>Total:</span>
                <span>{formatCurrency(event.price * quantity)}</span>
              </div>
              
              <Button 
                className="w-full"
                onClick={handlePurchase}
                disabled={quantity <= 0 || quantity > event.ticketsAvailable}
              >
                Purchase Tickets
              </Button>
              
              <p className="text-xs text-muted-foreground text-center mt-4">
                By purchasing tickets, you agree to our Terms of Service and Privacy Policy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
