import { Outlet } from 'react-router-dom';
import Sidebar from './../components/Sidebar/Sidebar';
import TopBar from './../components/TopBar/TopBar';

const Layout = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <Sidebar />
      <div className="flex-1 w-full">
        <TopBar />
        <main className="p-4 overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;