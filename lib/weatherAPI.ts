import axios from 'axios';
import type {
  CurrentWeatherResponse,
  ForecastResponse,
  DailyForecast,
} from '@/types/weather';

const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// Error handling wrapper
async function handleApiCall<T>(apiCall: Promise<T>): Promise<T> {
  try {
    return await apiCall;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        throw new Error('City not found. Please check the spelling and try again.');
      } else if (error.response?.status === 401) {
        throw new Error('Invalid API key. Please check your configuration.');
      } else if (error.response?.status === 429) {
        throw new Error('Too many requests. Please try again later.');
      } else {
        throw new Error('Failed to fetch weather data. Please try again.');
      }
    }
    throw new Error('Network error. Please check your connection.');
  }
}

/**
 * Get current weather by city name
 */
export async function getCurrentWeather(city: string): Promise<CurrentWeatherResponse> {
  const url = `${BASE_URL}/weather`;
  const params = {
    q: city,
    appid: API_KEY,
    units: 'metric',
  };

  const response = await handleApiCall(
    axios.get<CurrentWeatherResponse>(url, { params })
  );
  
  return response.data;
}

/**
 * Get current weather by coordinates
 */
export async function getWeatherByCoords(
  lat: number,
  lon: number
): Promise<CurrentWeatherResponse> {
  const url = `${BASE_URL}/weather`;
  const params = {
    lat,
    lon,
    appid: API_KEY,
    units: 'metric',
  };

  const response = await handleApiCall(
    axios.get<CurrentWeatherResponse>(url, { params })
  );
  
  return response.data;
}

/**
 * Get 5-day forecast by city name
 */
export async function getForecast(city: string): Promise<ForecastResponse> {
  const url = `${BASE_URL}/forecast`;
  const params = {
    q: city,
    appid: API_KEY,
    units: 'metric',
  };

  const response = await handleApiCall(
    axios.get<ForecastResponse>(url, { params })
  );
  
  return response.data;
}

/**
 * Get 5-day forecast by coordinates
 */
export async function getForecastByCoords(
  lat: number,
  lon: number
): Promise<ForecastResponse> {
  const url = `${BASE_URL}/forecast`;
  const params = {
    lat,
    lon,
    appid: API_KEY,
    units: 'metric',
  };

  const response = await handleApiCall(
    axios.get<ForecastResponse>(url, { params })
  );
  
  return response.data;
}

/**
 * Process forecast data to get daily forecasts
 */
export function processDailyForecast(forecast: ForecastResponse): DailyForecast[] {
  const dailyData: { [key: string]: DailyForecast } = {};

  forecast.list.forEach((item) => {
    const date = new Date(item.dt * 1000);
    const dateKey = date.toISOString().split('T')[0];

    if (!dailyData[dateKey]) {
      dailyData[dateKey] = {
        date: dateKey,
        day: date.toLocaleDateString('en-US', { weekday: 'short' }),
        temp_min: item.main.temp_min,
        temp_max: item.main.temp_max,
        weather: item.weather[0],
        pop: item.pop,
      };
    } else {
      // Update min/max temperatures
      dailyData[dateKey].temp_min = Math.min(
        dailyData[dateKey].temp_min,
        item.main.temp_min
      );
      dailyData[dateKey].temp_max = Math.max(
        dailyData[dateKey].temp_max,
        item.main.temp_max
      );
      // Update probability of precipitation to the highest value
      dailyData[dateKey].pop = Math.max(dailyData[dateKey].pop, item.pop);
    }
  });

  // Convert to array and take first 5 days
  return Object.values(dailyData).slice(0, 5);
}

/**
 * Get weather icon URL
 */
export function getWeatherIconUrl(iconCode: string): string {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
}
