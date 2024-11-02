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
  Settings as SettingsIcon,
  Person as ProfileIcon,
  Store as StoreIcon
} from '@mui/icons-material';

const drawerWidth = '17%';

const Sidebar = () => {
  const location = useLocation();
  const theme = useTheme();

  const menuItems = [
    {
      title: 'Dashboard',
      path: '/dashboard',
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
      title: 'Store Settings',
      path: '/dashboard/store-settings',
      icon: <StoreIcon />
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
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
        },
      }}
    >
      <Box sx={{ overflow: 'auto' }}>
        {/* Logo/Brand Section */}
        <Box
          sx={{
            p: 3,
            display: 'flex',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <StoreIcon
            sx={{
              fontSize: 32,
              color: theme.palette.secondary.main
            }}
          />
          <Typography variant="h6" fontWeight="bold" color="white">
            Amazon Seller
          </Typography>
        </Box>

        <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.12)' }} />

        {/* Navigation Items */}
        <List sx={{ px: 2 }}>
          {menuItems.map((item) => (
            <ListItem
              key={item.path}
              disablePadding
              sx={{ mb: 1 }}
            >
              <ListItemButton
                component={Link}
                to={item.path}
                selected={location.pathname === item.path}
                sx={{
                  borderRadius: 1,
                  '&.Mui-selected': {
                    backgroundColor: theme.palette.secondary.main,
                    color: theme.palette.secondary.contrastText,
                    '&:hover': {
                      backgroundColor: theme.palette.secondary.light,
                    },
                  },
                }}
              >
                <ListItemIcon>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.title}
                  primaryTypographyProps={{
                    fontWeight: location.pathname === item.path ? 'bold' : 'normal'
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.12)', mt: 2 }} />

        {/* Footer Section */}
        <Box sx={{ p: 2, mt: 'auto' }}>
          <Typography
            variant="body2"
            color="rgba(255, 255, 255, 0.7)"
            align="center"
          >
            © 2024 Amazon Seller
          </Typography>
        </Box>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
