import SectionRenderer from '../components/SectionRenderer.jsx';
import { api } from '../services/api.js';
import { useEffect, useState } from 'react';

function HomeSkeleton() {
  return (
    <main>
      <section className="min-h-[calc(100vh-4rem)] bg-white">
        <div className="container-page grid min-h-[calc(100vh-4rem)] animate-pulse items-center gap-10 py-12 md:grid-cols-[1fr_0.85fr]">
          <div>
            <div className="mb-6 h-6 w-48 rounded-full bg-slate-200" />
            <div className="h-16 w-full max-w-2xl rounded bg-slate-200" />
            <div className="mt-5 h-6 w-full max-w-xl rounded bg-slate-200" />
            <div className="mt-4 h-5 w-full max-w-lg rounded bg-slate-200" />
            <div className="mt-8 flex gap-3">
              <div className="h-11 w-36 rounded-md bg-slate-200" />
              <div className="h-11 w-36 rounded-md bg-slate-200" />
            </div>
          </div>
          <div className="aspect-[4/3] w-full rounded-lg bg-slate-200" />
        </div>
      </section>
    </main>
  );
}

export default function HomePage() {
  const [state, setState] = useState({ loading: true, error: '', sections: [], datasets: {} });

  useEffect(() => {
    Promise.all([
      api.get('/sections/home'),
      api.get('/courses'),
      api.get('/events'),
      api.get('/mentors'),
      api.get('/testimonials'),
      api.get('/faqs')
    ]).then(([sections, courses, events, mentors, testimonials, faqs]) => {
      setState({
        loading: false,
        error: '',
        sections: sections.data,
        datasets: { courses: courses.data, events: events.data, mentors: mentors.data, testimonials: testimonials.data, faqs: faqs.data }
      });
    }).catch((error) => setState((prev) => ({ ...prev, loading: false, error: error.message })));
  }, []);

  if (state.loading) return <HomeSkeleton />;
  if (state.error) return <div className="container-page py-16 text-red-600">{state.error}</div>;

  return (
    <>
      {state.sections.sort((a, b) => a.order - b.order).map((section) => <SectionRenderer key={section._id} section={section} datasets={state.datasets} />)}
    </>
  );
}
