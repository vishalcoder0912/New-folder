const UNSPLASH_REGEX = /^https?:\/\/(?:images\.)?unsplash\.com\//;
const IMAGEKIT_URL = 'https://ik.imagekit.io/fykwhvcdk';

export const getOptimizedUrl = (url, { width, height, quality = 75 } = {}) => {
  if (!url) return url;

  if (UNSPLASH_REGEX.test(url)) {
    const params = new URLSearchParams();
    if (width) params.set('w', Math.round(width * 2));
    if (height) params.set('h', Math.round(height * 2));
    params.set('q', quality);
    params.set('fit', 'crop');
    params.set('fm', 'webp');
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}${params.toString()}`;
  }

  return url;
};

export const getSrcSet = (url, sizes = []) => {
  if (!url || !sizes.length) return undefined;
  const baseUrl = url.split('?')[0];

  if (UNSPLASH_REGEX.test(baseUrl)) {
    return sizes
      .map((w) => {
        const params = new URLSearchParams(url.split('?')[1] || '');
        params.set('w', w);
        params.set('q', 75);
        params.set('fm', 'webp');
        params.set('fit', 'crop');
        return `${baseUrl}?${params.toString()} ${w}w`;
      })
      .join(', ');
  }

  return undefined;
};
