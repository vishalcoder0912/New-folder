import { Link, useParams } from 'react-router-dom';
import ContactForm from '../components/ContactForm.jsx';
import LoadingState from '../components/LoadingState.jsx';
import { useFetch } from '../hooks/useFetch.js';
import Img from '../components/OptimizedImg.jsx';

export default function CourseDetailPage() {
  const { slug } = useParams();
  const { data: course, loading, error } = useFetch(`/courses/${slug}`, [slug]);

  if (loading) return <LoadingState />;
  if (error) return <div className="container-page py-16 text-red-600">{error}</div>;

  return (
    <article>
      <section className="bg-white py-12">
        <div className="container-page grid gap-10 md:grid-cols-[1fr_0.7fr]">
          <div>
            <p className="text-sm font-semibold uppercase text-accent">{course.category}</p>
            <h1 className="mt-2 text-4xl font-bold">{course.title}</h1>
            <p className="mt-4 text-lg text-slate-600">{course.shortDescription}</p>
            <div className="mt-6 flex flex-wrap gap-3 text-sm text-slate-600">
              <span>{course.duration}</span><span>{course.level}</span><span>${course.discountPrice || course.price}</span>
            </div>
            <Link to="/contact" className="btn-primary mt-8">Request Consultation</Link>
          </div>
          <Img src={course.imageUrl} alt={course.title} width="800" height="600" className="aspect-[4/3] rounded-lg object-cover shadow-soft" />
        </div>
      </section>
      <section className="py-12">
        <div className="container-page grid gap-8 md:grid-cols-[1fr_360px]">
          <div className="admin-card">
            <h2 className="text-2xl font-bold">Course overview</h2>
            <div className="prose mt-4 max-w-none" dangerouslySetInnerHTML={{ __html: course.fullDescription }} />
            <h2 className="mt-8 text-2xl font-bold">Curriculum</h2>
            <div className="mt-4 grid gap-3">
              {(course.curriculumModules || []).map((module) => (
                <div key={module._id} className="rounded-md border border-slate-200 p-4">
                  <h3 className="font-semibold">{module.title}</h3>
                  <ul className="mt-2 list-disc pl-5 text-sm text-slate-600">{(module.lessons || []).map((lesson) => <li key={lesson}>{lesson}</li>)}</ul>
                </div>
              ))}
            </div>
            <h2 className="mt-8 text-2xl font-bold">Skills covered</h2>
            <div className="mt-3 flex flex-wrap gap-2">{(course.skillsCovered || []).map((skill) => <span key={skill} className="rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-brand">{skill}</span>)}</div>
          </div>
          <div>
            {course.instructor && (
              <div className="admin-card mb-6">
                <h3 className="font-semibold">Mentor</h3>
                <div className="mt-4 flex gap-3">
                  <Img src={course.instructor.imageUrl} alt={course.instructor.name} width="56" height="56" className="h-14 w-14 rounded-full object-cover" />
                  <div>
                    <p className="font-semibold">{course.instructor.name}</p>
                    <p className="text-sm text-slate-600">{course.instructor.designation}</p>
                  </div>
                </div>
              </div>
            )}
            <ContactForm sourcePage={`/courses/${slug}`} courses={[course]} />
          </div>
        </div>
      </section>
    </article>
  );
}
