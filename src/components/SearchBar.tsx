import React, { useState, useEffect } from 'react';
import { Search, Filter, Calendar } from 'lucide-react';
import { SearchFilters } from '../types';

interface SearchBarProps {
  onSearch: (filters: SearchFilters) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    category: '',
    dateRange: {
      start: '',
      end: ''
    }
  });

  // ✅ AUTO SEARCH WITH DEBOUNCE
  useEffect(() => {
    const delay = setTimeout(() => {
      if (filters.query.trim() !== '') {
        onSearch(filters);
      }
    }, 500); // 500ms delay

    return () => clearTimeout(delay);
  }, [filters]); 

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(filters);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'start' || name === 'end') {
      setFilters(prev => ({
        ...prev,
        dateRange: {
          ...prev.dateRange,
          [name]: value
        }
      }));
    } else {
      setFilters(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

 return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-4">
  <form onSubmit={handleSubmit}>
    <div className="flex flex-col sm:flex-row items-center gap-4">
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          name="query"
          value={filters.query}
          onChange={handleInputChange}
          placeholder="Search events..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        />
      </div>
      
      <button
        type="button"
        onClick={() => setIsFiltersOpen(!isFiltersOpen)}
        className="px-4 py-2 flex items-center gap-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors sm:ml-4 mt-4 sm:mt-0"
      >
        <Filter size={20} />
        Filters
      </button>
      
      <button
        type="submit"
        className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors sm:ml-4 mt-4 sm:mt-0"
      >
        Search
      </button>
    </div>

    {isFiltersOpen && (
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            name="category"
            value={filters.category}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="">All Categories</option>
            <option value="conference">Conference</option>
            <option value="workshop">Workshop</option>
            <option value="seminar">Seminar</option>
            <option value="webinar">Webinar</option>
            <option value="meetup">Meetup</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <Calendar size={16} className="inline mr-1" />
            Start Date
          </label>
          <input
            type="date"
            name="start"
            value={filters.dateRange?.start}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <Calendar size={16} className="inline mr-1" />
            End Date
          </label>
          <input
            type="date"
            name="end"
            value={filters.dateRange?.end}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
      </div>
    )}
  </form>
</div>

  );
};

export default SearchBar;



 