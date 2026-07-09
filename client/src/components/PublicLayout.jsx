import { Outlet } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch.js';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';

export default function PublicLayout() {
  const { data } = useFetch('/settings');
  const settings = data || null;

  return (
    <>
      <Navbar settings={settings} />
      <main>
        <Outlet context={{ settings }} />
      </main>
      <Footer settings={settings} />
    </>
  );
}
