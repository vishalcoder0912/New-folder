import CourseCard from '../components/CourseCard.jsx';
import LoadingState from '../components/LoadingState.jsx';
import EmptyState from '../components/EmptyState.jsx';
import { useFetch } from '../hooks/useFetch.js';

export default function CoursesPage() {
  const { data, loading, error } = useFetch('/courses');
  if (loading) return <LoadingState />;

  return (
    <section className="py-14">
      <div className="container-page">
        <h1 className="text-4xl font-bold">Courses</h1>
        <p className="mt-3 max-w-2xl text-slate-600">Browse published programs managed from the admin panel.</p>
        {error && <p className="mt-6 text-red-600">{error}</p>}
        {data?.length ? <div className="mt-8 grid gap-6 md:grid-cols-3">{data.map((course) => <CourseCard key={course._id} course={course} />)}</div> : <div className="mt-8"><EmptyState /></div>}
      </div>
    </section>
  );
}
