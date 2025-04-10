import { useState } from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Destinations() {
  const navigate = useNavigate();
  const [region, setRegion] = useState('all');
  const [budget, setBudget] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const destinations = [
    {
      id: '1',
      name: 'Paris',
      country: 'France',
      region: 'Europe',
      budget: 'high',
      imageUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=1000',
    },
    {
      id: '2',
      name: 'Bali',
      country: 'Indonesia',
      region: 'Asia',
      budget: 'medium',
      imageUrl: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=1000',
    },
    {
      id: '3',
      name: 'Tokyo',
      country: 'Japan',
      region: 'Asia',
      budget: 'high',
      imageUrl: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&q=80&w=1000',
    },
  ];

  const filteredDestinations = destinations.filter((dest) => {
    const matchesRegion = region === 'all' || dest.region.toLowerCase() === region;
    const matchesBudget = budget === 'all' || dest.budget === budget;
    const matchesSearch = dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         dest.country.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRegion && matchesBudget && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">Explore Our Destinations</h1>
        
        {/* Filters */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="grid md:grid-cols-3 gap-4">
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="border rounded-md p-2"
            >
              <option value="all">All Regions</option>
              <option value="europe">Europe</option>
              <option value="asia">Asia</option>
              <option value="americas">Americas</option>
              <option value="africa">Africa</option>
              <option value="oceania">Oceania</option>
            </select>

            <select
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="border rounded-md p-2"
            >
              <option value="all">All Budgets</option>
              <option value="low">Budget Friendly</option>
              <option value="medium">Mid-Range</option>
              <option value="high">Luxury</option>
            </select>

            <div className="relative">
              <input
                type="text"
                placeholder="Search destinations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border rounded-md p-2 w-full pl-10"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
            </div>
          </div>
        </div>

        {/* Destinations Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {filteredDestinations.map((destination) => (
            <div key={destination.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src={destination.imageUrl}
                alt={destination.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2">{destination.name}</h2>
                <p className="text-gray-600">{destination.country}</p>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-sm text-gray-500">{destination.region}</span>
                  <button
                    onClick={() => navigate(`/destinations/${destination.id}`)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}