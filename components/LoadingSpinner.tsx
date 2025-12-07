'use client';

export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px]">
      <div className="glass-card p-12">
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 border-4 border-white/20 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-transparent border-t-white rounded-full animate-spin"></div>
        </div>
        <p className="mt-6 text-white/80 text-lg">Loading weather data...</p>
      </div>
    </div>
  );
}
