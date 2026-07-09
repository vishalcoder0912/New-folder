import ContentManager from '../components/ContentManager.jsx';

export default function ManageBlogsPage() {
  return (
    <ContentManager
      title="Blogs"
      endpoint="/blogs"
      emptyItem={{ title: '', slug: '', featuredImage: '', category: '', author: '', shortExcerpt: '', fullContent: '', seoTitle: '', seoDescription: '', status: 'draft', isVisible: true }}
      columns={[{ key: 'title', label: 'Title' }, { key: 'category', label: 'Category' }, { key: 'status', label: 'Status', badge: true }]}
      fields={[
        { key: 'title', label: 'Title' }, { key: 'slug', label: 'Slug' }, { key: 'category', label: 'Category' }, { key: 'author', label: 'Author' },
        { key: 'shortExcerpt', label: 'Short excerpt', textarea: true }, { key: 'fullContent', label: 'Full content', type: 'richtext' },
        { key: 'featuredImage', label: 'Featured image', type: 'image' }, { key: 'seoTitle', label: 'SEO title' }, { key: 'seoDescription', label: 'SEO description', textarea: true },
        { key: 'status', label: 'Status', options: [{ label: 'Draft', value: 'draft' }, { label: 'Published', value: 'published' }] }, { key: 'isVisible', label: 'Visible', type: 'boolean' }
      ]}
    />
  );
}
