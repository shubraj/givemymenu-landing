'use client';

import { ReactNode, useEffect } from 'react';

export default function Providers({ children }: { children: ReactNode }) {
  // Handle initial theme setup
  useEffect(() => {
    // On page load, check for user preference
    if (typeof window !== 'undefined') {
      const storedTheme = localStorage.getItem('theme');
      
      // Apply theme based on stored preference
      // Default to dark mode unless explicitly set to light
      if (storedTheme === 'light') {
        document.documentElement.classList.remove('dark');
      } else {
        document.documentElement.classList.add('dark');
        // Only set if not already explicitly set
        if (!storedTheme) {
          localStorage.setItem('theme', 'dark');
        }
      }
    }
  }, []);

  return (
    <>
      {children}
    </>
  );
} 