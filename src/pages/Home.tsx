import { ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  
  const featuredDestinations = [
    {
      id: '1',
      name: 'Paris',
      country: 'France',
      description: 'Experience the city of love',
      imageUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=1000',
    },
    {
      id: '2',
      name: 'Bali',
      country: 'Indonesia',
      description: 'Discover tropical paradise and ancient temples',
      imageUrl: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=1000',
    },
    {
      id: '3',
      name: 'Tokyo',
      country: 'Japan',
      description: 'Experience the perfect blend of tradition and technology',
      imageUrl: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&q=80&w=1000',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div 
        className="h-[600px] bg-cover bg-center relative"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=2000')`,
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-4">Discover Your Next Adventure</h1>
            <p className="text-xl mb-8">Explore amazing destinations around the world</p>
            <Link
              to="/destinations"
              className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition duration-300"
            >
              Explore Destinations
            </Link>
          </div>
        </div>
      </div>

      {/* Featured Destinations */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8">Popular Destinations</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {featuredDestinations.map((destination) => (
            <div key={destination.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img
                src={destination.imageUrl}
                alt={destination.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{destination.name}, {destination.country}</h3>
                <p className="text-gray-600 mb-4">{destination.description}</p>
                <button
                  onClick={() => navigate(`/destinations/${destination.id}`)}
                  className="inline-flex items-center text-blue-600 hover:text-blue-700"
                >
                  Learn More <ArrowRight className="ml-2" size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-xl mb-8">Book your next adventure today and create unforgettable memories</p>
          <Link
            to="/book"
            className="bg-white text-blue-600 px-8 py-3 rounded-full hover:bg-gray-100 transition duration-300"
          >
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
}