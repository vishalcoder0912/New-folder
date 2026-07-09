import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ContactForm from './ContactForm.jsx';
import CourseCard from './CourseCard.jsx';
import EmptyState from './EmptyState.jsx';
import Img from './OptimizedImg.jsx';

const fade = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.35 }
};

const SectionShell = ({ section, children, className = '' }) => (
  <motion.section {...fade} className={`py-16 ${className}`} style={{ backgroundColor: section.backgroundColor || undefined, color: section.textColor || undefined }}>
    <div className="container-page">{children}</div>
  </motion.section>
);

const Heading = ({ section }) => (
  <div className="mb-8 max-w-3xl">
    <p className="text-sm font-semibold uppercase tracking-wide text-accent">{section.subtitle}</p>
    <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">{section.title}</h2>
    {section.description && <p className="mt-4 text-slate-600">{section.description}</p>}
  </div>
);

export default function SectionRenderer({ section, datasets = {} }) {
  if (!section?.isVisible) return null;

  if (section.sectionType === 'hero') {
    return (
      <section className="bg-white">
        <div className="container-page grid min-h-[calc(100vh-4rem)] items-center gap-10 py-12 md:grid-cols-[1fr_0.85fr]">
          <motion.div {...fade}>
            <div className="mb-6 flex flex-wrap gap-2">
              {(section.cards || []).map((card) => <span key={card._id || card.title} className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-brand">{card.title}</span>)}
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-slate-950 md:text-6xl">{section.title}</h1>
            {section.subtitle && <p className="mt-5 text-xl text-slate-700">{section.subtitle}</p>}
            {section.description && <p className="mt-4 max-w-2xl text-slate-600">{section.description}</p>}
            <div className="mt-8 flex flex-wrap gap-3">
              {section.buttonText && <Link to={section.buttonLink || '/courses'} className="btn-primary">{section.buttonText}</Link>}
              <Link to="/contact" className="btn-secondary">Talk to Advisor</Link>
            </div>
          </motion.div>
          <motion.div {...fade} className="relative">
            <Img src={section.imageUrl} alt={section.title} width="800" height="600" fetchPriority="high" className="aspect-[4/3] w-full rounded-lg object-cover shadow-soft" />
            <div className="absolute -bottom-5 left-5 right-5 grid grid-cols-3 gap-2 rounded-lg border border-slate-200 bg-white p-3 shadow-soft">
              {(section.cards || []).slice(0, 3).map((card) => (
                <div key={card._id || card.title}>
                  <p className="text-sm font-semibold">{card.title}</p>
                  <p className="text-xs text-slate-500">{card.description}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  if (section.sectionType === 'textImage') {
    return (
      <SectionShell section={section} className="bg-white">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <Heading section={section} />
            {section.buttonText && <Link to={section.buttonLink || '#'} className="btn-primary">{section.buttonText}</Link>}
          </div>
          {section.imageUrl && <Img src={section.imageUrl} alt={section.title} width="800" height="600" className="aspect-[4/3] w-full rounded-lg object-cover shadow-soft" />}
        </div>
      </SectionShell>
    );
  }

  if (section.sectionType === 'courseGrid') {
    const courses = (datasets.courses || []).slice(0, 6);
    return (
      <SectionShell section={section}>
        <Heading section={section} />
        {courses.length ? <div className="grid gap-6 md:grid-cols-3">{courses.map((course) => <CourseCard key={course._id} course={course} />)}</div> : <EmptyState />}
      </SectionShell>
    );
  }

  if (section.sectionType === 'featureCards' || section.sectionType === 'statistics') {
    return (
      <SectionShell section={section} className="bg-white">
        <Heading section={section} />
        <div className={`grid gap-4 ${section.sectionType === 'statistics' ? 'md:grid-cols-3' : 'md:grid-cols-3'}`}>
          {(section.cards || []).map((card) => (
            <div key={card._id || card.title} className="rounded-lg border border-slate-200 bg-slate-50 p-6">
              <h3 className={section.sectionType === 'statistics' ? 'text-3xl font-bold text-brand' : 'text-lg font-semibold'}>{card.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{card.description}</p>
            </div>
          ))}
        </div>
      </SectionShell>
    );
  }

  if (section.sectionType === 'mentorGrid') {
    const mentors = (datasets.mentors || []).slice(0, 4);
    return (
      <SectionShell section={section}>
        <Heading section={section} />
        <div className="grid gap-6 md:grid-cols-4">
          {mentors.map((mentor) => (
            <article key={mentor._id} className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
              <Img src={mentor.imageUrl} alt={mentor.name} width="400" height="400" className="aspect-square w-full rounded-md object-cover" />
              <h3 className="mt-4 font-semibold">{mentor.name}</h3>
              <p className="text-sm text-accent">{mentor.designation}</p>
              <p className="mt-2 text-sm text-slate-600">{mentor.experience}</p>
            </article>
          ))}
        </div>
      </SectionShell>
    );
  }

  if (section.sectionType === 'eventGrid') {
    const events = (datasets.events || []).slice(0, 3);
    return (
      <SectionShell section={section} className="bg-white">
        <Heading section={section} />
        <div className="grid gap-6 md:grid-cols-3">
          {events.map((event) => (
            <article key={event._id} className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
              <Img src={event.imageUrl} alt={event.title} width="800" height="200" className="h-44 w-full object-cover" />
              <div className="p-5">
                <p className="text-sm font-semibold text-accent">{new Date(event.date).toLocaleDateString()} · {event.time}</p>
                <h3 className="mt-2 text-lg font-semibold">{event.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{event.location || event.onlineLink}</p>
                <Link to={`/events/${event.slug}`} className="mt-4 inline-flex text-sm font-semibold text-brand">View event</Link>
              </div>
            </article>
          ))}
        </div>
      </SectionShell>
    );
  }

  if (section.sectionType === 'testimonials') {
    return (
      <SectionShell section={section}>
        <Heading section={section} />
        <div className="grid gap-5 md:grid-cols-3">
          {(datasets.testimonials || []).slice(0, 6).map((item) => (
            <article key={item._id} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <Img src={item.studentImage} alt={item.studentName} width="48" height="48" className="h-12 w-12 rounded-full object-cover" />
                <div>
                  <h3 className="font-semibold">{item.studentName}</h3>
                  <p className="text-sm text-slate-500">{item.courseName}</p>
                </div>
              </div>
              <p className="mt-4 text-sm text-slate-700">"{item.reviewText}"</p>
              <p className="mt-3 text-sm font-semibold text-warm">{'★'.repeat(item.rating)}</p>
            </article>
          ))}
        </div>
      </SectionShell>
    );
  }

  if (section.sectionType === 'faq') {
    return (
      <SectionShell section={section} className="bg-white">
        <Heading section={section} />
        <div className="grid gap-3">
          {(datasets.faqs || []).map((faq) => (
            <details key={faq._id} className="rounded-lg border border-slate-200 bg-white p-5">
              <summary className="cursor-pointer font-semibold">{faq.question}</summary>
              <p className="mt-3 text-sm text-slate-600">{faq.answer}</p>
            </details>
          ))}
        </div>
      </SectionShell>
    );
  }

  if (section.sectionType === 'cta') {
    return (
      <SectionShell section={section} className="bg-brand">
        <div className="grid items-center gap-6 text-white md:grid-cols-[1fr_auto]">
          <div>
            <h2 className="text-3xl font-bold">{section.title}</h2>
            {section.subtitle && <p className="mt-3 text-blue-50">{section.subtitle}</p>}
          </div>
          <Link to={section.buttonLink || '/contact'} className="inline-flex items-center justify-center rounded-md bg-white px-5 py-3 text-sm font-semibold text-brand">{section.buttonText || 'Get Started'}</Link>
        </div>
      </SectionShell>
    );
  }

  if (section.sectionType === 'customContent') {
    return (
      <SectionShell section={section} className="bg-white">
        <Heading section={section} />
        <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: section.description || '' }} />
      </SectionShell>
    );
  }

  return (
    <SectionShell section={section}>
      <Heading section={section} />
      <ContactForm sourcePage={section.pageName} courses={datasets.courses || []} />
    </SectionShell>
  );
}
