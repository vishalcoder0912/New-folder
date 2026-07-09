import { getOptimizedUrl, getSrcSet } from '../utils/image.js';

export default function OptimizedImg({ src, alt, width, height, className, loading = 'lazy' }) {
  if (!src) return null;

  const widths = width ? [width * 2] :undefined;
  const srcSet = getSrcSet(src, widths);
  const optimizedSrc = getOptimizedUrl(src, { width, height });

  return (
    <img
      src={optimizedSrc}
      alt={alt}
      width={width}
      height={height}
      loading={loading}
      srcSet={srcSet}
      className={className}
      decoding="async"
    />
  );
}
