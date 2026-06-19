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
          className="px-4 py-1.5 text-sm font-medium inline-flex items-center"
          style={{
            backgroundColor: 'var(--theme-tag-bg)',
            color: 'var(--theme-tag-text)',
            borderRadius: 'var(--theme-radius-tag)',
          }}
        >
          {tag.text}
        </span>
      ))}
    </div>
  );
};
