package handlers

import (
	"net/http"

	"github.com/ANAS727189/weather-project/internal/services"
	"github.com/ANAS727189/weather-project/internal/utils"
)

// HealthHandler handles health check requests
type HealthHandler struct {
	healthService *services.HealthService
}

// NewHealthHandler creates a new health handler
func NewHealthHandler(healthService *services.HealthService) *HealthHandler {
	return &HealthHandler{
		healthService: healthService,
	}
}

// GetHealth handles GET /api/v1/health
func (h *HealthHandler) GetHealth(w http.ResponseWriter, r *http.Request) {
	health := h.healthService.GetHealthStatus()
	utils.WriteSuccessResponse(w, health)
}
