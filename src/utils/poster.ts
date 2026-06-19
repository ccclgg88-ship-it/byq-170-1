import html2canvas from 'html2canvas';

export async function generatePoster(element: HTMLElement): Promise<string> {
  try {
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: null,
      logging: false,
    });
    return canvas.toDataURL('image/png');
  } catch (error) {
    console.error('生成海报失败:', error);
    throw new Error('海报生成失败，请重试');
  }
}

export function downloadPoster(dataUrl: string, filename: string = '测评结果.png'): void {
  const link = document.createElement('a');
  link.download = filename;
  link.href = dataUrl;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function validateNickname(nickname: string): boolean {
  return nickname.trim().length > 0;
}
