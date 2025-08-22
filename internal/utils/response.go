package utils

import (
	"encoding/json"
	"net/http"

	"github.com/ANAS727189/weather-project/internal/models"
)

// WriteJSONResponse writes a JSON response with the given status code
func WriteJSONResponse(w http.ResponseWriter, statusCode int, data interface{}) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(statusCode)
	json.NewEncoder(w).Encode(data)
}

// WriteErrorResponse writes an error response with proper structure
func WriteErrorResponse(w http.ResponseWriter, message string, statusCode int) {
	response := models.ErrorResponse{
		Error:   http.StatusText(statusCode),
		Message: message,
		Status:  statusCode,
	}
	WriteJSONResponse(w, statusCode, response)
}

// WriteSuccessResponse writes a success response
func WriteSuccessResponse(w http.ResponseWriter, data interface{}) {
	WriteJSONResponse(w, http.StatusOK, data)
}
