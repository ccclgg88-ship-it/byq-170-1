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
            inline-flex items-center justify-center gap-1.5 px-3 py-2 text-sm font-medium
            transition-all duration-300 ease-out text-center align-middle
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
            lineHeight: '1',
          }}
          title={themes[themeKey].name}
        >
          <span className="shrink-0 inline-flex items-center justify-center">
            {themeIcons[themeKey]}
          </span>
          <span className="hidden sm:inline-block align-middle leading-none">{themes[themeKey].name}</span>
        </button>
      ))}
    </div>
  );
};
