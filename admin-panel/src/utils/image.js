const IMAGEKIT_URL = 'https://ik.imagekit.io/fykwhvcdk';

export const getOptimizedUrl = (url, { width, height, quality = 75 } = {}) => {
  if (!url) return url;
  if (url.startsWith(IMAGEKIT_URL)) {
    const params = [];
    if (width) params.push(`w-${Math.round(width * 2)}`);
    if (height) params.push(`h-${Math.round(height * 2)}`);
    params.push(`q-${quality}`, 'fo-auto');
    if (params.length) {
      const separator = url.includes('?') ? '&' : '?';
      return `${url}${separator}tr=${params.join(',')}`;
    }
  }
  return url;
};
