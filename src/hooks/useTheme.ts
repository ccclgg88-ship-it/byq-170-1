import { useState, useEffect, useCallback } from 'react';
import { ThemeType } from '@/types';
import { applyTheme } from '@/utils/themes';

export function useTheme(defaultTheme: ThemeType = 'healing') {
  const [theme, setTheme] = useState<ThemeType>(defaultTheme);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const toggleTheme = useCallback((newTheme: ThemeType) => {
    setTheme(newTheme);
  }, []);

  return {
    theme,
    setTheme: toggleTheme,
  };
}
