import { useState } from 'react';
import { defaultThemeConfig } from '../configs';

export const useTheme = () => {
  const [theme, setTheme] = useState(() => {
    const themeLS = localStorage.getItem('groove-theme-config');
    return themeLS ? JSON.parse(themeLS) : defaultThemeConfig;
  });

  const updateTheme = (newTheme: any) => {
    setTheme(newTheme);
    localStorage.setItem('groove-theme-config', JSON.stringify(newTheme));
  };

  return [theme, updateTheme];
};
