import ContentManager from '../components/ContentManager.jsx';

export default function ManageTestimonialsPage() {
  return (
    <ContentManager
      title="Testimonials"
      endpoint="/testimonials"
      emptyItem={{ studentName: '', studentImage: '', courseName: '', rating: 5, reviewText: '', companyName: '', status: 'active', order: 0 }}
      columns={[{ key: 'studentName', label: 'Student' }, { key: 'courseName', label: 'Course' }, { key: 'status', label: 'Status', badge: true }]}
      fields={[
        { key: 'studentName', label: 'Student name' }, { key: 'studentImage', label: 'Student image', type: 'image' }, { key: 'courseName', label: 'Course name' },
        { key: 'rating', label: 'Rating', type: 'number' }, { key: 'reviewText', label: 'Review text', textarea: true }, { key: 'companyName', label: 'Company name' },
        { key: 'status', label: 'Status', options: [{ label: 'Active', value: 'active' }, { label: 'Inactive', value: 'inactive' }] }, { key: 'order', label: 'Order', type: 'number' }
      ]}
    />
  );
}
