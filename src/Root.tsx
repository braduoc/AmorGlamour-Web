import { Outlet } from 'react-router';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ScrollToHash } from './components/ScrollToHash';

export function Root() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
              <ScrollToHash />

        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
