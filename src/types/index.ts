export interface TagItem {
  id: string;
  text: string;
  weight: number;
}

export interface AssessmentResult {
  personaTitle: string;
  destinyText: string;
  tags: TagItem[];
  userAvatar: string;
  nickname: string;
}

export type ThemeType = 'cyber' | 'healing' | 'retro';

export interface ThemeColors {
  background: string;
  backgroundGradientFrom?: string;
  backgroundGradientTo?: string;
  textPrimary: string;
  textSecondary: string;
  accent: string;
  accentSecondary: string;
  tagBg: string;
  tagText: string;
  border: string;
  shadow: string;
}

export interface ThemeFonts {
  title: string;
  body: string;
}

export interface ThemeBorderRadius {
  card: string;
  tag: string;
  button: string;
}

export interface ThemeConfig {
  name: string;
  colors: ThemeColors;
  fonts: ThemeFonts;
  borderRadius: ThemeBorderRadius;
}
