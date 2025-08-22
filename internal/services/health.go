package services

import (
	"time"

	"github.com/ANAS727189/weather-project/internal/models"
)

// HealthService handles health check operations
type HealthService struct {
	startTime time.Time
	version   string
}

// NewHealthService creates a new health service instance
func NewHealthService(version string) *HealthService {
	return &HealthService{
		startTime: time.Now(),
		version:   version,
	}
}

// GetHealthStatus returns the current health status
func (hs *HealthService) GetHealthStatus() *models.HealthResponse {
	uptime := time.Since(hs.startTime)

	return &models.HealthResponse{
		Status:    "healthy",
		Timestamp: time.Now(),
		Version:   hs.version,
		Uptime:    uptime.String(),
		Service:   "weather-api",
	}
}
