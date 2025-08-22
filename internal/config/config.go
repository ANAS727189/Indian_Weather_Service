package config

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"os"
	"strconv"
)

// Config holds all configuration for the application
type Config struct {
	Server ServerConfig `json:"server"`
	API    APIConfig    `json:"api"`
}

// ServerConfig holds server configuration
type ServerConfig struct {
	Port         string     `json:"port"`
	Host         string     `json:"host"`
	ReadTimeout  int        `json:"read_timeout"`
	WriteTimeout int        `json:"write_timeout"`
	CORS         CORSConfig `json:"cors"`
}

// CORSConfig holds CORS configuration
type CORSConfig struct {
	AllowedOrigins   []string `json:"allowed_origins"`
	AllowedMethods   []string `json:"allowed_methods"`
	AllowedHeaders   []string `json:"allowed_headers"`
	AllowCredentials bool     `json:"allow_credentials"`
}

// APIConfig holds external API configuration
type APIConfig struct {
	OpenWeatherMapApiKey string `json:"openWeatherMapApiKey"`
	BaseURL              string `json:"base_url"`
	Timeout              int    `json:"timeout"`
}

// LoadConfig loads configuration from file and environment variables
func LoadConfig(configPath string) (*Config, error) {
	// Default configuration
	config := &Config{
		Server: ServerConfig{
			Port:         "8080",
			Host:         "localhost",
			ReadTimeout:  30,
			WriteTimeout: 30,
			CORS: CORSConfig{
				AllowedOrigins:   []string{"http://localhost:3000", "http://127.0.0.1:3000"},
				AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
				AllowedHeaders:   []string{"*"},
				AllowCredentials: true,
			},
		},
		API: APIConfig{
			BaseURL: "https://api.openweathermap.org/data/2.5",
			Timeout: 30,
		},
	}

	// Load from file if exists
	if configPath != "" {
		if err := loadFromFile(config, configPath); err != nil {
			return nil, fmt.Errorf("failed to load config from file: %v", err)
		}
	} else {
		// Try to load legacy .apiConfig file by default
		if err := loadLegacyAPIConfig(config); err != nil {
			return nil, fmt.Errorf("failed to load API config: %v", err)
		}
	}

	// Override with environment variables
	loadFromEnv(config)

	// Validate required fields
	if err := validateConfig(config); err != nil {
		return nil, fmt.Errorf("invalid configuration: %v", err)
	}

	return config, nil
}

func loadFromFile(config *Config, path string) error {
	// If no path provided, try to load legacy .apiConfig file
	if path == "" {
		return loadLegacyAPIConfig(config)
	}

	if _, err := os.Stat(path); os.IsNotExist(err) {
		// Try to load legacy .apiConfig file
		return loadLegacyAPIConfig(config)
	}

	bytes, err := ioutil.ReadFile(path)
	if err != nil {
		return err
	}

	return json.Unmarshal(bytes, config)
}

func loadLegacyAPIConfig(config *Config) error {
	type legacyConfig struct {
		OpenWeatherMapApiKey string `json:"openWeatherMapApiKey"`
	}

	bytes, err := ioutil.ReadFile(".apiConfig")
	if err != nil {
		return err
	}

	var legacy legacyConfig
	if err := json.Unmarshal(bytes, &legacy); err != nil {
		return err
	}

	config.API.OpenWeatherMapApiKey = legacy.OpenWeatherMapApiKey
	return nil
}

func loadFromEnv(config *Config) {
	// Server configuration from environment
	if port := os.Getenv("PORT"); port != "" {
		config.Server.Port = port
	}
	if host := os.Getenv("HOST"); host != "" {
		config.Server.Host = host
	}
	if timeout := os.Getenv("READ_TIMEOUT"); timeout != "" {
		if val, err := strconv.Atoi(timeout); err == nil {
			config.Server.ReadTimeout = val
		}
	}
	if timeout := os.Getenv("WRITE_TIMEOUT"); timeout != "" {
		if val, err := strconv.Atoi(timeout); err == nil {
			config.Server.WriteTimeout = val
		}
	}

	// API configuration from environment
	if apiKey := os.Getenv("OPENWEATHER_API_KEY"); apiKey != "" {
		config.API.OpenWeatherMapApiKey = apiKey
	}
	if baseURL := os.Getenv("OPENWEATHER_BASE_URL"); baseURL != "" {
		config.API.BaseURL = baseURL
	}
	if timeout := os.Getenv("API_TIMEOUT"); timeout != "" {
		if val, err := strconv.Atoi(timeout); err == nil {
			config.API.Timeout = val
		}
	}
}

func validateConfig(config *Config) error {
	if config.API.OpenWeatherMapApiKey == "" {
		return fmt.Errorf("OpenWeatherMap API key is required")
	}
	if config.Server.Port == "" {
		return fmt.Errorf("server port is required")
	}
	return nil
}

// GetAddress returns the server address
func (c *Config) GetAddress() string {
	return fmt.Sprintf("%s:%s", c.Server.Host, c.Server.Port)
}
