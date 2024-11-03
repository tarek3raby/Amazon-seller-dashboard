// import { Box } from '@mui/material';
// // import Sidebar from '../Sidebar/Sidebar';
// import Sidebar from './../components/Sidebar/Sidebar';
// import TopBar from '../components/TopBar/TopBar';

// const Layout = ({ children }) => {
//   return (
//     <Box sx={{ display: 'flex' }}>
//       <TopBar/>
//       <Sidebar />
//       <Box
//         component="main"
//         sx={{
//           flexGrow: 1,
//           p: 3,
//           width: { sm: `calc(100% - 280px)` },
//           ml: '280px',
//           minHeight: '100vh',
//           backgroundColor: (theme) =>
//             theme.palette.mode === 'light'
//               ? '#f5f5f5'
//               : theme.palette.background.default
//         }}
//       >
//         {children}
//       </Box>
//     </Box>
//   );
// };

// export default Layout; 

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