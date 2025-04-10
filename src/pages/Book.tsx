import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Calendar, Users, Plane, MapPin } from 'lucide-react';
import type { BookingForm } from '../types';

export default function Book() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<BookingForm>();

  const destinations = [
    { id: '1', name: 'Paris, France' },
    { id: '2', name: 'Bali, Indonesia' },
    { id: '3', name: 'Tokyo, Japan' },
    { id: '4', name: 'New York, USA' },
    { id: '5', name: 'Dubai, UAE' },
  ];

  const onSubmit = async (data: BookingForm) => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Booking submitted:', data);
      setSubmitSuccess(true);
      reset();
    } catch (error) {
      console.error('Error submitting booking:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">Book Your Trip</h1>

        <div className="bg-white rounded-lg shadow-md p-8">
          {submitSuccess ? (
            <div className="text-center py-8">
              <div className="text-green-600 text-5xl mb-4">✓</div>
              <h2 className="text-2xl font-semibold mb-4">Booking Submitted Successfully!</h2>
              <p className="text-gray-600 mb-6">
                Thank you for choosing VoyageBound. We'll send you a confirmation email shortly.
              </p>
              <button
                onClick={() => setSubmitSuccess(false)}
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
              >
                Book Another Trip
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 mb-2" htmlFor="fullName">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    {...register('fullName', { required: 'Full name is required' })}
                    className={`w-full border rounded-md p-2 ${errors.fullName ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.fullName && (
                    <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-700 mb-2" htmlFor="email">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address'
                      }
                    })}
                    className={`w-full border rounded-md p-2 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-gray-700 mb-2" htmlFor="destination">
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 mr-2" />
                    Destination
                  </div>
                </label>
                <select
                  id="destination"
                  {...register('destination', { required: 'Please select a destination' })}
                  className={`w-full border rounded-md p-2 ${errors.destination ? 'border-red-500' : 'border-gray-300'}`}
                >
                  <option value="">Select a destination</option>
                  {destinations.map(dest => (
                    <option key={dest.id} value={dest.name}>
                      {dest.name}
                    </option>
                  ))}
                </select>
                {errors.destination && (
                  <p className="text-red-500 text-sm mt-1">{errors.destination.message}</p>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 mb-2" htmlFor="departureDate">
                    <div className="flex items-center">
                      <Calendar className="w-5 h-5 mr-2" />
                      Departure Date
                    </div>
                  </label>
                  <input
                    type="date"
                    id="departureDate"
                    {...register('departureDate', { required: 'Departure date is required' })}
                    className={`w-full border rounded-md p-2 ${errors.departureDate ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.departureDate && (
                    <p className="text-red-500 text-sm mt-1">{errors.departureDate.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-700 mb-2" htmlFor="returnDate">
                    <div className="flex items-center">
                      <Calendar className="w-5 h-5 mr-2" />
                      Return Date
                    </div>
                  </label>
                  <input
                    type="date"
                    id="returnDate"
                    {...register('returnDate', { required: 'Return date is required' })}
                    className={`w-full border rounded-md p-2 ${errors.returnDate ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.returnDate && (
                    <p className="text-red-500 text-sm mt-1">{errors.returnDate.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-gray-700 mb-2" htmlFor="travelers">
                  <div className="flex items-center">
                    <Users className="w-5 h-5 mr-2" />
                    Number of Travelers
                  </div>
                </label>
                <input
                  type="number"
                  id="travelers"
                  min="1"
                  {...register('travelers', {
                    required: 'Number of travelers is required',
                    min: { value: 1, message: 'Minimum 1 traveler required' }
                  })}
                  className={`w-full border rounded-md p-2 ${errors.travelers ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.travelers && (
                  <p className="text-red-500 text-sm mt-1">{errors.travelers.message}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 mb-2" htmlFor="specialRequests">
                  Special Requests (Optional)
                </label>
                <textarea
                  id="specialRequests"
                  rows={4}
                  {...register('specialRequests')}
                  className="w-full border border-gray-300 rounded-md p-2"
                  placeholder="Any special requirements or preferences..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition duration-300 flex items-center justify-center ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? (
                  'Processing...'
                ) : (
                  <>
                    <Plane className="w-5 h-5 mr-2" />
                    Book Now
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}