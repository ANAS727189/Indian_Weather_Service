package server

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/ANAS727189/weather-project/internal/config"
	"github.com/ANAS727189/weather-project/internal/routes"
)

// Server represents the HTTP server
type Server struct {
	config     *config.Config
	httpServer *http.Server
}


func NewServer(cfg *config.Config) *Server {
	return &Server{
		config: cfg,
	}
}


func (s *Server) Start() error {

	router := routes.NewRouter(s.config)
	handler := router.SetupRoutes()


	s.httpServer = &http.Server{
		Addr:         fmt.Sprintf(":%s", s.config.Server.Port),
		Handler:      handler,
		ReadTimeout:  time.Duration(s.config.Server.ReadTimeout) * time.Second,
		WriteTimeout: time.Duration(s.config.Server.WriteTimeout) * time.Second,
	}

	// Start server in a goroutine
	go func() {
		log.Printf("Weather API server starting on port %s...", s.config.Server.Port)
		log.Println("Available endpoints:")
		log.Println("GET /api/v1/health - Health check")
		log.Println("GET /api/v1/weather/{city} - Current weather")
		log.Println("GET /api/v1/forecast/{city} - 5-day forecast")
		log.Println("GET /weather/{city} - Legacy current weather endpoint")

		if err := s.httpServer.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			log.Fatalf("Server failed to start: %v", err)
		}
	}()
	return s.waitForShutdown()
}


func (s *Server) waitForShutdown() error {
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit

	log.Println("Shutting down server...")


	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()


	if err := s.httpServer.Shutdown(ctx); err != nil {
		log.Printf("Server forced to shutdown: %v", err)
		return err
	}

	log.Println("Server exited")
	return nil
}
