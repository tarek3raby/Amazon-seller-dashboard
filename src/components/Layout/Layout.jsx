import { Box } from '@mui/material';
import Sidebar from '../Sidebar/Sidebar';

const Layout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - 280px)` },
          ml: '280px',
          minHeight: '100vh',
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? '#f5f5f5'
              : theme.palette.background.default
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Layout; 