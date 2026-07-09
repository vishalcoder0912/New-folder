import { getOptimizedUrl, getSrcSet } from '../utils/image.js';

export default function OptimizedImg({ src, alt, width, height, className, loading, fetchPriority, ...rest }) {
  if (!src) return null;

  const widths = width ? [width * 2] : undefined;
  const srcSet = getSrcSet(src, widths);
  const optimizedSrc = getOptimizedUrl(src, { width, height });
  const isLCP = fetchPriority === 'high';

  return (
    <img
      src={optimizedSrc}
      alt={alt}
      width={width}
      height={height}
      loading={isLCP ? undefined : (loading || 'lazy')}
      fetchPriority={fetchPriority}
      srcSet={srcSet}
      className={className}
      decoding="async"
      {...rest}
    />
  );
}
