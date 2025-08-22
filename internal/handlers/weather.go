package handlers

import (
	"fmt"
	"net/http"
	"strings"

	"github.com/ANAS727189/weather-project/internal/services"
	"github.com/ANAS727189/weather-project/internal/utils"
	"github.com/gorilla/mux"
)

// WeatherHandler handles weather-related HTTP requests
type WeatherHandler struct {
	weatherService *services.WeatherService
}

// NewWeatherHandler creates a new weather handler
func NewWeatherHandler(weatherService *services.WeatherService) *WeatherHandler {
	return &WeatherHandler{
		weatherService: weatherService,
	}
}

// GetCurrentWeather handles GET /api/v1/weather/{city}
func (h *WeatherHandler) GetCurrentWeather(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	city := vars["city"]

	if city == "" {
		utils.WriteErrorResponse(w, "City parameter is required", http.StatusBadRequest)
		return
	}

	// Validate city name
	if err := validateCityName(city); err != nil {
		utils.WriteErrorResponse(w, err.Error(), http.StatusBadRequest)
		return
	}

	data, err := h.weatherService.GetCurrentWeather(city)
	if err != nil {
		if strings.Contains(err.Error(), "city not found") {
			utils.WriteErrorResponse(w, fmt.Sprintf("City '%s' not found", city), http.StatusNotFound)
		} else {
			utils.WriteErrorResponse(w, err.Error(), http.StatusInternalServerError)
		}
		return
	}

	utils.WriteSuccessResponse(w, data)
}

// GetForecast handles GET /api/v1/forecast/{city}
func (h *WeatherHandler) GetForecast(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	city := vars["city"]

	if city == "" {
		utils.WriteErrorResponse(w, "City parameter is required", http.StatusBadRequest)
		return
	}

	// Validate city name
	if err := validateCityName(city); err != nil {
		utils.WriteErrorResponse(w, err.Error(), http.StatusBadRequest)
		return
	}

	data, err := h.weatherService.GetForecast(city)
	if err != nil {
		if strings.Contains(err.Error(), "city not found") {
			utils.WriteErrorResponse(w, fmt.Sprintf("City '%s' not found", city), http.StatusNotFound)
		} else {
			utils.WriteErrorResponse(w, err.Error(), http.StatusInternalServerError)
		}
		return
	}

	utils.WriteSuccessResponse(w, data)
}

// GetCurrentWeatherLegacy handles GET /weather/{city} (legacy endpoint)
func (h *WeatherHandler) GetCurrentWeatherLegacy(w http.ResponseWriter, r *http.Request) {
	city := strings.TrimPrefix(r.URL.Path, "/weather/")

	if city == "" {
		utils.WriteErrorResponse(w, "City parameter is required", http.StatusBadRequest)
		return
	}

	// Validate city name
	if err := validateCityName(city); err != nil {
		utils.WriteErrorResponse(w, err.Error(), http.StatusBadRequest)
		return
	}

	data, err := h.weatherService.GetCurrentWeather(city)
	if err != nil {
		utils.WriteErrorResponse(w, err.Error(), http.StatusInternalServerError)
		return
	}

	utils.WriteSuccessResponse(w, data)
}

// validateCityName validates the city name format
func validateCityName(city string) error {
	if len(city) == 0 {
		return fmt.Errorf("city name cannot be empty")
	}
	if len(city) > 100 {
		return fmt.Errorf("city name too long")
	}
	// Basic sanitization - remove potentially dangerous characters
	if strings.ContainsAny(city, "<>\"'&") {
		return fmt.Errorf("city name contains invalid characters")
	}
	return nil
}
