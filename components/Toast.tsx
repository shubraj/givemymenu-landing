'use client';

import { useState, useEffect } from 'react';

type ToastProps = {
  message: string;
  type?: 'success' | 'error' | 'info';
  duration?: number;
  onClose?: () => void;
  isVisible: boolean;
};

export default function Toast({ 
  message, 
  type = 'success', 
  duration = 4000, 
  onClose,
  isVisible 
}: ToastProps) {
  const [isShowing, setIsShowing] = useState(false);

  // Handle animation states
  useEffect(() => {
    if (isVisible) {
      setIsShowing(true);
      const timer = setTimeout(() => {
        setIsShowing(false);
        if (onClose) {
          setTimeout(() => {
            onClose();
          }, 300); // Wait for fade out animation
        }
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible && !isShowing) return null;

  // Get appropriate background color based on type
  const bgColor = {
    success: 'bg-green-500 dark:bg-green-600',
    error: 'bg-red-500 dark:bg-red-600',
    info: 'bg-blue-500 dark:bg-blue-600',
  }[type];

  // Get appropriate icon based on type
  const icon = {
    success: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    ),
    error: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    ),
    info: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  }[type];

  return (
    <div 
      className={`fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 
                 px-4 py-3 rounded-lg shadow-lg text-white
                 flex items-center space-x-2 min-w-72 max-w-md
                 transition-all duration-300 ease-in-out
                 ${bgColor}
                 ${isShowing ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      role="alert"
    >
      <span className="flex-shrink-0">{icon}</span>
      <span className="text-sm font-medium">{message}</span>
      <button 
        onClick={() => setIsShowing(false)}
        className="ml-auto -mr-1 text-white focus:outline-none hover:opacity-75"
        aria-label="Close"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
} 