import { Link } from 'react-router-dom';
import LoadingState from '../components/LoadingState.jsx';
import EmptyState from '../components/EmptyState.jsx';
import { useFetch } from '../hooks/useFetch.js';

export default function EventsPage() {
  const { data, loading, error } = useFetch('/events');
  if (loading) return <LoadingState />;
  return (
    <section className="py-14">
      <div className="container-page">
        <h1 className="text-4xl font-bold">Events</h1>
        {error && <p className="mt-6 text-red-600">{error}</p>}
        {data?.length ? <div className="mt-8 grid gap-6 md:grid-cols-3">{data.map((event) => (
          <article key={event._id} className="overflow-hidden rounded-lg border bg-white shadow-sm">
            <img src={event.imageUrl} alt={event.title} width="800" height="220" loading="lazy" className="h-48 w-full object-cover" />
            <div className="p-5">
              <p className="text-sm font-semibold text-accent">{new Date(event.date).toLocaleDateString()} · {event.status}</p>
              <h2 className="mt-2 text-xl font-semibold">{event.title}</h2>
              <p className="mt-2 text-sm text-slate-600">{event.location || event.onlineLink}</p>
              <Link to={`/events/${event.slug}`} className="mt-4 inline-flex text-sm font-semibold text-brand">Details</Link>
            </div>
          </article>
        ))}</div> : <div className="mt-8"><EmptyState /></div>}
      </div>
    </section>
  );
}
