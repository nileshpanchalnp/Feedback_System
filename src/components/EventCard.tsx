import React, { useState } from 'react';
import { Calendar, MapPin, Users, Tag } from 'lucide-react';
import { Event } from '../types';
import StarRating from './StarRating';

interface EventCardProps {
  event: Event;
  onSubmitFeedback: (eventId: string, rating: number, comment: string) => Promise<void>;
}

const EventCard: React.FC<EventCardProps> = ({ event, onSubmitFeedback }) => {
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  // CREATE EVENT SHOW IN THIS PAGE 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) return;
    
    setIsSubmitting(true);
    try {
      await onSubmitFeedback(event.id, rating, comment)
      setRating(0);
      setComment('');
      setIsExpanded(false);
    } catch (error) {
      console.error('Error submitting feedback:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
      <div className="relative h-8 ">
        <div className="absolute top-4 right-4">
          <span className={`
            px-3 py-1 rounded-full text-xs font-medium
            ${event.category === 'conference' ? 'bg-blue-100 text-blue-800' :
              event.category === 'workshop' ? 'bg-green-100 text-green-800' :
              event.category === 'seminar' ? 'bg-purple-100 text-purple-800' :
              event.category === 'webinar' ? 'bg-yellow-100 text-yellow-800' :
              'bg-gray-100 text-gray-800'}
          `}>
            {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{event.name}</h3>
        
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex items-center">
            <Calendar size={16} className="mr-2" />
            <span>{formatDate(event.date)}</span>
          </div>
          
          {event.location && (
            <div className="flex items-center">
              <MapPin size={16} className="mr-2" />
              <span>{event.location}</span>
            </div>
          )}
          
          <div className="flex items-center">
            <Users size={16} className="mr-2" />
            <span>{event.capacity} attendees max</span>
          </div>
          
          <div className="flex items-center">
            <Tag size={16} className="mr-2" />
            <span>{event.organizer}</span>
          </div>
        </div>

        {event.description && (
          <p className="mt-4 text-gray-600 text-sm">
            {isExpanded ? event.description : `${event.description.slice(0, 100)}...`}
            {event.description.length > 100 && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="ml-1 text-primary-600 hover:text-primary-700 font-medium"
              >
                {isExpanded ? 'Show less' : 'Read more'}
              </button>
            )}
          </p>
        )}
        
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Your Rating
            </label>
            <StarRating onChange={setRating} initialRating={rating} />
          </div>
          
          <div>
            <label htmlFor={`comment-${event.id}`} className="block text-sm font-medium text-gray-700 mb-1">
              Comments(optional) 
            </label>
            <textarea
              id={`comment-${event.id}`}
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-500 focus:ring-opacity-50 bg-gray-50 p-2 border"
              placeholder="Share your thoughts about this event..."
            />
          </div>
          
          <button
            type="submit"
            disabled={rating === 0 || isSubmitting}
            className={`w-full py-2 px-4 rounded-lg text-white font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors
              ${
                rating === 0
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-primary-600 hover:bg-primary-700'
              }
            `}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EventCard;