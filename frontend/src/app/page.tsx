'use client';

import { useState, useEffect } from 'react';
import { WeatherData, ForecastData } from '@/types/weather';
import { weatherAPI } from '@/lib/api';
import SearchBar from '@/components/SearchBar';
import WeatherCard from '@/components/WeatherCard';
import ForecastCard from '@/components/ForecastCard';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorMessage from '@/components/ErrorMessage';
import { 
  CloudIcon, 
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';

export default function Home() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchedCity, setSearchedCity] = useState<string>('');

  const handleSearch = async (city: string) => {
    setLoading(true);
    setError(null);
    setSearchedCity(city);

    try {
      const [weatherData, forecastData] = await Promise.all([
        weatherAPI.getCurrentWeather(city),
        weatherAPI.getForecast(city)
      ]);

      setWeather(weatherData);
      setForecast(forecastData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      setWeather(null);
      setForecast(null);
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    if (searchedCity) {
      handleSearch(searchedCity);
    }
  };

  useEffect(() => {
    handleSearch('Mumbai');
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 mt-8">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 pt-32 pb-12 mt-24 md:mt-14">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Current Weather Conditions
          </h2>
          <p className="text-gray-600 text-lg lg:text-xl mb-8 max-w-3xl mx-auto">
            Get real-time weather information and forecasts for any location in India. 
            Our data is updated continuously from meteorological stations across the country.
          </p>
          
          <div className="max-w-4xl mx-auto">
            <SearchBar onSearch={handleSearch} loading={loading} />
          </div>
          
          {/* Popular Cities Quick Links */}
          {!loading && !weather && (
            <div className="mt-8">
              <p className="text-gray-500 mb-4">Quick access to major cities:</p>
              <div className="flex flex-wrap justify-center gap-3">
                {['New Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad'].map((city) => (
                  <button
                    key={city}
                    onClick={() => handleSearch(city)}
                    className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors duration-200 text-sm font-medium"
                  >
                    {city}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-16">
            <LoadingSpinner />
            <p className="mt-4 text-gray-600 text-lg">
              Fetching weather data for {searchedCity}...
            </p>
            <p className="text-gray-500 text-sm mt-2">
              Please wait while we gather the latest information
            </p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-red-50 border-l-4 border-red-400 rounded-lg p-6">
              <div className="flex items-start">
                <ExclamationTriangleIcon className="h-6 w-6 text-red-400 mr-3 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-red-800 mb-2">
                    Unable to fetch weather data
                  </h3>
                  <ErrorMessage 
                    message={error} 
                    onRetry={searchedCity ? handleRetry : undefined}
                  />
                  <div className="mt-4 text-sm text-red-700">
                    <p>• Check if the city name is spelled correctly</p>
                    <p>• Try searching with the district or state name</p>
                    <p>• Ensure you have an active internet connection</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Weather Display */}
        {!loading && !error && (
          <div className="space-y-8">
            {weather && <WeatherCard weather={weather} />}
            {forecast && <ForecastCard forecast={forecast} />}
          </div>
        )}

        {/* Empty State */}
        {!weather && !forecast && !loading && !error && (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CloudIcon className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Ready to provide weather information
            </h3>
            <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">
              Search for any city or district in India to get detailed weather conditions and forecasts
            </p>
            <div className="flex justify-center">
              <button
                onClick={() => handleSearch('New Delhi')}
                className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-200 font-medium"
              >
                Show Delhi Weather
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}