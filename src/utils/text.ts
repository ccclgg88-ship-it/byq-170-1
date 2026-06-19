export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

export function isTextTruncated(text: string, maxLength: number): boolean {
  return text.length > maxLength;
}

export function copyToClipboard(text: string): Promise<boolean> {
  return new Promise((resolve) => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text)
        .then(() => resolve(true))
        .catch(() => resolve(false));
    } else {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand('copy');
        resolve(true);
      } catch {
        resolve(false);
      }
      document.body.removeChild(textarea);
    }
  });
}

export function generateShareText(
  personaTitle: string,
  destinyText: string,
  tags: string[]
): string {
  return `我的测评结果：${personaTitle}\n"${destinyText}"\n${tags.map(t => `#${t}`).join(' ')}`;
}
