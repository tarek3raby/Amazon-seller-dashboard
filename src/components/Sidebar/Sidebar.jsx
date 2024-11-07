import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Box,
  Typography,
  Divider,
  useTheme
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Inventory as InventoryIcon,
  ShoppingCart as OrdersIcon,
  Person as ProfileIcon,
  Store as StoreIcon
} from '@mui/icons-material';

const drawerWidth = 260;

const Sidebar = () => {
  const location = useLocation();
  const theme = useTheme();

  const menuItems = [
    {
      title: 'Dashboard',
      path: '/dashboard/dashboard',
      icon: <DashboardIcon />
    },
    {
      title: 'Products',
      path: '/dashboard/products',
      icon: <InventoryIcon />
    },
    {
      title: 'Orders',
      path: '/dashboard/orders',
      icon: <OrdersIcon />
    },
    {
      title: 'Profile',
      path: '/dashboard/profile',
      icon: <ProfileIcon />
    }
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
          border: 'none',
          height: '100vh',
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: theme.zIndex.drawer,
          boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)',
        },
      }}
    >
      <Box sx={{ 
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        py: 2,
      }}>
        {/* Logo/Brand Section */}
        <Box
          sx={{
            p: 3,
            pb: 4,
            display: 'flex',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <StoreIcon
            sx={{
              fontSize: 40,
              color: theme.palette.secondary.main,
              filter: 'drop-shadow(0 0 2px rgba(255, 255, 255, 0.2))'
            }}
          />
          <Typography variant="h5" fontWeight="bold" color="white">
            Amazon Seller
          </Typography>
        </Box>

        <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.12)', mx: 2 }} />

        {/* Navigation Items */}
        <List sx={{ px: 2, py: 3 }}>
          {menuItems.map((item) => (
            <ListItem
              key={item.path}
              disablePadding
              sx={{ mb: 1.5 }}
            >
              <ListItemButton
                component={Link}
                to={item.path}
                selected={location.pathname === item.path}
                sx={{
                  borderRadius: 2,
                  py: 1.5,
                  transition: 'all 0.2s ease-in-out',
                  '&.Mui-selected': {
                    backgroundColor: theme.palette.secondary.main,
                    color: theme.palette.secondary.contrastText,
                    transform: 'scale(1.02)',
                    '&:hover': {
                      backgroundColor: theme.palette.secondary.light,
                    },
                  },
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    transform: 'scale(1.02)',
                  },
                }}
              >
                <ListItemIcon sx={{ 
                  color: 'inherit',
                  minWidth: 45,
                }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.title}
                  primaryTypographyProps={{
                    fontWeight: location.pathname === item.path ? 'bold' : 'medium',
                    fontSize: '0.95rem'
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.12)', mx: 2, mt: 'auto' }} />

        {/* Footer Section */}
        <Box sx={{ p: 3, textAlign: 'center' }}>
          <Typography
            variant="body2"
            color="rgba(255, 255, 255, 0.7)"
            sx={{ 
              fontSize: '0.8rem',
              opacity: 0.8
            }}
          >
            © 2024 Amazon Seller
          </Typography>
        </Box>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
