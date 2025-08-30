
'use client';

import { useState, useEffect, useCallback } from 'react';

export function useDarkMode() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Set initial state from the class on the <html> element
    setIsDarkMode(document.documentElement.classList.contains('dark'));
  }, []);

  const toggleDarkMode = useCallback(() => {
    setIsDarkMode(prev => {
        const newIsDark = !prev;
        if (newIsDark) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
        return newIsDark;
    });
  }, []);

  return { isDarkMode, toggleDarkMode };
}
