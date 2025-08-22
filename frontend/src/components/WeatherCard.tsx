'use client';

import { WeatherData } from '@/types/weather';
import { getWeatherIcon, formatTime, getWindDirection, capitalizeFirstLetter } from '@/lib/utils';
import {
  EyeIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  MapPinIcon,
  ClockIcon,
  SunIcon,
} from '@heroicons/react/24/outline';
import { useTemperature } from '@/context/TemperatureContext';
import Image from 'next/image';

interface WeatherCardProps {
  weather: WeatherData;
}

export default function WeatherCard({ weather }: WeatherCardProps) {
  const currentWeather = weather.weather[0];
  const sunrise = formatTime(weather.sys.sunrise, weather.timezone);
  const sunset = formatTime(weather.sys.sunset, weather.timezone);
  const { unit } = useTemperature();

  const convertTemp = (temp: number) => {
  if (unit === 'C') return `${temp.toFixed(1)}°C`;
  return `${((temp * 9) / 5 + 32).toFixed(1)}°F`;
};


  // Get current time for context
  const currentTime = new Date().toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Asia/Kolkata'
  });

  return (
    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-4xl mx-auto">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center">
          {/* Location Info */}
          <div className="mb-6 lg:mb-0">
            <div className="flex items-center mb-3">
              <MapPinIcon className="h-6 w-6 mr-2" />
              <h1 className="text-3xl lg:text-4xl font-bold">
                {weather.name}
              </h1>
            </div>
            <p className="text-blue-100 text-lg mb-2">{weather.sys.country}</p>
            <div className="flex items-center text-blue-100">
              <ClockIcon className="h-4 w-4 mr-2" />
              <span>Last updated: {currentTime}</span>
            </div>
          </div>

          {/* Main Temperature */}
          <div className="text-center lg:text-right">
            <div className="text-6xl lg:text-7xl font-light mb-2">
              {convertTemp(weather.main.temp)}
            </div>
            <p className="text-blue-100 text-lg mb-3">
              Feels like {convertTemp(weather.main.feels_like)}
            </p>
            <div className="flex items-center justify-center lg:justify-end">
              <Image
                src={getWeatherIcon(currentWeather.icon)}
                alt={currentWeather.description}
                className="w-16 h-16 mr-3"
              />
              <div className="text-left">
                <p className="text-xl font-semibold">{currentWeather.main}</p>
                <p className="text-blue-100 capitalize">
                  {capitalizeFirstLetter(currentWeather.description)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-8">
        {/* Essential Weather Info Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-6 text-center border border-red-200">
            <ArrowUpIcon className="h-6 w-6 mx-auto mb-3 text-red-600" />
            <p className="text-sm font-medium text-gray-700 mb-1">High</p>
            <p className="text-2xl font-bold text-gray-900">
              {convertTemp(weather.main.temp_max)}
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 text-center border border-blue-200">
            <ArrowDownIcon className="h-6 w-6 mx-auto mb-3 text-blue-600" />
            <p className="text-sm font-medium text-gray-700 mb-1">Low</p>
            <p className="text-2xl font-bold text-gray-900">
              {convertTemp(weather.main.temp_min)}
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-2xl p-6 text-center border border-teal-200">
            <div className="w-6 h-6 mx-auto mb-3 bg-teal-600 rounded-full opacity-80"></div>
            <p className="text-sm font-medium text-gray-700 mb-1">Humidity</p>
            <p className="text-2xl font-bold text-gray-900">{weather.main.humidity}%</p>
          </div>
          
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 text-center border border-purple-200">
            <EyeIcon className="h-6 w-6 mx-auto mb-3 text-purple-600" />
            <p className="text-sm font-medium text-gray-700 mb-1">Visibility</p>
            <p className="text-2xl font-bold text-gray-900">
              {(weather.visibility / 1000).toFixed(1)} km
            </p>
          </div>
        </div>

        {/* Additional Weather Details */}
        <div className="bg-gray-50 rounded-2xl p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">Wind Speed</span>
                <span className="text-gray-900 font-semibold">
                  {weather.wind.speed} m/s {getWindDirection(weather.wind.deg)}
                </span>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">Pressure</span>
                <span className="text-gray-900 font-semibold">
                  {weather.main.pressure} hPa
                </span>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">Cloud Cover</span>
                <span className="text-gray-900 font-semibold">
                  {weather.clouds.all}%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Sun Times */}
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-6 border border-yellow-200">
          <div className="flex items-center justify-center mb-4">
            <SunIcon className="h-6 w-6 text-yellow-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">Sun Times</h3>
          </div>
          
          <div className="grid grid-cols-2 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <div className="w-6 h-6 bg-yellow-300 rounded-full"></div>
              </div>
              <p className="text-sm font-medium text-gray-700 mb-1">Sunrise</p>
              <p className="text-xl font-bold text-yellow-700">{sunrise}</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <div className="w-6 h-6 bg-orange-300 rounded-full"></div>
              </div>
              <p className="text-sm font-medium text-gray-700 mb-1">Sunset</p>
              <p className="text-xl font-bold text-orange-700">{sunset}</p>
            </div>
          </div>
        </div>
      </div>

      {/*Advisory Section */}
      <div className="bg-blue-50 border-t border-blue-100 p-6">
        <div className="max-w-3xl mx-auto">
          <h4 className="text-lg font-semibold text-blue-900 mb-3">
            Weather Advisory
          </h4>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-800">
            <div className="flex items-start">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <p>Current conditions are suitable for outdoor activities</p>
            </div>
            <div className="flex items-start">
              <div className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <p>No severe weather warnings in effect</p>
            </div>
            <div className="flex items-start">
              <div className="w-2 h-2 bg-yellow-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <p>UV levels are moderate - consider sun protection</p>
            </div>
            <div className="flex items-start">
              <div className="w-2 h-2 bg-teal-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <p>Air quality is within acceptable range</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}