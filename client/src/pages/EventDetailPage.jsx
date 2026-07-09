import { useParams } from 'react-router-dom';
import LoadingState from '../components/LoadingState.jsx';
import { useFetch } from '../hooks/useFetch.js';
import Img from '../components/OptimizedImg.jsx';

export default function EventDetailPage() {
  const { slug } = useParams();
  const { data, loading, error } = useFetch(`/events/${slug}`, [slug]);
  if (loading) return <LoadingState />;
  if (error) return <div className="container-page py-16 text-red-600">{error}</div>;

  return (
    <article className="py-12">
      <div className="container-page grid gap-10 md:grid-cols-[1fr_360px]">
        <div>
          <Img src={data.imageUrl} alt={data.title} width="1200" height="675" className="aspect-[16/9] w-full rounded-lg object-cover shadow-soft" />
          <h1 className="mt-8 text-4xl font-bold">{data.title}</h1>
          <p className="mt-4 text-slate-700">{data.description}</p>
        </div>
        <aside className="admin-card h-fit">
          <p className="font-semibold">Date</p>
          <p className="text-slate-600">{new Date(data.date).toLocaleDateString()} · {data.time}</p>
          <p className="mt-4 font-semibold">Location</p>
          <p className="text-slate-600">{data.location || data.onlineLink}</p>
          {data.registrationLink && <a href={data.registrationLink} className="btn-primary mt-6 w-full">Register</a>}
        </aside>
      </div>
    </article>
  );
}
