import React, { createContext, useContext, useState, useEffect } from 'react';

interface Destination {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  rating: number;
  location: string;
}

interface TravelContextType {
  destinations: Destination[];
  filteredDestinations: Destination[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filterByPrice: (min: number, max: number) => void;
  filterByRating: (rating: number) => void;
  isLoading: boolean;
  error: string | null;
}

const TravelContext = createContext<TravelContextType | undefined>(undefined);

export const TravelProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [filteredDestinations, setFilteredDestinations] = useState<Destination[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/destinations');
        if (!response.ok) {
          throw new Error('Failed to fetch destinations');
        }
        const data = await response.json();
        setDestinations(data);
        setFilteredDestinations(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  useEffect(() => {
    const filtered = destinations.filter(destination =>
      destination.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      destination.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      destination.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredDestinations(filtered);
  }, [searchTerm, destinations]);

  const filterByPrice = (min: number, max: number) => {
    const filtered = destinations.filter(
      destination => destination.price >= min && destination.price <= max
    );
    setFilteredDestinations(filtered);
  };

  const filterByRating = (rating: number) => {
    const filtered = destinations.filter(
      destination => destination.rating >= rating
    );
    setFilteredDestinations(filtered);
  };

  return (
    <TravelContext.Provider
      value={{
        destinations,
        filteredDestinations,
        searchTerm,
        setSearchTerm,
        filterByPrice,
        filterByRating,
        isLoading,
        error,
      }}
    >
      {children}
    </TravelContext.Provider>
  );
};

export const useTravel = () => {
  const context = useContext(TravelContext);
  if (context === undefined) {
    throw new Error('useTravel must be used within a TravelProvider');
  }
  return context;
}; 