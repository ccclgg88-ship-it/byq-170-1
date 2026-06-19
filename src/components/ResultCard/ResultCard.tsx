import React, { useState, useRef, useCallback } from 'react';
import { User } from 'lucide-react';
import { AssessmentResult, ThemeType } from '@/types';
import { ThemeSwitcher } from './ThemeSwitcher';
import { TagList } from './TagList';
import { ActionButtons } from './ActionButtons';
import { truncateText, isTextTruncated, copyToClipboard, generateShareText } from '@/utils/text';
import { generatePoster, downloadPoster, validateNickname } from '@/utils/poster';

interface ResultCardProps {
  result: AssessmentResult;
  theme: ThemeType;
  onThemeChange: (theme: ThemeType) => void;
  onNicknameChange?: (nickname: string) => void;
}

const DESTINY_TEXT_MAX_LENGTH = 40;
const DEFAULT_AVATAR = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iNDAiIGN5PSI0MCIgcj0iNDAiIGZpbGw9IiNkOWQ5ZDkiLz4KPGNpcmNsZSBjeD0iNDAiIGN5PSIzMiIgcj0iMTIiIGZpbGw9IiM5ZTllOWUiLz4KPHBhdGggZD0iTTIwIDY0QzIwIDUyLjk1NDMgMjguOTU0MyA0NCA0MCA0NEM1MS4wNDU3IDQ0IDYwIDUyLjk1NDMgNjAgNjRIMjBaIiBmaWxsPSIjOWU5ZTllIi8+Cjwvc3ZnPgo=';

