import { Link } from 'react-router-dom';

export default function Footer({ settings }) {
  const links = [...(settings?.navLinks || [])].filter((link) => link.isVisible !== false).sort((a, b) => a.order - b.order);

  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-white">
      <div className="container-page grid gap-8 py-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <h2 className="text-xl font-semibold">{settings?.siteName || 'EduNova'}</h2>
          <p className="mt-3 max-w-md text-sm text-slate-300">{settings?.footerText || 'Practical programs for career-ready skills.'}</p>
        </div>
        <div>
          <h3 className="font-semibold">Explore</h3>
          <div className="mt-3 grid gap-2">
            {links.map((link) => <Link key={link._id || link.href} to={link.href} className="text-sm text-slate-300 hover:text-white">{link.label}</Link>)}
          </div>
        </div>
        <div>
          <h3 className="font-semibold">Contact</h3>
          <p className="mt-3 text-sm text-slate-300">{settings?.contactEmail}</p>
          <p className="text-sm text-slate-300">{settings?.contactPhone}</p>
          <p className="text-sm text-slate-300">{settings?.address}</p>
        </div>
      </div>
      <div className="border-t border-slate-800 py-4 text-center text-xs text-slate-400">© {new Date().getFullYear()} {settings?.siteName || 'EduNova'}. All rights reserved.</div>
    </footer>
  );
}
