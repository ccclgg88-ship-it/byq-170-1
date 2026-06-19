import React from 'react';
import { Copy, Download, Check } from 'lucide-react';

interface ActionButtonsProps {
  onCopy: () => void;
  onGeneratePoster: () => void;
  isGenerating: boolean;
  copySuccess: boolean;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  onCopy,
  onGeneratePoster,
  isGenerating,
  copySuccess,
}) => {
  return (
    <div className="flex gap-3 w-full">
      <button
        onClick={onCopy}
        className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 font-medium
                   transition-all duration-200 hover:scale-105 active:scale-95
                   text-center align-middle"
        style={{
          backgroundColor: 'var(--theme-tag-bg)',
          color: 'var(--theme-accent)',
          borderRadius: 'var(--theme-radius-button)',
          border: '1px solid var(--theme-border)',
          lineHeight: '1',
        }}
      >
        {copySuccess ? (
          <>
            <Check size={18} className="shrink-0 inline-block align-middle" />
            <span className="inline-block align-middle leading-none">已复制</span>
          </>
        ) : (
          <>
            <Copy size={18} className="shrink-0 inline-block align-middle" />
            <span className="inline-block align-middle leading-none">复制文案</span>
          </>
        )}
      </button>

      <button
        onClick={onGeneratePoster}
        disabled={isGenerating}
        className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 font-medium
                   transition-all duration-200 hover:scale-105 active:scale-95
                   disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100
                   text-center align-middle"
        style={{
          backgroundColor: 'var(--theme-accent)',
          color: 'var(--theme-bg)',
          borderRadius: 'var(--theme-radius-button)',
          lineHeight: '1',
        }}
      >
        <Download size={18} className="shrink-0 inline-block align-middle" />
        <span className="inline-block align-middle leading-none">{isGenerating ? '生成中...' : '生成海报'}</span>
      </button>
    </div>
  );
};
