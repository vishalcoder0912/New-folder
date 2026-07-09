import { Link } from 'react-router-dom';

export default function BlogCard({ blog }) {
  return (
    <article className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
      <img src={blog.featuredImage || '/placeholder.svg'} alt={blog.title} width="800" height="200" loading="lazy" className="h-44 w-full object-cover" />
      <div className="p-5">
        <span className="text-xs font-semibold uppercase text-accent">{blog.category}</span>
        <h3 className="mt-2 text-lg font-semibold">{blog.title}</h3>
        <p className="mt-2 text-sm text-slate-600">{blog.shortExcerpt}</p>
        <Link to={`/blog/${blog.slug}`} className="mt-4 inline-flex text-sm font-semibold text-brand">Read article</Link>
      </div>
    </article>
  );
}
