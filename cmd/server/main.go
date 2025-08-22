package main

import (
	"log"

	"github.com/ANAS727189/weather-project/internal/config"
	"github.com/ANAS727189/weather-project/pkg/server"
)

func main() {
	// Load configuration
	cfg, err := config.LoadConfig("")
	if err != nil {
		log.Fatalf("Failed to load configuration: %v", err)
	}

	// Create and start server
	srv := server.NewServer(cfg)
	if err := srv.Start(); err != nil {
		log.Fatalf("Server error: %v", err)
	}
}
