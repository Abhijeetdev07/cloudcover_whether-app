'use client';

import { useEffect, useState } from 'react';
import type { WeatherType } from '@/types/weather';

interface WeatherBackgroundProps {
  weatherType: WeatherType;
  isDay: boolean;
}

const weatherThemes: Record<WeatherType, { day: string[]; night: string[] }> = {
  clear: {
    day: ['#56CCF2', '#2F80ED', '#1E3A8A'],
    night: ['#0F172A', '#1E293B', '#334155'],
  },
  clouds: {
    day: ['#667EEA', '#764BA2', '#4A5568'],
    night: ['#1A202C', '#2D3748', '#4A5568'],
  },
  rain: {
    day: ['#4B6CB7', '#182848', '#2C5364'],
    night: ['#0F2027', '#203A43', '#2C5364'],
  },
  drizzle: {
    day: ['#89F7FE', '#66A6FF', '#4A90E2'],
    night: ['#1E3A8A', '#1E40AF', '#3B82F6'],
  },
  thunderstorm: {
    day: ['#141E30', '#243B55', '#2C3E50'],
    night: ['#000000', '#1A1A2E', '#16213E'],
  },
  snow: {
    day: ['#E0EAFC', '#CFDEF3', '#B8C6DB'],
    night: ['#2C3E50', '#3498DB', '#5DADE2'],
  },
  mist: {
    day: ['#C9D6FF', '#E2E2E2', '#A8DADC'],
    night: ['#2C3E50', '#4CA1AF', '#457B9D'],
  },
  fog: {
    day: ['#BDBBBE', '#9D9EA3', '#757F9A'],
    night: ['#232526', '#414345', '#616161'],
  },
  haze: {
    day: ['#F2994A', '#F2C94C', '#FFA07A'],
    night: ['#3E2723', '#5D4037', '#795548'],
  },
};

export default function WeatherBackground({
  weatherType,
  isDay,
}: WeatherBackgroundProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const colors = weatherThemes[weatherType]?.[isDay ? 'day' : 'night'] || 
                 weatherThemes.clear[isDay ? 'day' : 'night'];

  const gradientStyle = {
    background: `linear-gradient(135deg, ${colors[0]} 0%, ${colors[1]} 50%, ${colors[2]} 100%)`,
  };

  return (
    <div
      className={`fixed inset-0 -z-10 transition-all duration-1000 ${
        mounted ? 'opacity-100' : 'opacity-0'
      }`}
      style={gradientStyle}
    >
      {/* Animated overlay for depth */}
      <div className="absolute inset-0 bg-black/10"></div>
      
      {/* Subtle pattern overlay */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, white 1px, transparent 1px),
                           radial-gradient(circle at 80% 80%, white 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      ></div>
    </div>
  );
}
