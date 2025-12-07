'use client';

import type { DailyForecast } from '@/types/weather';
import { getWeatherIconUrl } from '@/lib/weatherAPI';

interface ForecastCardProps {
  forecasts: DailyForecast[];
}

export default function ForecastCard({ forecasts }: ForecastCardProps) {
  return (
    <div className="glass-card p-6 max-w-2xl mx-auto animate-fade-in">
      <h2 className="text-2xl font-bold text-white mb-6">5-Day Forecast</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {forecasts.map((forecast, index) => (
          <div
            key={forecast.date}
            className="bg-white/10 rounded-lg p-4 text-center hover:bg-white/20 transition-all duration-300 hover:scale-105"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <p className="text-white font-semibold mb-2">{forecast.day}</p>
            
            <img
              src={getWeatherIconUrl(forecast.weather.icon)}
              alt={forecast.weather.description}
              className="w-16 h-16 mx-auto"
            />
            
            <p className="text-white/70 text-sm capitalize mb-3">
              {forecast.weather.main}
            </p>
            
            <div className="flex justify-center gap-2 text-white">
              <span className="font-semibold">{Math.round(forecast.temp_max)}°</span>
              <span className="text-white/50">{Math.round(forecast.temp_min)}°</span>
            </div>
            
            {forecast.pop > 0 && (
              <p className="text-blue-300 text-xs mt-2">
                {Math.round(forecast.pop * 100)}% rain
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
