# Weather Station

A modern, professional weather application with a Go backend API and Next.js frontend. Get accurate weather information and 5-day forecasts for any city worldwide.

## 🌟 Features

### Backend (Go)
- **RESTful API** with industry-standard endpoints
- **Health Check** endpoint for monitoring
- **Current Weather** data for any city
- **5-day Forecast** with hourly details
- **CORS enabled** for frontend integration
- **Error handling** with structured JSON responses
- **Input validation** and sanitization
- **Graceful error handling** for API failures

### Frontend (Next.js + Tailwind CSS)
- **Modern UI/UX** inspired by government weather websites
- **Responsive design** that works on all devices
- **Real-time search** with loading states
- **Professional weather cards** with detailed information
- **5-day forecast** with hourly breakdown
- **Error handling** with retry functionality
- **Smooth animations** and transitions
- **Accessibility features**

## 🚀 Getting Started

### Prerequisites
- Go 1.24.5 or higher
- Node.js 18+ and npm
- OpenWeatherMap API key

### Backend Setup

1. **Navigate to the Weather directory:**
   ```bash
   cd projects/Weather
   ```

2. **Install Go dependencies:**
   ```bash
   go mod tidy
   ```

3. **Configure your API key:**
   Update the `.apiConfig` file with your OpenWeatherMap API key:
   ```json
   {
     "openWeatherMapApiKey": "your_api_key_here"
   }
   ```

4. **Start the backend server:**
   ```bash
   go run main.go
   ```
   
   The server will start on `http://localhost:8080`

### Frontend Setup

1. **Navigate to the frontend directory:**
   ```bash
   cd projects/Weather/frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   Create a `.env.local` file:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:8080/api/v1
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```
   
   The frontend will be available at `http://localhost:3000`

## 📡 API Endpoints

### Health Check
```
GET /api/v1/health
```
Returns server health status, uptime, and version information.

### Current Weather
```
GET /api/v1/weather/{city}
```
Returns current weather data for the specified city.

### 5-Day Forecast
```
GET /api/v1/forecast/{city}
```
Returns detailed 5-day weather forecast with 3-hour intervals.

### Legacy Endpoints
```
GET /weather/{city}
```
Backward-compatible endpoint for current weather.

## 🏗️ Project Structure

```
Weather/
├── main.go              # Go backend server
├── go.mod               # Go dependencies
├── .apiConfig           # OpenWeatherMap API configuration
└── frontend/
    ├── src/
    │   ├── app/
    │   │   ├── page.tsx         # Main page component
    │   │   ├── layout.tsx       # App layout
    │   │   └── globals.css      # Global styles
    │   ├── components/
    │   │   ├── Header.tsx       # App header
    │   │   ├── SearchBar.tsx    # City search component
    │   │   ├── WeatherCard.tsx  # Current weather display
    │   │   ├── ForecastCard.tsx # Forecast display
    │   │   ├── LoadingSpinner.tsx
    │   │   └── ErrorMessage.tsx
    │   ├── lib/
    │   │   ├── api.ts           # API client
    │   │   └── utils.ts         # Utility functions
    │   └── types/
    │       └── weather.ts       # TypeScript type definitions
    ├── package.json
    ├── tailwind.config.ts
    ├── next.config.ts
    └── .env.local
```

## 🎨 Design Features

- **Government Weather Website Inspired**: Clean, professional layout
- **Responsive Design**: Works seamlessly on desktop and mobile
- **Modern Color Scheme**: Blue gradient themes with professional aesthetics
- **Interactive Elements**: Hover effects, smooth transitions
- **Data Visualization**: Weather icons, temperature charts, forecast grids
- **Error States**: Graceful handling of API failures
- **Loading States**: Professional loading indicators

## 🔧 Technology Stack

### Backend
- **Go**: High-performance HTTP server
- **Gorilla Mux**: Powerful URL router and dispatcher
- **CORS**: Cross-Origin Resource Sharing support
- **JSON**: RESTful API responses

### Frontend
- **Next.js 15**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **Heroicons**: Beautiful hand-crafted SVG icons
- **Turbopack**: Ultra-fast bundler for development

## 📊 API Response Examples

### Current Weather
```json
{
  "name": "London",
  "country": "GB",
  "main": {
    "temp": 13.83,
    "feels_like": 12.97,
    "temp_min": 13.83,
    "temp_max": 13.83,
    "pressure": 1021,
    "humidity": 65
  },
  "weather": [{
    "main": "Clouds",
    "description": "scattered clouds",
    "icon": "03n"
  }],
  "wind": {
    "speed": 3.1,
    "deg": 44
  },
  "visibility": 10000,
  "sys": {
    "sunrise": 1642755149,
    "sunset": 1642803509
  }
}
```

## 🚀 Production Deployment

### Backend
- Build: `go build -o weather-server main.go`
- Deploy binary to your server
- Set up reverse proxy (nginx/Apache)
- Configure environment variables

### Frontend
- Build: `npm run build`
- Deploy to Vercel, Netlify, or your hosting provider
- Update `NEXT_PUBLIC_API_URL` for production API

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add some amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- OpenWeatherMap for providing weather data API
- Next.js team for the excellent React framework
- Tailwind CSS for the utility-first CSS framework
- Heroicons for beautiful SVG icons

---

Built with ❤️ using Go and Next.js
