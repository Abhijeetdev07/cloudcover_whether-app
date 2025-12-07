'use client';

import { FiAlertCircle } from 'react-icons/fi';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export default function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px]">
      <div className="glass-card p-8 max-w-md text-center">
        <FiAlertCircle size={48} className="text-red-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-white mb-2">Oops!</h3>
        <p className="text-white/80 mb-6">{message}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="px-6 py-3 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-all duration-300 backdrop-blur-sm"
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  );
}
