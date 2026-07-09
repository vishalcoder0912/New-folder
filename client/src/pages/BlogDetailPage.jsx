import { useParams } from 'react-router-dom';
import LoadingState from '../components/LoadingState.jsx';
import { useFetch } from '../hooks/useFetch.js';
import Img from '../components/OptimizedImg.jsx';

export default function BlogDetailPage() {
  const { slug } = useParams();
  const { data, loading, error } = useFetch(`/blogs/${slug}`, [slug]);
  if (loading) return <LoadingState />;
  if (error) return <div className="container-page py-16 text-red-600">{error}</div>;

  return (
    <article className="bg-white py-12">
      <div className="container-page max-w-4xl">
        <p className="text-sm font-semibold uppercase text-accent">{data.category} &middot; {data.author}</p>
        <h1 className="mt-3 text-4xl font-bold">{data.title}</h1>
        <p className="mt-4 text-lg text-slate-600">{data.shortExcerpt}</p>
        <Img src={data.featuredImage} alt={data.title} width="1200" height="675" className="mt-8 aspect-[16/9] w-full rounded-lg object-cover shadow-soft" />
        <div className="prose mt-8 max-w-none" dangerouslySetInnerHTML={{ __html: data.fullContent }} />
      </div>
    </article>
  );
}
