import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Calendar, DollarSign, Users } from 'lucide-react';
import type { Destination } from '../types';

export default function DestinationDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // This would typically come from an API, using static data for demo
  const destinations: Record<string, Destination> = {
    '1': {
      id: '1',
      name: 'Paris',
      country: 'France',
      description: 'Experience the city of love and lights. Visit iconic landmarks like the Eiffel Tower, Louvre Museum, and Notre-Dame Cathedral. Enjoy world-class cuisine, art, and culture in one of Europe\'s most beautiful cities.',
      imageUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=1000',
      region: 'Europe',
      budget: 'high',
    },
    '2': {
      id: '2',
      name: 'Bali',
      country: 'Indonesia',
      description: 'Discover tropical paradise and ancient temples in Bali. Experience pristine beaches, lush rice terraces, and vibrant cultural ceremonies. Perfect for both relaxation and adventure.',
      imageUrl: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=1000',
      region: 'Asia',
      budget: 'medium',
    },
    '3': {
      id: '3',
      name: 'Tokyo',
      country: 'Japan',
      description: 'Experience the perfect blend of tradition and technology in Tokyo. Explore ancient temples, futuristic districts, and world-renowned cuisine. Immerse yourself in Japanese culture and innovation.',
      imageUrl: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&q=80&w=1000',
      region: 'Asia',
      budget: 'high',
    },
  };

  const destination = destinations[id ?? ''];

  if (!destination) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Destination Not Found</h1>
          <button
            onClick={() => navigate('/destinations')}
            className="text-blue-600 hover:text-blue-700 flex items-center"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Destinations
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <button
          onClick={() => navigate('/destinations')}
          className="text-blue-600 hover:text-blue-700 flex items-center mb-6"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Destinations
        </button>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="h-96 relative">
            <img
              src={destination.imageUrl}
              alt={`${destination.name}, ${destination.country}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
              <h1 className="text-4xl font-bold text-white mb-2">
                {destination.name}
              </h1>
              <p className="text-xl text-white flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                {destination.country}
              </p>
            </div>
          </div>

          <div className="p-6">
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="flex items-center">
                <MapPin className="w-6 h-6 text-blue-600 mr-3" />
                <div>
                  <p className="text-sm text-gray-600">Region</p>
                  <p className="font-semibold">{destination.region}</p>
                </div>
              </div>
              <div className="flex items-center">
                <DollarSign className="w-6 h-6 text-blue-600 mr-3" />
                <div>
                  <p className="text-sm text-gray-600">Budget Level</p>
                  <p className="font-semibold capitalize">{destination.budget}</p>
                </div>
              </div>
              <div className="flex items-center">
                <Calendar className="w-6 h-6 text-blue-600 mr-3" />
                <div>
                  <p className="text-sm text-gray-600">Best Time to Visit</p>
                  <p className="font-semibold">Year-round</p>
                </div>
              </div>
            </div>

            <div className="prose max-w-none mb-8">
              <h2 className="text-2xl font-semibold mb-4">About {destination.name}</h2>
              <p className="text-gray-600">{destination.description}</p>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg mb-8">
              <h3 className="text-xl font-semibold mb-4">Popular Activities</h3>
              <ul className="grid md:grid-cols-2 gap-4">
                <li className="flex items-center text-gray-700">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                  Sightseeing Tours
                </li>
                <li className="flex items-center text-gray-700">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                  Cultural Experiences
                </li>
                <li className="flex items-center text-gray-700">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                  Local Cuisine Tours
                </li>
                <li className="flex items-center text-gray-700">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                  Adventure Activities
                </li>
              </ul>
            </div>

            <button
              onClick={() => navigate('/book')}
              className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition duration-300 flex items-center justify-center"
            >
              <Users className="w-5 h-5 mr-2" />
              Book This Destination
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}