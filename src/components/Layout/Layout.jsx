import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Header, Link } from 'components';

export const Layout = () => {
  return (
    <>
      <Header>
        <nav>
          <Link to="/" end>
            Home
          </Link>
          <Link to="/movies">Movies</Link>
        </nav>
      </Header>
      <Suspense fallback={null}>
        <Outlet />
      </Suspense>
    </>
  );
};
