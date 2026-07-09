import ContentManager from '../components/ContentManager.jsx';

export default function ManageCoursesPage() {
  return (
    <ContentManager
      title="Courses"
      endpoint="/courses"
      emptyItem={{ title: '', slug: '', shortDescription: '', fullDescription: '', category: '', duration: '', level: 'Beginner', price: 0, discountPrice: 0, imageUrl: '', curriculumModules: [], skillsCovered: [], status: 'draft', featured: false, order: 0, isVisible: true }}
      columns={[{ key: 'title', label: 'Title' }, { key: 'category', label: 'Category' }, { key: 'status', label: 'Status', badge: true }, { key: 'featured', label: 'Featured', badge: true }]}
      fields={[
        { key: 'title', label: 'Title' }, { key: 'slug', label: 'Slug' }, { key: 'category', label: 'Category' }, { key: 'duration', label: 'Duration' },
        { key: 'level', label: 'Level', options: [{ label: 'Beginner', value: 'Beginner' }, { label: 'Intermediate', value: 'Intermediate' }, { label: 'Advanced', value: 'Advanced' }] },
        { key: 'price', label: 'Price', type: 'number' }, { key: 'discountPrice', label: 'Discount price', type: 'number' },
        { key: 'shortDescription', label: 'Short description', textarea: true }, { key: 'fullDescription', label: 'Full description', type: 'richtext' },
        { key: 'imageUrl', label: 'Image', type: 'image' }, { key: 'skillsCovered', label: 'Skills, one per line', type: 'array' },
        { key: 'curriculumModules', label: 'Curriculum modules JSON', type: 'json' },
        { key: 'status', label: 'Status', options: [{ label: 'Draft', value: 'draft' }, { label: 'Published', value: 'published' }] },
        { key: 'featured', label: 'Featured', type: 'boolean' }, { key: 'isVisible', label: 'Visible', type: 'boolean' }, { key: 'order', label: 'Order', type: 'number' }
      ]}
    />
  );
}
