import { Event, SearchFilters } from '../types';
import { parseISO, isWithinInterval } from 'date-fns';
import axios from 'axios';
import { Server } from '../SERVER/server';

const ITEMS_PER_PAGE = 6;

// GET EVENT API
export const getEvents = async (
  page: number = 1,
  filters?: SearchFilters
): Promise<{ events: Event[]; total: number }> => {
  try {
    const response = await axios.get(Server+'Event/getEvent');
    const allEvents = response.data;
    let filteredEvents = allEvents;

    // Apply filters if provided
    if (filters) {
      const { query, category, dateRange } = filters;

      filteredEvents = filteredEvents.filter((event: { name: string; description: string; location: string; category: string; date: string; }) => {
        const matchesQuery =
          !query ||
          event.name.toLowerCase().includes(query.toLowerCase()) ||
          event.description?.toLowerCase().includes(query.toLowerCase()) ||
          event.location?.toLowerCase().includes(query.toLowerCase());

        const matchesCategory = !category || event.category === category;

        const matchesDateRange =
          !dateRange?.start ||
          !dateRange?.end ||
          isWithinInterval(parseISO(event.date), {
            start: parseISO(dateRange.start),
            end: parseISO(dateRange.end),
          });

        return matchesQuery && matchesCategory && matchesDateRange;
      });
    }

    // Sort events by date
    filteredEvents.sort((a: { date: string | number | Date; }, b: { date: string | number | Date; }) => new Date(a.date).getTime() - new Date(b.date).getTime());

    // Pagination logic
    const total = filteredEvents.length;
    const start = (page - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;

    return {
      events: filteredEvents.slice(start, end),
      total,
    };
  } catch (error) {
    console.error('Error fetching events:', error);
    throw new Error('Failed to fetch events');
  }
};

// CREATE EVENT API
export const createEvent = async (eventData: Partial<Event>): Promise<Event> => {
  try {

    const response = await axios.post(Server+'Event/createEvent', eventData);
    return response.data;
  } catch (error) {
    console.error('Error creating event:', error);
    throw new Error('Failed to create event');
  }
};
