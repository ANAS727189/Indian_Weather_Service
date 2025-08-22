# Indian Weather Service

A professional-grade weather application built with modern Go backend architecture and Next.js frontend. Provides real-time weather data and 5-day forecasts for cities worldwide through a robust RESTful API.

## 🌟 Features

### Backend (Go - Clean Architecture)
- **Modular Architecture** with clear separation of concerns
- **RESTful API** with versioned endpoints (`/api/v1`)
- **Health Monitoring** with detailed status reporting
- **Configuration Management** supporting multiple sources (files, environment variables)
- **Graceful Shutdown** with proper resource cleanup
- **CORS Support** for cross-origin requests
- **Input Validation** and sanitization
- **Structured Error Handling** with consistent JSON responses
- **HTTP Client Timeout** management for external API calls

### Frontend (Next.js 15 + TypeScript)
- **Modern React Architecture** with App Router
- **Server-Side Rendering** for optimal performance
- **Responsive Design** optimized for all devices
- **Real-time Weather Search** with instant feedback
- **Professional UI Components** with loading and error states
- **Type-Safe Development** with comprehensive TypeScript definitions
- **Component-Based Architecture** for maintainability
- **Accessibility Features** following WCAG guidelines

## 🚀 Quick Start

### Prerequisites
- **Go 1.24.4+** 
- **Node.js 18+** and npm
- **OpenWeatherMap API Key** (obtain from [openweathermap.org](https://openweathermap.org/api))

### Backend Setup

1. **Clone and navigate to the project:**
   ```bash
   git clone <repository-url>
   ```

2. **Install dependencies:**
   ```bash
   go mod tidy
   ```

3. **Configure API credentials:**
   Create a `.apiConfig` file in the root directory:
   ```json
   {
     "openWeatherMapApiKey": "your_api_key_here"
   }
   ```

4. **Start the server:**
   ```bash
   go run main.go
   ```
   
   Server will start on `http://localhost:8080` with the following endpoints available:
   - `GET /api/v1/health` - Health check
   - `GET /api/v1/weather/{city}` - Current weather
   - `GET /api/v1/forecast/{city}` - 5-day forecast
   - `GET /weather/{city}` - Legacy endpoint

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```
   
   Frontend will be available at `http://localhost:3000`

## 🏗️ Architecture Overview

### Backend Structure (Clean Architecture)
```
Weather/
├── main.go                    # Application entry point
├── go.mod                     # Go module definition
├── cmd/
│   └── server/
│       └── main.go           # Server initialization
├── internal/                  # Private application code
│   ├── config/               # Configuration management
│   │   └── config.go
│   ├── handlers/             # HTTP request handlers
│   │   ├── health.go
│   │   └── weather.go
│   ├── middleware/           # HTTP middleware
│   │   └── cors.go
│   ├── models/              # Data models and structures
│   │   └── weather.go
│   ├── routes/              # Route definitions
│   │   └── routes.go
│   ├── services/            # Business logic layer
│   │   └── weather.go
│   └── utils/               # Utility functions
│       └── response.go
├── pkg/                     # Public/reusable packages
│   └── server/
│       └── server.go
└── frontend/               # Next.js application
    ├── src/
    │   ├── app/           # App Router pages
    │   │   ├── layout.tsx
    │   │   ├── page.tsx
    │   │   └── globals.css
    │   ├── components/    # Reusable UI components
    │   │   ├── SearchBar.tsx
    │   │   ├── WeatherCard.tsx
    │   │   ├── ForecastCard.tsx
    │   │   ├── LoadingSpinner.tsx
    │   │   ├── ErrorMessage.tsx
    │   │   └── Header.tsx
    │   ├── lib/          # Utility libraries
    │   │   └── api.ts
    │   └── types/        # TypeScript definitions
    │       └── weather.ts
    ├── package.json
    └── next.config.ts
```

## 📡 API Documentation

### Health Check Endpoint
```http
GET /api/v1/health
```

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2024-01-15T10:30:00Z",
  "version": "1.0.0",
  "uptime": "2h30m45s",
  "service": "Weather API"
}
```

### Current Weather Endpoint
```http
GET /api/v1/weather/{city}
```

**Parameters:**
- `city` (string): City name (e.g., "London", "New York")

**Response:**
```json
{
  "name": "London",
  "country": "GB",
  "main": {
    "temp": 15.67,
    "feels_like": 14.23,
    "temp_min": 13.89,
    "temp_max": 17.45,
    "pressure": 1013,
    "humidity": 72
  },
  "weather": [{
    "main": "Clouds",
    "description": "scattered clouds",
    "icon": "03d"
  }],
  "wind": {
    "speed": 3.6,
    "deg": 230
  },
  "visibility": 10000,
  "sys": {
    "sunrise": 1673768423,
    "sunset": 1673802156
  }
}
```

### 5-Day Forecast Endpoint
```http
GET /api/v1/forecast/{city}
```

**Response:**
```json
{
  "list": [
    {
      "dt": 1673784000,
      "main": {
        "temp": 16.23,
        "humidity": 68
      },
      "weather": [{
        "main": "Clear",
        "description": "clear sky",
        "icon": "01d"
      }],
      "dt_txt": "2024-01-15 12:00:00"
    }
  ],
  "city": {
    "name": "London",
    "country": "GB"
  }
}
```

## 🔧 Technology Stack

### Backend Technologies
- **Go 1.24.4** - High-performance backend language
- **Gorilla Mux** - HTTP router and URL matcher
- **OpenWeatherMap API** - Weather data provider
- **JSON** - Data serialization format
- **CORS Middleware** - Cross-origin request handling

### Frontend Technologies
- **Next.js 15** - React framework with App Router
- **React 19** - Modern React with concurrent features
- **TypeScript 5** - Type-safe JavaScript development
- **Tailwind CSS 4** - Utility-first CSS framework
- **Heroicons** - Professional SVG icon library
- **Turbopack** - Ultra-fast bundler for development

### Development Tools
- **ESLint** - Code linting and style enforcement
- **PostCSS** - CSS transformation and optimization
- **Go Modules** - Dependency management for Go

## 🌐 Deployment

### Production Build

**Backend:**
```bash
# Build optimized binary
go build -ldflags="-w -s" -o weather-server main.go

# Run in production
./weather-server
```

**Frontend:**
```bash
# Create production build
npm run build

# Start production server
npm start
```

### Environment Configuration

The application supports configuration through multiple sources:

1. **Environment Variables** (highest priority)
2. **Configuration Files** (`.apiConfig`)
3. **Default Values** (fallback)

**Key Environment Variables:**
- `PORT` - Server port (default: 8080)
- `HOST` - Server host (default: localhost)
- `OPENWEATHER_API_KEY` - OpenWeatherMap API key
- `ALLOWED_ORIGINS` - CORS allowed origins
- `READ_TIMEOUT` - HTTP read timeout (seconds)
- `WRITE_TIMEOUT` - HTTP write timeout (seconds)

### Cloud Deployment Ready

The project includes:
- **GitHub Actions** workflow for automated health checks
- **Environment-based configuration** for different deployment stages
- **Graceful shutdown** for zero-downtime deployments

## 🔍 Monitoring & Health Checks

The application provides comprehensive health monitoring:

- **Health Endpoint**: `/api/v1/health` for load balancer checks
- **Uptime Tracking**: Server uptime reporting
- **Service Status**: Real-time service health indicators
- **Error Logging**: Structured error reporting for debugging

## 🧪 Development

### Code Organization
- **Clean Architecture** principles for maintainability
- **Dependency Injection** for testability
- **Interface-based Design** for flexibility
- **Error Handling** with context preservation
- **Type Safety** throughout the application stack

### Best Practices Implemented
- **Input Validation** on all user inputs
- **Graceful Error Handling** with user-friendly messages
- **Resource Management** with proper cleanup
- **Security Headers** and CORS configuration
- **Performance Optimization** with HTTP client timeouts

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Follow Go and React best practices
4. Add tests for new functionality
5. Commit your changes: `git commit -m 'Add amazing feature'`
6. Push to the branch: `git push origin feature/amazing-feature`
7. Open a Pull Request

---

**Professional Weather Service** - Built with modern Go and Next.js architecture for scalability and performance.
