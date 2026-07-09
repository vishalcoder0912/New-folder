import ContentManager from '../components/ContentManager.jsx';

export default function ManageEventsPage() {
  return (
    <ContentManager
      title="Events"
      endpoint="/events"
      emptyItem={{ title: '', slug: '', description: '', date: '', time: '', location: '', onlineLink: '', imageUrl: '', registrationLink: '', status: 'draft', featured: false, isVisible: true }}
      columns={[{ key: 'title', label: 'Title' }, { key: 'date', label: 'Date', render: (row) => row.date ? new Date(row.date).toLocaleDateString() : '' }, { key: 'status', label: 'Status', badge: true }]}
      fields={[
        { key: 'title', label: 'Title' }, { key: 'slug', label: 'Slug' }, { key: 'description', label: 'Description', textarea: true },
        { key: 'date', label: 'Date', type: 'date' }, { key: 'time', label: 'Time' }, { key: 'location', label: 'Location' }, { key: 'onlineLink', label: 'Online link' },
        { key: 'imageUrl', label: 'Image', type: 'image' }, { key: 'registrationLink', label: 'Registration link' },
        { key: 'status', label: 'Status', options: [{ label: 'Draft', value: 'draft' }, { label: 'Upcoming', value: 'upcoming' }, { label: 'Completed', value: 'completed' }] },
        { key: 'featured', label: 'Featured', type: 'boolean' }, { key: 'isVisible', label: 'Visible', type: 'boolean' }
      ]}
      transformBeforeSave={(item) => ({ ...item, date: item.date || new Date() })}
    />
  );
}
