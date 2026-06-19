import { ThemeType, ThemeConfig } from '@/types';

export const themes: Record<ThemeType, ThemeConfig> = {
  cyber: {
    name: '赛博朋克',
    colors: {
      background: '#0a0a1f',
      backgroundGradientFrom: '#0a0a1f',
      backgroundGradientTo: '#1a1a3e',
      textPrimary: '#ffffff',
      textSecondary: '#a0a0c0',
      accent: '#00f5ff',
      accentSecondary: '#ff00ff',
      tagBg: 'rgba(0, 245, 255, 0.15)',
      tagText: '#00f5ff',
      border: 'rgba(0, 245, 255, 0.3)',
      shadow: 'rgba(0, 245, 255, 0.4)',
    },
    fonts: {
      title: 'Orbitron, system-ui, sans-serif',
      body: 'system-ui, -apple-system, sans-serif',
    },
    borderRadius: {
      card: '16px',
      tag: '20px',
      button: '8px',
    },
  },
  healing: {
    name: '治愈系',
    colors: {
      background: '#fff5f7',
      backgroundGradientFrom: '#fff5f7',
      backgroundGradientTo: '#f0fdf4',
      textPrimary: '#2d3748',
      textSecondary: '#718096',
      accent: '#f687b3',
      accentSecondary: '#68d391',
      tagBg: 'rgba(246, 135, 179, 0.2)',
      tagText: '#d53f8c',
      border: 'rgba(246, 135, 179, 0.3)',
      shadow: 'rgba(246, 135, 179, 0.25)',
    },
    fonts: {
      title: 'Quicksand, system-ui, sans-serif',
      body: 'Quicksand, system-ui, -apple-system, sans-serif',
    },
    borderRadius: {
      card: '24px',
      tag: '16px',
      button: '12px',
    },
  },
  retro: {
    name: '复古风',
    colors: {
      background: '#f5f0e6',
      backgroundGradientFrom: '#f5f0e6',
      backgroundGradientTo: '#e8e0d0',
      textPrimary: '#2d2a24',
      textSecondary: '#6b6558',
      accent: '#b8860b',
      accentSecondary: '#2f4f4f',
      tagBg: 'rgba(184, 134, 11, 0.15)',
      tagText: '#8b6914',
      border: 'rgba(139, 105, 20, 0.3)',
      shadow: 'rgba(139, 105, 20, 0.25)',
    },
    fonts: {
      title: '"Playfair Display", Georgia, serif',
      body: 'Georgia, "Times New Roman", serif',
    },
    borderRadius: {
      card: '4px',
      tag: '2px',
      button: '4px',
    },
  },
};

export function applyTheme(theme: ThemeType): void {
  const config = themes[theme];
  const root = document.documentElement;

  root.style.setProperty('--theme-bg', config.colors.background);
  root.style.setProperty('--theme-bg-from', config.colors.backgroundGradientFrom || config.colors.background);
  root.style.setProperty('--theme-bg-to', config.colors.backgroundGradientTo || config.colors.background);
  root.style.setProperty('--theme-text-primary', config.colors.textPrimary);
  root.style.setProperty('--theme-text-secondary', config.colors.textSecondary);
  root.style.setProperty('--theme-accent', config.colors.accent);
  root.style.setProperty('--theme-accent-secondary', config.colors.accentSecondary);
  root.style.setProperty('--theme-tag-bg', config.colors.tagBg);
  root.style.setProperty('--theme-tag-text', config.colors.tagText);
  root.style.setProperty('--theme-border', config.colors.border);
  root.style.setProperty('--theme-shadow', config.colors.shadow);
  
  root.style.setProperty('--theme-font-title', config.fonts.title);
  root.style.setProperty('--theme-font-body', config.fonts.body);
  
  root.style.setProperty('--theme-radius-card', config.borderRadius.card);
  root.style.setProperty('--theme-radius-tag', config.borderRadius.tag);
  root.style.setProperty('--theme-radius-button', config.borderRadius.button);
}
