package services

import (
	"encoding/json"
	"fmt"
	"net/http"
	"time"

	"github.com/ANAS727189/weather-project/internal/config"
	"github.com/ANAS727189/weather-project/internal/models"
)

// WeatherService handles weather-related operations
type WeatherService struct {
	config     *config.Config
	httpClient *http.Client
}

// NewWeatherService creates a new weather service instance
func NewWeatherService(cfg *config.Config) *WeatherService {
	return &WeatherService{
		config: cfg,
		httpClient: &http.Client{
			Timeout: time.Duration(cfg.API.Timeout) * time.Second,
		},
	}
}

// GetCurrentWeather fetches current weather data for a city
func (ws *WeatherService) GetCurrentWeather(city string) (*models.WeatherData, error) {
	url := fmt.Sprintf("%s/weather?q=%s&appid=%s&units=metric",
		ws.config.API.BaseURL, city, ws.config.API.OpenWeatherMapApiKey)

	resp, err := ws.httpClient.Get(url)
	if err != nil {
		return nil, fmt.Errorf("failed to fetch weather data: %v", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode == http.StatusNotFound {
		return nil, fmt.Errorf("city not found")
	}
	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("API request failed with status: %s", resp.Status)
	}

	var data models.WeatherData
	if err := json.NewDecoder(resp.Body).Decode(&data); err != nil {
		return nil, fmt.Errorf("failed to decode weather data: %v", err)
	}

	return &data, nil
}

// GetForecast fetches forecast data for a city
func (ws *WeatherService) GetForecast(city string) (*models.ForecastData, error) {
	url := fmt.Sprintf("%s/forecast?q=%s&appid=%s&units=metric",
		ws.config.API.BaseURL, city, ws.config.API.OpenWeatherMapApiKey)

	resp, err := ws.httpClient.Get(url)
	if err != nil {
		return nil, fmt.Errorf("failed to fetch forecast data: %v", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode == http.StatusNotFound {
		return nil, fmt.Errorf("city not found")
	}
	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("API request failed with status: %s", resp.Status)
	}

	var data models.ForecastData
	if err := json.NewDecoder(resp.Body).Decode(&data); err != nil {
		return nil, fmt.Errorf("failed to decode forecast data: %v", err)
	}

	return &data, nil
}
