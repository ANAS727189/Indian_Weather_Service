'use client';

import { ForecastData } from '@/types/weather';
import { getWeatherIcon, formatDate } from '@/lib/utils';
import { CalendarDaysIcon, ClockIcon } from '@heroicons/react/24/outline';
import { useTemperature } from '@/context/TemperatureContext';
import Image from 'next/image';

interface ForecastCardProps {
  forecast: ForecastData;
}

export default function ForecastCard({ forecast }: ForecastCardProps) {

const { unit } = useTemperature();
    
     const convertTemp = (temp: number) => {
        if (unit === 'C') return `${temp.toFixed(1)}°C`;
        return `${((temp * 9) / 5 + 32).toFixed(1)}°F`;
    };


  const dailyForecast = forecast.list.filter((item) => {
    const date = new Date(item.dt * 1000);
    const hour = date.getHours();
    return hour >= 11 && hour <= 13;
  }).slice(0, 5); 

  if (dailyForecast.length === 0) {
    for (let i = 0; i < Math.min(5, forecast.list.length); i += 8) {
      if (i < forecast.list.length) {
        dailyForecast.push(forecast.list[i]);
      }
    }
  }

  const hourlyForecast = forecast.list.slice(0, 8);

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* 5-Day Forecast */}
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6">
          <div className="flex items-center justify-center">
            <CalendarDaysIcon className="h-6 w-6 mr-3" />
            <h2 className="text-2xl font-bold">
              5-Day Forecast for {forecast.city.name}
            </h2>
          </div>
        </div>

        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {dailyForecast.map((item, index) => (
              <div
                key={item.dt}
                className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300 border border-blue-100"
              >
                {/* Day */}
                <h3 className="font-bold text-lg text-gray-900 mb-4">
                  {index === 0 ? 'Today' : formatDate(item.dt)}
                </h3>
                
                {/* Weather Icon */}
                <Image
                  src={getWeatherIcon(item.weather[0].icon)}
                  alt={item.weather[0].description}
                  className="w-16 h-16 mx-auto mb-4"
                />
                
                {/* Description */}
                <p className="text-sm text-gray-600 mb-4 capitalize font-medium">
                  {item.weather[0].description}
                </p>
                
                {/* Temperature Range */}
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">High</span>
                    <span className="text-lg font-bold text-red-600">
                      {convertTemp(item.main.temp_max)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">Low</span>
                    <span className="text-lg font-bold text-blue-600">
                      {convertTemp(item.main.temp_min)}
                    </span>
                  </div>
                </div>
                
                {/* Additional Info */}
                <div className="text-xs text-gray-500 space-y-1 bg-white rounded-lg p-3">
                  <div className="flex justify-between">
                    <span>Humidity</span>
                    <span className="font-medium">{item.main.humidity}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Wind</span>
                    <span className="font-medium">{item.wind.speed.toFixed(1)} m/s</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Today's Hourly Forecast */}
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white p-6">
          <div className="flex items-center justify-center">
            <ClockIcon className="h-6 w-6 mr-3" />
            <h3 className="text-2xl font-bold">Today's Hourly Forecast</h3>
          </div>
        </div>

        <div className="p-8">
          <div className="flex overflow-x-auto space-x-4 pb-4">
            {hourlyForecast.map((item, index) => {
              const time = new Date(item.dt * 1000).toLocaleTimeString('en-IN', {
                hour: 'numeric',
                hour12: true,
                timeZone: 'Asia/Kolkata'
              });
              
              const isNow = index === 0;
              
              return (
                <div
                  key={item.dt}
                  className={`flex-shrink-0 rounded-2xl p-4 text-center min-w-[120px] transition-all duration-200 ${
                    isNow 
                      ? 'bg-gradient-to-br from-blue-100 to-blue-200 border-2 border-blue-400' 
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  {/* Time */}
                  <p className={`text-sm font-medium mb-3 ${
                    isNow ? 'text-blue-800' : 'text-gray-600'
                  }`}>
                    {isNow ? 'Now' : time}
                  </p>
                  
                  {/* Weather Icon */}
                  <Image
                    src={getWeatherIcon(item.weather[0].icon)}
                    alt={item.weather[0].description}
                    className="w-10 h-10 mx-auto mb-3"
                  />
                  
                  {/* Temperature */}
                  <p className={`text-lg font-bold mb-2 ${
                    isNow ? 'text-blue-900' : 'text-gray-900'
                  }`}>
                    {convertTemp(item.main.temp)}
                  </p>
                  
                  {/* Feels like */}
                  <p className="text-xs text-gray-500 mb-2">
                    Feels {convertTemp(item.main.feels_like)}
                  </p>
                  
                  {/* Additional details */}
                  <div className="text-xs text-gray-500 space-y-1">
                    <div className="flex items-center justify-center">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mr-1"></div>
                      <span>{item.main.humidity}%</span>
                    </div>
                    <div className="flex items-center justify-center">
                      <div className="w-2 h-2 bg-gray-400 rounded-full mr-1"></div>
                      <span>{item.wind.speed.toFixed(1)} m/s</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Scroll indicator */}
          <div className="flex justify-center mt-4">
            <div className="flex space-x-1">
              {hourlyForecast.map((_, index) => (
                <div 
                  key={index}
                  className="w-2 h-2 bg-gray-300 rounded-full"
                ></div>
              ))}
            </div>
            {/* <p className="text-xs text-gray-500 ml-4">Scroll for more →</p> */}
          </div>
        </div>
      </div>

      {/* Weather Insights */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
        <h4 className="text-lg font-semibold text-green-900 mb-4">
          Forecast Insights
        </h4>
        <div className="grid md:grid-cols-2 gap-4 text-sm text-green-800">
          <div className="flex items-start">
            <div className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
            <p>No significant weather changes expected in the next 24 hours</p>
          </div>
          <div className="flex items-start">
            <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
            <p>Temperature will remain stable with minor fluctuations</p>
          </div>
          <div className="flex items-start">
            <div className="w-2 h-2 bg-yellow-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
            <p>Humidity levels are expected to stay within comfortable range</p>
          </div>
          <div className="flex items-start">
            <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
            <p>Wind conditions will remain light to moderate</p>
          </div>
        </div>
      </div>
    </div>
  );
}