export const ResultCard: React.FC<ResultCardProps> = ({
  result,
  theme,
  onThemeChange,
  onNicknameChange,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [showFullText, setShowFullText] = useState(false);
  const [avatarError, setAvatarError] = useState(false);
  const [showNicknameModal, setShowNicknameModal] = useState(false);
  const [nickname, setNickname] = useState(result.nickname);
  const [tempNickname, setTempNickname] = useState(result.nickname);

  const displayNickname = nickname || '神秘用户';
  const truncated = isTextTruncated(result.destinyText, DESTINY_TEXT_MAX_LENGTH);

  const handleCopy = useCallback(async () => {
    const tagTexts = result.tags.map(tag => tag.text);
    const shareText = generateShareText(result.personaTitle, result.destinyText, tagTexts);
    const fullText = `${displayNickname}的测评结果\n\n${shareText}`;
    const success = await copyToClipboard(fullText);
    
    if (success) {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  }, [result, displayNickname]);

  const handleGeneratePoster = useCallback(async () => {
    if (!validateNickname(nickname)) {
      setShowNicknameModal(true);
      setTempNickname(nickname);
      return;
    }

    if (!cardRef.current) return;

    setIsGenerating(true);
    try {
      const dataUrl = await generatePoster(cardRef.current);
      downloadPoster(dataUrl, `${result.personaTitle}-测评结果.png`);
    } catch (error) {
      console.error('生成海报失败:', error);
      alert('海报生成失败，请重试');
    } finally {
      setIsGenerating(false);
    }
  }, [nickname, result.personaTitle]);

  const handleAvatarError = useCallback(() => {
    setAvatarError(true);
  }, []);

  const handleNicknameSubmit = useCallback(() => {
    if (validateNickname(tempNickname)) {
      setNickname(tempNickname);
      onNicknameChange?.(tempNickname);
      setShowNicknameModal(false);
      setTimeout(() => {
        handleGeneratePoster();
      }, 100);
    }
  }, [tempNickname, onNicknameChange, handleGeneratePoster]);

  return (
    <div className="relative w-full max-w-md mx-auto">
      <div
        ref={cardRef}
        className="relative p-8 transition-all duration-500 ease-out"
        style={{
          background: `linear-gradient(135deg, var(--theme-bg-from), var(--theme-bg-to))`,
          borderRadius: 'var(--theme-radius-card)',
          boxShadow: `0 20px 60px -15px var(--theme-shadow)`,
          border: '1px solid var(--theme-border)',
        }}
      >
        <div className="absolute top-4 right-4">
          <ThemeSwitcher currentTheme={theme} onThemeChange={onThemeChange} />
        </div>

        <div className="flex flex-col items-center text-center pt-8">
          <div
            className="w-20 h-20 rounded-full overflow-hidden mb-4 flex items-center justify-center"
            style={{
              border: '3px solid var(--theme-accent)',
              backgroundColor: 'var(--theme-tag-bg)',
            }}
          >
            {avatarError ? (
              <User
                size={40}
                style={{ color: 'var(--theme-text-secondary)' }}
              />
            ) : (
              <img
                src={result.userAvatar || DEFAULT_AVATAR}
                alt={displayNickname}
                className="w-full h-full object-cover"
                onError={handleAvatarError}
              />
            )}
          </div>

          <h3
            className="text-lg font-medium mb-1"
            style={{
              color: 'var(--theme-text-primary)',
              fontFamily: 'var(--theme-font-body)',
            }}
          >
            {displayNickname}
          </h3>

          <p
            className="text-sm mb-6"
            style={{
              color: 'var(--theme-text-secondary)',
              fontFamily: 'var(--theme-font-body)',
            }}
          >
            年度测评报告
          </p>

          <div
            className="text-3xl font-bold mb-4"
            style={{
              color: 'var(--theme-accent)',
              fontFamily: 'var(--theme-font-title)',
              letterSpacing: '0.02em',
              textShadow: theme === 'cyber'
                ? `0 0 20px var(--theme-accent)`
                : 'none',
            }}
          >
            {result.personaTitle}
          </div>

          <div
            className="w-16 h-1 mb-6 rounded-full"
            style={{
              background: `linear-gradient(90deg, var(--theme-accent), var(--theme-accent-secondary))`,
            }}
          />

          <div
            className="relative mb-8 cursor-pointer"
            onMouseEnter={() => truncated && setShowFullText(true)}
            onMouseLeave={() => setShowFullText(false)}
          >
            <p
              className="text-base leading-relaxed italic"
              style={{
                color: 'var(--theme-text-primary)',
                fontFamily: 'var(--theme-font-body)',
                maxWidth: '280px',
              }}
            >
              "{truncated ? truncateText(result.destinyText, DESTINY_TEXT_MAX_LENGTH) : result.destinyText}"
            </p>
            
            {truncated && showFullText && (
              <div
                className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 p-3 w-72 text-left
                           z-10 animate-fade-in"
                style={{
                  backgroundColor: 'var(--theme-text-primary)',
                  color: 'var(--theme-bg)',
                  borderRadius: 'var(--theme-radius-button)',
                  fontSize: '14px',
                  lineHeight: '1.6',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                }}
              >
                {result.destinyText}
                <div
                  className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0"
                  style={{
                    borderLeft: '8px solid transparent',
                    borderRight: '8px solid transparent',
                    borderTop: '8px solid var(--theme-text-primary)',
                  }}
                />
              </div>
            )}
          </div>

          <div className="mb-8">
            <TagList tags={result.tags} />
          </div>

          <ActionButtons
            onCopy={handleCopy}
            onGeneratePoster={handleGeneratePoster}
            isGenerating={isGenerating}
            copySuccess={copySuccess}
          />
        </div>

        {theme === 'cyber' && (
          <>
            <div
              className="absolute top-0 left-0 w-full h-1"
              style={{
                background: 'linear-gradient(90deg, transparent, var(--theme-accent), var(--theme-accent-secondary), transparent)',
                borderRadius: 'var(--theme-radius-card) var(--theme-radius-card) 0 0',
              }}
            />
            <div
              className="absolute bottom-0 left-0 w-full h-1"
              style={{
                background: 'linear-gradient(90deg, transparent, var(--theme-accent-secondary), var(--theme-accent), transparent)',
                borderRadius: '0 0 var(--theme-radius-card) var(--theme-radius-card)',
              }}
            />
          </>
        )}

        {theme === 'retro' && (
          <>
            <div
              className="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2"
              style={{ borderColor: 'var(--theme-accent)' }}
            />
            <div
              className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2"
              style={{ borderColor: 'var(--theme-accent)' }}
            />
            <div
              className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2"
              style={{ borderColor: 'var(--theme-accent)' }}
            />
            <div
              className="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2"
              style={{ borderColor: 'var(--theme-accent)' }}
            />
          </>
        )}
      </div>

      {showNicknameModal && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
        >
          <div
            className="bg-white p-6 rounded-xl w-80 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-bold text-gray-800 mb-2">请填写昵称</h3>
            <p className="text-sm text-gray-500 mb-4">
              生成海报前需要填写您的昵称
            </p>
            <input
              type="text"
              value={tempNickname}
              onChange={(e) => setTempNickname(e.target.value)}
              placeholder="请输入昵称"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4
                         focus:outline-none focus:ring-2 focus:ring-pink-400"
              autoFocus
            />
            <div className="flex gap-3">
              <button
                onClick={() => setShowNicknameModal(false)}
                className="flex-1 py-2 text-gray-600 border border-gray-300 rounded-lg
                           hover:bg-gray-50 transition-colors"
              >
                取消
              </button>
              <button
                onClick={handleNicknameSubmit}
                disabled={!validateNickname(tempNickname)}
                className="flex-1 py-2 text-white bg-pink-500 rounded-lg
                           hover:bg-pink-600 transition-colors
                           disabled:opacity-50 disabled:cursor-not-allowed"
              >
                确定
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
