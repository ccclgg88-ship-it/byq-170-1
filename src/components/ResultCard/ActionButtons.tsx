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
        className="flex-1 flex items-center justify-center gap-2 px-6 py-3 font-medium
                   transition-all duration-200 hover:scale-105 active:scale-95"
        style={{
          backgroundColor: 'var(--theme-tag-bg)',
          color: 'var(--theme-accent)',
          borderRadius: 'var(--theme-radius-button)',
          border: '1px solid var(--theme-border)',
        }}
      >
        {copySuccess ? (
          <>
            <Check size={18} />
            <span>已复制</span>
          </>
        ) : (
          <>
            <Copy size={18} />
            <span>复制文案</span>
          </>
        )}
      </button>

      <button
        onClick={onGeneratePoster}
        disabled={isGenerating}
        className="flex-1 flex items-center justify-center gap-2 px-6 py-3 font-medium
                   transition-all duration-200 hover:scale-105 active:scale-95
                   disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
        style={{
          backgroundColor: 'var(--theme-accent)',
          color: 'var(--theme-bg)',
          borderRadius: 'var(--theme-radius-button)',
        }}
      >
        <Download size={18} />
        <span>{isGenerating ? '生成中...' : '生成海报'}</span>
      </button>
    </div>
  );
};
