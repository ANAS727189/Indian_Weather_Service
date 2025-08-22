'use client';

import { useState, useEffect, useRef } from 'react';
import { MagnifyingGlassIcon, MapPinIcon } from '@heroicons/react/24/outline';

interface SearchBarProps {
  onSearch: (city: string) => void;
  loading?: boolean;
}

// Mock cities for demonstration - replace with your actual data source
const indianCities = [
  'New Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad',
  'Pune', 'Ahmedabad', 'Kanpur', 'Jaipur', 'Lucknow', 'Surat',
  'Kochi', 'Indore', 'Coimbatore', 'Visakhapatnam', 'Bhopal', 'Patna',
  'Vadodara', 'Ludhiana', 'Agra', 'Nashik', 'Faridabad', 'Meerut',
  'Rajkot', 'Kalyan-Dombivali', 'Vasai-Virar', 'Varanasi', 'Srinagar',
  'Aurangabad', 'Dhanbad', 'Amritsar', 'Navi Mumbai', 'Allahabad',
  'Ranchi', 'Howrah', 'Coimbatore', 'Jabalpur', 'Gwalior', 'Vijayawada'
];

export default function SearchBar({ onSearch, loading = false }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [recentSearches] = useState<string[]>(['Delhi', 'Mumbai', 'Bangalore']);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Filter suggestions based on query
  useEffect(() => {
    if (query.length > 0) {
      const filtered = indianCities.filter(city =>
        city.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 6);
      setSuggestions(filtered);
      setIsOpen(true);
      setSelectedIndex(-1);
    } else {
      setSuggestions(recentSearches);
      setIsOpen(false);
    }
  }, [query, recentSearches]);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && suggestions[selectedIndex]) {
          handleSelect(suggestions[selectedIndex]);
        } else if (query.trim()) {
          handleSubmit();
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setSelectedIndex(-1);
        inputRef.current?.blur();
        break;
    }
  };

  const handleSelect = (city: string) => {
    setQuery(city);
    setIsOpen(false);
    setSelectedIndex(-1);
    onSearch(city);
  };

  const handleSubmit = () => {
    if (query.trim()) {
      setIsOpen(false);
      onSearch(query.trim());
    }
  };

  const handleFocus = () => {
    if (query.length === 0) {
      setSuggestions(recentSearches);
      setIsOpen(true);
    } else if (suggestions.length > 0) {
      setIsOpen(true);
    }
  };

  const handleBlur = () => {
    // Delay closing to allow for suggestion clicks
    setTimeout(() => {
      if (!suggestionsRef.current?.contains(document.activeElement)) {
        setIsOpen(false);
        setSelectedIndex(-1);
      }
    }, 150);
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Search Input */}
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder="Search for a city or district..."
          className="w-full px-6 py-4 pl-14 text-lg bg-white border-2 border-gray-300 rounded-2xl focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed text-gray-500"
          disabled={loading}
          autoComplete="off"
        />
        
        <MagnifyingGlassIcon className="absolute left-5 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400" />
        
        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading || !query.trim()}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 px-6 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium text-sm"
        >
          {loading ? (
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Searching...
            </div>
          ) : (
            'Search'
          )}
        </button>
      </div>

      {/* Suggestions Dropdown */}
      {isOpen && (
        <div 
          ref={suggestionsRef}
          className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-2xl shadow-2xl z-50 max-h-80 overflow-y-auto"
        >
          {/* Recent searches header */}
          {query.length === 0 && recentSearches.length > 0 && (
            <div className="px-4 py-2 text-xs text-gray-500 font-medium uppercase tracking-wide border-b border-gray-100">
              Recent Searches
            </div>
          )}
          
          {/* Suggestions*/}
          {(query.length > 0 ? suggestions : recentSearches).map((city, index) => (
            <button
              key={city}
              onClick={() => handleSelect(city)}
              onMouseEnter={() => setSelectedIndex(index)}
              className={`w-full px-6 py-3 text-left hover:bg-blue-50 focus:bg-blue-50 focus:outline-none transition-colors duration-150 first:rounded-t-2xl last:rounded-b-2xl ${
                index === selectedIndex ? 'bg-blue-50' : ''
              }`}
            >
              <div className="flex items-center">
                <MapPinIcon className="h-4 w-4 text-gray-400 mr-3 flex-shrink-0" />
                <span className="text-gray-900 font-medium">{city}</span>
                {query.length === 0 && (
                  <span className="ml-auto text-xs text-gray-400">Recent</span>
                )}
              </div>
            </button>
          ))}
          
          {/* No results */}
          {query.length > 0 && suggestions.length === 0 && (
            <div className="px-6 py-4 text-gray-500 text-center">
              <p>No cities found for "{query}"</p>
              <p className="text-sm mt-1">Try searching with a different spelling</p>
            </div>
          )}
          
          {/* Quick search tip */}
          {query.length > 0 && suggestions.length > 0 && (
            <div className="px-4 py-2 text-xs text-gray-400 border-t border-gray-100 bg-gray-50 rounded-b-2xl">
              Use ↑↓ to navigate, Enter to select, Esc to close
            </div>
          )}
        </div>
      )}
    </div>
  );
}