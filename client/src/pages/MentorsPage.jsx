import LoadingState from '../components/LoadingState.jsx';
import { useFetch } from '../hooks/useFetch.js';

export default function MentorsPage() {
  const { data, loading } = useFetch('/mentors');
  if (loading) return <LoadingState />;
  return (
    <section className="py-14">
      <div className="container-page">
        <h1 className="text-4xl font-bold">Mentors / Faculty</h1>
        <div className="mt-8 grid gap-6 md:grid-cols-4">
          {(data || []).map((mentor) => (
            <article key={mentor._id} className="rounded-lg border bg-white p-5 shadow-sm">
              <img src={mentor.imageUrl} alt={mentor.name} width="400" height="400" loading="lazy" className="aspect-square w-full rounded-md object-cover" />
              <h2 className="mt-4 text-lg font-semibold">{mentor.name}</h2>
              <p className="text-sm text-accent">{mentor.designation}</p>
              <p className="mt-3 text-sm text-slate-600">{mentor.bio}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
