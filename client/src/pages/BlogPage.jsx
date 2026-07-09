import BlogCard from '../components/BlogCard.jsx';
import LoadingState from '../components/LoadingState.jsx';
import EmptyState from '../components/EmptyState.jsx';
import { useFetch } from '../hooks/useFetch.js';

export default function BlogPage() {
  const { data, loading, error } = useFetch('/blogs');
  if (loading) return <LoadingState />;
  return (
    <section className="py-14">
      <div className="container-page">
        <h1 className="text-4xl font-bold">Blog</h1>
        {error && <p className="mt-6 text-red-600">{error}</p>}
        {data?.length ? <div className="mt-8 grid gap-6 md:grid-cols-3">{data.map((blog) => <BlogCard key={blog._id} blog={blog} />)}</div> : <div className="mt-8"><EmptyState /></div>}
      </div>
    </section>
  );
}
