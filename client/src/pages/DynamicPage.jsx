import LoadingState from '../components/LoadingState.jsx';
import SectionRenderer from '../components/SectionRenderer.jsx';
import { useFetch } from '../hooks/useFetch.js';

export default function DynamicPage({ pageName, title }) {
  const { data, loading, error } = useFetch(`/sections/${pageName}`, [pageName]);

  if (loading) return <LoadingState />;

  return (
    <div>
      <section className="bg-white py-12">
        <div className="container-page">
          <h1 className="text-4xl font-bold">{title}</h1>
        </div>
      </section>
      {error && <div className="container-page py-10 text-red-600">{error}</div>}
      {(data || []).map((section) => <SectionRenderer key={section._id} section={section} />)}
    </div>
  );
}
