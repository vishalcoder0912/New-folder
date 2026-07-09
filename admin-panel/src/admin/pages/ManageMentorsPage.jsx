import ContentManager from '../components/ContentManager.jsx';

export default function ManageMentorsPage() {
  return (
    <ContentManager
      title="Mentors"
      endpoint="/mentors"
      emptyItem={{ name: '', designation: '', imageUrl: '', bio: '', experience: '', skills: [], linkedInUrl: '', isActive: true, order: 0 }}
      columns={[{ key: 'name', label: 'Name' }, { key: 'designation', label: 'Designation' }, { key: 'isActive', label: 'Active', badge: true }]}
      fields={[
        { key: 'name', label: 'Name' }, { key: 'designation', label: 'Designation' }, { key: 'imageUrl', label: 'Image', type: 'image' },
        { key: 'bio', label: 'Bio', textarea: true }, { key: 'experience', label: 'Experience' }, { key: 'skills', label: 'Skills, one per line', type: 'array' },
        { key: 'linkedInUrl', label: 'LinkedIn URL' }, { key: 'isActive', label: 'Active', type: 'boolean' }, { key: 'order', label: 'Order', type: 'number' }
      ]}
    />
  );
}
