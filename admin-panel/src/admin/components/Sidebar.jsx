import { BookOpen, Calendar, FileText, Home, Image, LayoutDashboard, MessageSquare, PanelTop, Settings, Star, Users } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const items = [
  ['Dashboard', '/', LayoutDashboard],
  ['Page Builder', '/page-builder', PanelTop],
  ['Sections', '/sections', Home],
  ['Courses', '/courses', BookOpen],
  ['Events', '/events', Calendar],
  ['Blogs', '/blogs', FileText],
  ['Mentors', '/mentors', Users],
  ['Testimonials', '/testimonials', Star],
  ['FAQs', '/faqs', MessageSquare],
  ['Leads', '/leads', MessageSquare],
  ['Media', '/media', Image],
  ['Settings', '/settings', Settings],
  ['Admin Users', '/users', Users]
];

export default function Sidebar() {
  return (
    <aside className="sticky top-0 z-30 border-r border-slate-200 bg-slate-950 text-white md:h-screen md:w-64">
      <div className="flex h-16 items-center border-b border-slate-800 px-5 text-lg font-semibold">EduNova CMS</div>
      <nav className="grid gap-1 p-3">
        {items.map(([label, href, Icon]) => (
          <NavLink key={href} to={href} end={href === '/'} className={({ isActive }) => `flex items-center gap-3 rounded-md px-3 py-2 text-sm ${isActive ? 'bg-white text-slate-950' : 'text-slate-300 hover:bg-slate-900 hover:text-white'}`}>
            <Icon size={16} />
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
