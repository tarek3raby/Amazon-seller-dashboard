

import { Outlet } from 'react-router-dom';
import Sidebar from './../components/Sidebar/Sidebar';
import TopBar from './../components/TopBar/TopBar';

const Layout = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <TopBar />
        <main className="p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;