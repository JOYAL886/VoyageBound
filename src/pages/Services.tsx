import { Plane, Map, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Services() {
  const navigate = useNavigate();
  
  const services = [
    {
      icon: <Plane className="w-12 h-12 text-blue-600" />,
      title: 'Flight Tickets',
      description: 'Find the best deals on flights worldwide with our extensive network of airlines.',
      price: '£299',
    },
    {
      icon: <Map className="w-12 h-12 text-blue-600" />,
      title: 'Tour Packages',
      description: 'Experience carefully curated tour packages for unforgettable adventures.',
      price: '£499',
    },
    {
      icon: <Calendar className="w-12 h-12 text-blue-600" />,
      title: 'Activity Bookings',
      description: 'Access exclusive tours, activities, and attractions at your destination.',
      price: '£199',
    },
  ];

  const handleLearnMore = (service: string) => {
    // You can customize this navigation based on your needs
    navigate(`/book?service=${service}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-4">Our Services</h1>
        <p className="text-xl text-gray-600 mb-12">Comprehensive travel solutions tailored to your needs</p>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="mb-6">{service.icon}</div>
              <h2 className="text-2xl font-semibold mb-4">{service.title}</h2>
              <p className="text-gray-600 mb-2">{service.description}</p>
              <p className="text-blue-600 font-semibold mb-4">Starting from {service.price}</p>
              <button 
                onClick={() => handleLearnMore(service.title.toLowerCase())}
                className="text-blue-600 font-semibold hover:text-blue-700"
              >
                Learn More
              </button>
            </div>
          ))}
        </div>

        {/* Additional Features */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-8">Why Choose Us?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">24/7 Customer Support</h3>
              <p className="text-gray-600">
                Our dedicated team is always available to assist you with any queries or concerns.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Best Price Guarantee</h3>
              <p className="text-gray-600">
                We offer competitive prices and match any lower price you find elsewhere.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}