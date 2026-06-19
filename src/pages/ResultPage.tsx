import React from 'react';
import { ResultCard } from '@/components/ResultCard/ResultCard';
import { useTheme } from '@/hooks/useTheme';
import { AssessmentResult, TagItem } from '@/types';

const mockTags: TagItem[] = [
  { id: '1', text: '浪漫主义者', weight: 95 },
  { id: '2', text: '理想主义', weight: 88 },
  { id: '3', text: '深度思考', weight: 82 },
  { id: '4', text: '创意无限', weight: 76 },
  { id: '5', text: '敏感细腻', weight: 70 },
  { id: '6', text: '温暖治愈', weight: 65 },
];

const mockResult: AssessmentResult = {
  personaTitle: '梦境编织者',
  destinyText: '你是那个在现实世界里依然相信童话的人，用温柔的眼光看待世界，用浪漫的笔触书写人生。你的存在本身就是一首诗，让身边的人都能感受到美好与希望。',
  tags: mockTags,
  userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face',
  nickname: '小雨',
};

export const ResultPage: React.FC = () => {
  const { theme, setTheme } = useTheme('healing');

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 sm:p-8"
      style={{
        background: theme === 'cyber'
          ? 'linear-gradient(135deg, #0f0f23 0%, #1a1a3e 50%, #0f0f23 100%)'
          : theme === 'healing'
          ? 'linear-gradient(135deg, #fce7f3 0%, #dcfce7 50%, #fce7f3 100%)'
          : 'linear-gradient(135deg, #f5f0e6 0%, #e8e0d0 50%, #f5f0e6 100%)',
        transition: 'background 0.5s ease',
      }}
    >
      <div className="w-full">
        <div className="text-center mb-8">
          <h1
            className="text-2xl sm:text-3xl font-bold mb-2"
            style={{
              color: 'var(--theme-text-primary)',
              fontFamily: 'var(--theme-font-title)',
            }}
          >
            你的专属测评结果
          </h1>
          <p
            className="text-sm"
            style={{
              color: 'var(--theme-text-secondary)',
              fontFamily: 'var(--theme-font-body)',
            }}
          >
            发现独特的自己
          </p>
        </div>
        
        <ResultCard
          result={mockResult}
          theme={theme}
          onThemeChange={setTheme}
        />

        <div className="text-center mt-8">
          <p
            className="text-xs"
            style={{
              color: 'var(--theme-text-secondary)',
              fontFamily: 'var(--theme-font-body)',
            }}
          >
            保存海报分享给朋友，看看他们的人设是什么
          </p>
        </div>
      </div>
    </div>
  );
};
