import React from 'react';
import { Zap, Heart, Disc } from 'lucide-react';
import { ThemeType } from '@/types';
import { themes } from '@/utils/themes';

interface ThemeSwitcherProps {
  currentTheme: ThemeType;
  onThemeChange: (theme: ThemeType) => void;
}

const themeIcons: Record<ThemeType, React.ReactNode> = {
  cyber: <Zap size={18} />,
  healing: <Heart size={18} />,
  retro: <Disc size={18} />,
};

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({
  currentTheme,
  onThemeChange,
}) => {
  const themeKeys = Object.keys(themes) as ThemeType[];

  return (
    <div className="flex gap-2">
      {themeKeys.map((themeKey) => (
        <button
          key={themeKey}
          onClick={() => onThemeChange(themeKey)}
          className={`
            flex items-center gap-1.5 px-3 py-2 text-sm font-medium
            transition-all duration-300 ease-out
            ${currentTheme === themeKey
              ? 'scale-105'
              : 'opacity-70 hover:opacity-100'
            }
          `}
          style={{
            color: currentTheme === themeKey
              ? 'var(--theme-accent)'
              : 'var(--theme-text-secondary)',
            backgroundColor: currentTheme === themeKey
              ? 'var(--theme-tag-bg)'
              : 'transparent',
            borderRadius: 'var(--theme-radius-button)',
            border: currentTheme === themeKey
              ? '1px solid var(--theme-border)'
              : '1px solid transparent',
          }}
          title={themes[themeKey].name}
        >
          {themeIcons[themeKey]}
          <span className="hidden sm:inline">{themes[themeKey].name}</span>
        </button>
      ))}
    </div>
  );
};
