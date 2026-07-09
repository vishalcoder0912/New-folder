import LoadingState from '../components/LoadingState.jsx';
import { useFetch } from '../hooks/useFetch.js';
import Img from '../components/OptimizedImg.jsx';

export default function TestimonialsPage() {
  const { data, loading } = useFetch('/testimonials');
  if (loading) return <LoadingState />;
  return (
    <section className="py-14">
      <div className="container-page">
        <h1 className="text-4xl font-bold">Testimonials</h1>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {(data || []).map((item) => (
            <article key={item._id} className="rounded-lg border bg-white p-6 shadow-sm">
              <p className="text-warm">{'\u2605'.repeat(item.rating)}</p>
              <p className="mt-3 text-slate-700">"{item.reviewText}"</p>
              <div className="mt-5 flex items-center gap-3">
                <Img src={item.studentImage} alt={item.studentName} width="48" height="48" className="h-12 w-12 rounded-full object-cover" />
                <div>
                  <p className="font-semibold">{item.studentName}</p>
                  <p className="text-sm text-slate-500">{item.courseName}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
