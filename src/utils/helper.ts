
export function formatDate(dateString: string): string {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    };
    
    return new Date(dateString).toLocaleDateString('en-US', options);
  }
  
  export function formatDateRange(startDate: string, endDate: string): string {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    const startOptions: Intl.DateTimeFormatOptions = { 
      month: 'short', 
      day: 'numeric' 
    };
    
    const endOptions: Intl.DateTimeFormatOptions = { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    };
    
    if (start.getFullYear() === end.getFullYear() && 
        start.getMonth() === end.getMonth()) {
      // Same month and year
      return `${start.getDate()} - ${end.toLocaleDateString('en-US', endOptions)}`;
    } else if (start.getFullYear() === end.getFullYear()) {
      // Same year
      return `${start.toLocaleDateString('en-US', startOptions)} - ${end.toLocaleDateString('en-US', endOptions)}`;
    } else {
      // Different years
      return `${start.toLocaleDateString('en-US', endOptions)} - ${end.toLocaleDateString('en-US', endOptions)}`;
    }
  }
  
  export function formatDateTime(dateString: string, timeString: string): string {
    const date = new Date(`${dateString}T${timeString}`);
    
    const dateOptions: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    
    const timeOptions: Intl.DateTimeFormatOptions = { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true
    };
    
    const formattedDate = date.toLocaleDateString('en-US', dateOptions);
    const formattedTime = date.toLocaleTimeString('en-US', timeOptions);
    
    return `${formattedDate} at ${formattedTime}`;
  }
  
  export function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-RW', {
      style: 'currency',
      currency: 'RWF',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  }
  
  export function generateOrderNumber(): string {
    const prefix = 'RW-ORD';
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    
    return `${prefix}-${timestamp}-${random}`;
  }
  
  // Convert price from USD to RWF (approx. rate: 1 USD = 1200 RWF)
  export function convertToRWF(usdAmount: number): number {
    const conversionRate = 1200;
    return Math.round(usdAmount * conversionRate);
  }
  