export interface Destination {
  id: string;
  name: string;
  country: string;
  description: string;
  imageUrl: string;
  region: string;
  budget: string;
}

export interface TourPackage {
  id: string;
  title: string;
  description: string;
  price: number;
  duration: string;
  included: string[];
}

export interface ContactForm {
  name: string;
  email: string;
  message: string;
}

export interface BookingForm {
  fullName: string;
  email: string;
  destination: string;
  departureDate: string;
  returnDate: string;
  travelers: number;
  specialRequests?: string;
}