import { WeatherData, ForecastData, HealthCheck } from '@/types/weather';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/v1';

class WeatherAPI {
  private async fetchAPI<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `API request failed: ${response.statusText}`);
    }
    
    return response.json();
  }

  async getCurrentWeather(city: string): Promise<WeatherData> {
    return this.fetchAPI<WeatherData>(`/weather/${encodeURIComponent(city)}`);
  }

  async getForecast(city: string): Promise<ForecastData> {
    return this.fetchAPI<ForecastData>(`/forecast/${encodeURIComponent(city)}`);
  }

  async getHealthCheck(): Promise<HealthCheck> {
    return this.fetchAPI<HealthCheck>('/health');
  }
}

export const weatherAPI = new WeatherAPI();
