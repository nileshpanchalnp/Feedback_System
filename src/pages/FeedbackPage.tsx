import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Plus } from 'lucide-react';
import { Event, SearchFilters } from '../types';
import { getEvents, createEvent } from '../services/eventService';
import { submitFeedback } from '../services/feedbackService';
import EventCard from '../components/EventCard';
import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';
import CreateEventModal from '../components/CreateEventModal';

const FeedbackPage: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({
    query: '',
    category: '',
    dateRange: {
      start: '',
      end: ''
    }
  });

  const fetchEvents = async (page: number, filters?: SearchFilters) => {
    setLoading(true);
    try {
      const { events: fetchedEvents, total } = await getEvents(page, filters);
      setEvents(fetchedEvents.map(ev => ({ ...ev, id: ev.id || ev._id })));
      setTotalPages(Math.ceil(total / 6));
      setError(null);
    } catch (err) {
      console.error('Error fetching events:', err);
      setError('Failed to load events. Please try again later.');
      toast.error('Failed to load events');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents(currentPage, searchFilters);
  }, [currentPage, searchFilters]);

  const handleSearch = (filters: SearchFilters) => {
    setSearchFilters(filters);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmitFeedback = async (eventId: string, rating: number, comment: string) => {
    try {
      const event = events.find(e => e.id === eventId);
      if (!event) {
        throw new Error('Event not found');
      }

      await submitFeedback(
        eventId,
        rating,
        comment
      );

      toast.success('Feedback submitted successfully!');
    } catch (err) {
      console.error('Error submitting feedback:', err);
      toast.error('Failed to submit feedback. Please try again.');
      throw err;
    }
  };

  const handleCreateEvent = async (eventData: any) => {
    try {
      await createEvent(eventData);
      toast.success('Event created successfully!');
      fetchEvents(currentPage, searchFilters);
    } catch (err) {
      console.error('Error creating event:', err);
      toast.error('Failed to create event. Please try again.');
      throw err;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Events & Feedback</h1>
            <p className="mt-2 text-lg text-gray-600">
              Discover upcoming events and share your thoughts
            </p>
          </div>

          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            <Plus size={20} className="mr-2" />
            Create Event
          </button>
        </div>

        <div className="mb-8">
          <SearchBar onSearch={handleSearch} />
        </div>

        {loading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-lg shadow-md p-4 animate-pulse"
              >
                <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-error-600">{error}</p>
            <button
              onClick={() => fetchEvents(currentPage, searchFilters)}
              className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
            >
              Try Again
            </button>
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <p className="text-gray-600 mb-4">No events found matching your criteria.</p>
            {Object.values(searchFilters).some(value => value) && (
              <button
                onClick={() => {
                  setSearchFilters({
                    query: '',
                    category: '',
                    dateRange: { start: '', end: '' }
                  });
                  setCurrentPage(1);
                }}
                className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
              >
                Clear Filters
              </button>
            )}
          </div>
        ) : (
          <>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {events.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  onSubmitFeedback={handleSubmitFeedback}
                />
              ))}
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </main>

      <CreateEventModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateEvent}
      />
    </div>
  );
};

export default FeedbackPage;
