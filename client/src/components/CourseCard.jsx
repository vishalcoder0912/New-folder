import { Link } from 'react-router-dom';

export default function CourseCard({ course }) {
  return (
    <article className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
      <img src={course.imageUrl || '/placeholder.svg'} alt={course.title} width="800" height="220" loading="lazy" className="h-48 w-full object-cover" />
      <div className="p-5">
        <div className="flex items-center justify-between gap-3 text-xs font-semibold uppercase tracking-wide text-accent">
          <span>{course.category}</span>
          <span>{course.level}</span>
        </div>
        <h3 className="mt-3 text-lg font-semibold text-slate-950">{course.title}</h3>
        <p className="mt-2 line-clamp-3 text-sm text-slate-600">{course.shortDescription}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-sm text-slate-600">{course.duration}</span>
          <span className="font-semibold text-slate-950">${course.discountPrice || course.price}</span>
        </div>
        <Link to={`/courses/${course.slug}`} className="btn-primary mt-5 w-full">View Course</Link>
      </div>
    </article>
  );
}
