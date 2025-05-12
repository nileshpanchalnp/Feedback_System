export interface User {
  id: string;
  email: string;
  name?: string;
  role: 'admin' | 'user';
}

export interface Event {
  eventId: any;
  _eventId: any;
  _id: any;
  id: string;
  name: string;
  date: string;
  location?: string;
  description?: string;
  capacity: number;
  category: string;
  imageUrl?: string;
  organizer: string;
  createdAt: string;
  updatedAt: string;
}

export interface Feedback {
  id: string;
  eventId: string;
  eventName: string;
  userId: string;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export interface SearchFilters {
  query: string;
  category?: string;
  dateRange?: {
    start: string;
    end: string;
  };
}