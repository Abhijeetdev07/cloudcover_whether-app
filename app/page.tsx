'use client';

import { useEffect, useState } from 'react';
import type { CurrentWeatherResponse, ForecastResponse, DailyForecast, WeatherType } from '@/types/weather';
import { getCurrentWeather, getWeatherByCoords, getForecast, getForecastByCoords, processDailyForecast } from '@/lib/weatherAPI';
import { getCurrentLocation, DEFAULT_LOCATION } from '@/lib/geolocation';
import SearchBar from '@/components/SearchBar';
import WeatherCard from '@/components/WeatherCard';
import ForecastCard from '@/components/ForecastCard';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorMessage from '@/components/ErrorMessage';
import WeatherBackground from '@/components/WeatherBackground';
import { FiMapPin } from 'react-icons/fi';

export default function Home() {
  const [weather, setWeather] = useState<CurrentWeatherResponse | null>(null);
  const [forecast, setForecast] = useState<DailyForecast[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [weatherType, setWeatherType] = useState<WeatherType>('clear');
  const [isDay, setIsDay] = useState(true);

  // Fetch weather by coordinates
  const fetchWeatherByCoords = async (lat: number, lon: number) => {
    try {
      setLoading(true);
      setError(null);

      const [weatherData, forecastData] = await Promise.all([
        getWeatherByCoords(lat, lon),
        getForecastByCoords(lat, lon),
      ]);

      setWeather(weatherData);
      setForecast(processDailyForecast(forecastData));
      updateWeatherType(weatherData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  // Fetch weather by city name
  const fetchWeatherByCity = async (city: string) => {
    try {
      setLoading(true);
      setError(null);

      const [weatherData, forecastData] = await Promise.all([
        getCurrentWeather(city),
        getForecast(city),
      ]);

      setWeather(weatherData);
      setForecast(processDailyForecast(forecastData));
      updateWeatherType(weatherData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  // Update weather type and day/night status
  const updateWeatherType = (weatherData: CurrentWeatherResponse) => {
    const condition = weatherData.weather[0].main.toLowerCase() as WeatherType;
    setWeatherType(condition);

    const currentTime = Date.now() / 1000;
    const isDayTime = currentTime > weatherData.sys.sunrise && currentTime < weatherData.sys.sunset;
    setIsDay(isDayTime);
  };

  // Get user location on mount
  useEffect(() => {
    const initWeather = async () => {
      try {
        const location = await getCurrentLocation();
        await fetchWeatherByCoords(location.latitude, location.longitude);
      } catch (err) {
        // Fallback to default location
        console.log('Using default location:', err);
        await fetchWeatherByCoords(DEFAULT_LOCATION.latitude, DEFAULT_LOCATION.longitude);
      }
    };

    initWeather();
  }, []);

  // Handle search
  const handleSearch = (city: string) => {
    fetchWeatherByCity(city);
  };

  // Handle retry
  const handleRetry = () => {
    if (weather) {
      fetchWeatherByCity(weather.name);
    } else {
      fetchWeatherByCoords(DEFAULT_LOCATION.latitude, DEFAULT_LOCATION.longitude);
    }
  };

  // Handle use current location
  const handleUseCurrentLocation = async () => {
    try {
      setLoading(true);
      setError(null);
      const location = await getCurrentLocation();
      await fetchWeatherByCoords(location.latitude, location.longitude);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get location');
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen relative">
      <WeatherBackground weatherType={weatherType} isDay={isDay} />
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
            Weather Forecast
          </h1>
          <p className="text-white/80 text-lg">
            Real-time weather updates for any location
          </p>
        </div>

        {/* Search Bar */}
        <SearchBar onSearch={handleSearch} isLoading={loading} />

        {/* Current Location Button */}
        <div className="flex justify-center mb-8">
          <button
            onClick={handleUseCurrentLocation}
            disabled={loading}
            className="flex items-center gap-2 px-6 py-3 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-all duration-300 backdrop-blur-sm disabled:opacity-50"
          >
            <FiMapPin size={20} />
            Use Current Location
          </button>
        </div>

        {/* Content */}
        {loading && <LoadingSpinner />}
        
        {error && !loading && (
          <ErrorMessage message={error} onRetry={handleRetry} />
        )}

        {weather && !loading && !error && (
          <div className="space-y-6">
            <WeatherCard weather={weather} />
            {forecast.length > 0 && <ForecastCard forecasts={forecast} />}
          </div>
        )}
      </div>
    </main>
  );
}
