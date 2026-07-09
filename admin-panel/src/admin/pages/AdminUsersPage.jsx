import ContentManager from '../components/ContentManager.jsx';

export default function AdminUsersPage() {
  return (
    <ContentManager
      title="Admin Users"
      endpoint="/admin-users"
      emptyItem={{ name: '', email: '', password: '', role: 'editor', isActive: true }}
      columns={[{ key: 'name', label: 'Name' }, { key: 'email', label: 'Email' }, { key: 'role', label: 'Role' }, { key: 'isActive', label: 'Active', badge: true }]}
      fields={[
        { key: 'name', label: 'Name' }, { key: 'email', label: 'Email' }, { key: 'password', label: 'Password', type: 'password' },
        { key: 'role', label: 'Role', options: [{ label: 'Super Admin', value: 'superAdmin' }, { label: 'Editor', value: 'editor' }] },
        { key: 'isActive', label: 'Active', type: 'boolean' }
      ]}
      transformBeforeSave={(item) => {
        const payload = { ...item };
        if (!payload.password) delete payload.password;
        return payload;
      }}
    />
  );
}
