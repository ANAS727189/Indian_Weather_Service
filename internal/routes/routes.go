package routes

import (
	"github.com/ANAS727189/weather-project/internal/config"
	"github.com/ANAS727189/weather-project/internal/handlers"
	"github.com/ANAS727189/weather-project/internal/middleware"
	"github.com/ANAS727189/weather-project/internal/services"
	"github.com/gorilla/mux"
)

// Router holds all the route configurations
type Router struct {
	config         *config.Config
	weatherHandler *handlers.WeatherHandler
	healthHandler  *handlers.HealthHandler
}

// NewRouter creates a new router instance
func NewRouter(cfg *config.Config) *Router {
	// Initialize services
	weatherService := services.NewWeatherService(cfg)
	healthService := services.NewHealthService("1.0.0")

	// Initialize handlers
	weatherHandler := handlers.NewWeatherHandler(weatherService)
	healthHandler := handlers.NewHealthHandler(healthService)

	return &Router{
		config:         cfg,
		weatherHandler: weatherHandler,
		healthHandler:  healthHandler,
	}
}

// SetupRoutes configures all routes and middleware
func (router *Router) SetupRoutes() *mux.Router {
	r := mux.NewRouter()

	// Apply global middleware
	r.Use(middleware.LoggingMiddleware)
	r.Use(middleware.RecoveryMiddleware)
	r.Use(middleware.CORSMiddleware(
		router.config.Server.CORS.AllowedOrigins,
		router.config.Server.CORS.AllowedMethods,
		router.config.Server.CORS.AllowedHeaders,
		router.config.Server.CORS.AllowCredentials,
	))

	// API v1 routes
	api := r.PathPrefix("/api/v1").Subrouter()
	router.setupAPIRoutes(api)

	// Legacy routes for backward compatibility
	router.setupLegacyRoutes(r)

	return r
}

// setupAPIRoutes configures the API v1 routes
func (router *Router) setupAPIRoutes(api *mux.Router) {
	// Health check
	api.HandleFunc("/health", router.healthHandler.GetHealth).Methods("GET")

	// Weather routes
	api.HandleFunc("/weather/{city}", router.weatherHandler.GetCurrentWeather).Methods("GET")
	api.HandleFunc("/forecast/{city}", router.weatherHandler.GetForecast).Methods("GET")
}

// setupLegacyRoutes configures legacy routes for backward compatibility
func (router *Router) setupLegacyRoutes(r *mux.Router) {
	r.HandleFunc("/weather/{city}", router.weatherHandler.GetCurrentWeatherLegacy).Methods("GET")
}
