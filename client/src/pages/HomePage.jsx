import LoadingState from '../components/LoadingState.jsx';
import SectionRenderer from '../components/SectionRenderer.jsx';
import { api } from '../services/api.js';
import { useEffect, useState } from 'react';

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

  if (state.loading) return <LoadingState />;
  if (state.error) return <div className="container-page py-16 text-red-600">{state.error}</div>;

  return (
    <>
      {state.sections.sort((a, b) => a.order - b.order).map((section) => <SectionRenderer key={section._id} section={section} datasets={state.datasets} />)}
    </>
  );
}
