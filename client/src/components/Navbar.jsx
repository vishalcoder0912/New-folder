import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Img from './OptimizedImg.jsx';

export default function Navbar({ settings }) {
  const [open, setOpen] = useState(false);
  const links = [...(settings?.navLinks || [])]
    .filter((link) => link.isVisible !== false)
    .sort((a, b) => a.order - b.order);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-3 font-semibold text-slate-950">
          {settings?.logoUrl ? <Img src={settings.logoUrl} alt={settings.siteName} width="36" height="36" className="h-9 w-9 rounded object-cover" /> : <span className="grid h-9 w-9 place-items-center rounded bg-brand text-white">E</span>}
          <span>{settings?.siteName || 'EduNova'}</span>
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <NavLink key={link._id || link.href} to={link.href} className={({ isActive }) => `text-sm font-medium ${isActive ? 'text-brand' : 'text-slate-700 hover:text-brand'}`}>
              {link.label}
            </NavLink>
          ))}
          <Link to={settings?.ctaLink || '/contact'} className="btn-primary">{settings?.ctaText || 'Book Consultation'}</Link>
        </nav>
        <button type="button" className="rounded-md p-2 md:hidden" onClick={() => setOpen((value) => !value)} aria-label="Toggle navigation menu">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {open && (
        <div className="border-t border-slate-200 bg-white md:hidden">
          <div className="container-page grid gap-1 py-3">
            {links.map((link) => <Link key={link._id || link.href} to={link.href} onClick={() => setOpen(false)} className="rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100">{link.label}</Link>)}
            <Link to={settings?.ctaLink || '/contact'} onClick={() => setOpen(false)} className="btn-primary mt-2">{settings?.ctaText || 'Book Consultation'}</Link>
          </div>
        </div>
      )}
    </header>
  );
}
