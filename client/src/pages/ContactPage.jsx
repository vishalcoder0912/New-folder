import ContactForm from '../components/ContactForm.jsx';
import LoadingState from '../components/LoadingState.jsx';
import { useFetch } from '../hooks/useFetch.js';

export default function ContactPage() {
  const { data: courses, loading } = useFetch('/courses');
  const { data: settings } = useFetch('/settings');
  if (loading) return <LoadingState />;

  return (
    <section className="py-14">
      <div className="container-page grid gap-10 md:grid-cols-[0.8fr_1fr]">
        <div>
          <h1 className="text-4xl font-bold">Contact</h1>
          <p className="mt-4 text-slate-600">Tell us what you want to learn. An advisor will help you choose the right path.</p>
          <div className="mt-8 rounded-lg bg-white p-6 shadow-sm">
            <p className="font-semibold">{settings?.contactEmail}</p>
            <p className="mt-1 text-slate-600">{settings?.contactPhone}</p>
            <p className="mt-1 text-slate-600">{settings?.address}</p>
          </div>
        </div>
        <ContactForm sourcePage="/contact" courses={courses || []} />
      </div>
    </section>
  );
}
