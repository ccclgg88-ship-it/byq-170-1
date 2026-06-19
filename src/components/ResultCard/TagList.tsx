import React from 'react';
import { TagItem } from '@/types';

interface TagListProps {
  tags: TagItem[];
}

export const TagList: React.FC<TagListProps> = ({ tags }) => {
  const sortedTags = [...tags].sort((a, b) => b.weight - a.weight);

  return (
    <div className="flex flex-wrap justify-center gap-2">
      {sortedTags.map((tag, index) => (
        <span
          key={tag.id}
          className="px-4 py-1.5 text-sm font-medium animate-fade-in"
          style={{
            backgroundColor: 'var(--theme-tag-bg)',
            color: 'var(--theme-tag-text)',
            borderRadius: 'var(--theme-radius-tag)',
            animationDelay: `${index * 0.08}s`,
            opacity: 0,
            animation: `fadeInUp 0.5s ease-out ${index * 0.08}s forwards`,
          }}
        >
          {tag.text}
        </span>
      ))}
    </div>
  );
};
