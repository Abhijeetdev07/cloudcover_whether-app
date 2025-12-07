'use client';

import type { CurrentWeatherResponse } from '@/types/weather';
import { getWeatherIconUrl } from '@/lib/weatherAPI';
import {
  WiHumidity,
  WiStrongWind,
  WiBarometer,
  WiSunrise,
  WiSunset,
} from 'react-icons/wi';

interface WeatherCardProps {
  weather: CurrentWeatherResponse;
}

export default function WeatherCard({ weather }: WeatherCardProps) {
  const formatTime = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const weatherCondition = weather.weather[0];
  const iconUrl = getWeatherIconUrl(weatherCondition.icon);

  return (
    <div className="glass-card p-8 max-w-2xl mx-auto mb-8 animate-fade-in">
      {/* Location */}
      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold text-white mb-2">
          {weather.name}, {weather.sys.country}
        </h1>
        <p className="text-white/70 text-lg capitalize">
          {weatherCondition.description}
        </p>
      </div>

      {/* Main Temperature */}
      <div className="flex items-center justify-center mb-8">
        <img
          src={iconUrl}
          alt={weatherCondition.description}
          className="w-32 h-32"
        />
        <div className="text-center">
          <div className="text-7xl font-bold text-white">
            {Math.round(weather.main.temp)}°
          </div>
          <p className="text-white/60 text-lg mt-2">
            Feels like {Math.round(weather.main.feels_like)}°
          </p>
        </div>
      </div>

      {/* Weather Details Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        <div className="flex items-center gap-3 bg-white/10 rounded-lg p-4">
          <WiHumidity size={40} className="text-blue-300" />
          <div>
            <p className="text-white/60 text-sm">Humidity</p>
            <p className="text-white text-xl font-semibold">
              {weather.main.humidity}%
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-white/10 rounded-lg p-4">
          <WiStrongWind size={40} className="text-cyan-300" />
          <div>
            <p className="text-white/60 text-sm">Wind Speed</p>
            <p className="text-white text-xl font-semibold">
              {Math.round(weather.wind.speed * 3.6)} km/h
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-white/10 rounded-lg p-4">
          <WiBarometer size={40} className="text-purple-300" />
          <div>
            <p className="text-white/60 text-sm">Pressure</p>
            <p className="text-white text-xl font-semibold">
              {weather.main.pressure} hPa
            </p>
          </div>
        </div>
      </div>

      {/* Sunrise & Sunset */}
      <div className="flex justify-around bg-white/10 rounded-lg p-4">
        <div className="flex items-center gap-2">
          <WiSunrise size={40} className="text-orange-300" />
          <div>
            <p className="text-white/60 text-sm">Sunrise</p>
            <p className="text-white text-lg font-semibold">
              {formatTime(weather.sys.sunrise)}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <WiSunset size={40} className="text-orange-400" />
          <div>
            <p className="text-white/60 text-sm">Sunset</p>
            <p className="text-white text-lg font-semibold">
              {formatTime(weather.sys.sunset)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
