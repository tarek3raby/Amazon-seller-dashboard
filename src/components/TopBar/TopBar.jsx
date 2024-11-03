import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../../Context/authentication';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Menu,
  MenuItem,
  Badge,
  Tooltip,
  Avatar,
  useTheme,
  Divider
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  Settings as SettingsIcon,
  Person as PersonIcon,
  ExitToApp as LogoutIcon,
  Menu as MenuIcon
} from '@mui/icons-material';

const TopBar = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  // const { logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationsAnchor, setNotificationsAnchor] = useState(null);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationsOpen = (event) => {
    setNotificationsAnchor(event.currentTarget);
  };

  const handleNotificationsClose = () => {
    setNotificationsAnchor(null);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: theme.palette.primary.main,
        borderBottom: `1px solid ${theme.palette.divider}`,
        width: '83%'
      }}
    >
      <Toolbar>
        {/* Left side - Title */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton
            sx={{
              display: { sm: 'none' },
              mr: 2,
              color: theme.palette.primary.contrastText
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ color: theme.palette.primary.contrastText }}
          >
            Seller Dashboard
          </Typography>
        </Box>

        {/* Right side - Icons */}
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {/* Notifications */}
          <Tooltip title="Notifications">
            <IconButton
              onClick={handleNotificationsOpen}
              sx={{ color: theme.palette.primary.contrastText }}
            >
              <Badge
                badgeContent={3}
                sx={{
                  '& .MuiBadge-badge': {
                    backgroundColor: theme.palette.secondary.main,
                    color: theme.palette.secondary.contrastText
                  }
                }}
              >
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Tooltip>

          {/* Settings */}
          <Tooltip title="Settings">
            <IconButton sx={{ color: theme.palette.primary.contrastText }}>
              <SettingsIcon />
            </IconButton>
          </Tooltip>

          {/* Profile */}
          <Tooltip title="Account">
            <IconButton
              onClick={handleProfileMenuOpen}
              sx={{
                p: 0.5,
                border: '2px solid transparent',
                '&:hover': {
                  border: `2px solid ${theme.palette.secondary.main}`,
                },
                ml: 1
              }}
            >
              <Avatar
                sx={{
                  bgcolor: theme.palette.secondary.main,
                  color: theme.palette.secondary.contrastText
                }}
              >
                <PersonIcon />
              </Avatar>
            </IconButton>
          </Tooltip>
        </Box>

        {/* Profile Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          onClick={handleMenuClose}
          PaperProps={{
            elevation: 0,
            sx: {
              mt: 1.5,
              backgroundColor: theme.palette.background.paper,
              border: `1px solid ${theme.palette.divider}`,
              '& .MuiMenuItem-root': {
                px: 2,
                py: 1,
                gap: 1.5,
                borderRadius: 0.5,
                '&:hover': {
                  backgroundColor: theme.palette.action.hover
                }
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem onClick={() => navigate('/dashboard/profile')}>
            <PersonIcon fontSize="small" color="primary" />
            <Typography color="text.primary">Profile</Typography>
          </MenuItem>
          <MenuItem onClick={() => navigate('/dashboard/settings')}>
            <SettingsIcon fontSize="small" color="primary" />
            <Typography color="text.primary">Settings</Typography>
          </MenuItem>
          <Divider sx={{ my: 1, borderColor: theme.palette.divider }} />
          <MenuItem
            onClick={handleLogout}
            sx={{
              color: theme.palette.error.main,
              '&:hover': {
                backgroundColor: `${theme.palette.error.main}10`
              }
            }}
          >
            <LogoutIcon fontSize="small" />
            <Typography>Logout</Typography>
          </MenuItem>
        </Menu>

        {/* Notifications Menu */}
        <Menu
          anchorEl={notificationsAnchor}
          open={Boolean(notificationsAnchor)}
          onClose={handleNotificationsClose}
          onClick={handleNotificationsClose}
          PaperProps={{
            elevation: 0,
            sx: {
              mt: 1.5,
              width: 320,
              backgroundColor: theme.palette.background.paper,
              border: `1px solid ${theme.palette.divider}`,
              '& .MuiMenuItem-root': {
                px: 2,
                py: 1,
                borderRadius: 0.5,
                '&:hover': {
                  backgroundColor: theme.palette.action.hover
                }
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <Box sx={{ p: 2 }}>
            <Typography
              variant="h6"
              color="text.primary"
              sx={{ fontWeight: 600 }}
            >
              Notifications
            </Typography>
          </Box>
          <Divider sx={{ borderColor: theme.palette.divider }} />
          <MenuItem>
            <Box>
              <Typography variant="subtitle2" color="text.primary">
                New Order Received
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Order #12345 needs processing
              </Typography>
            </Box>
          </MenuItem>
          <MenuItem>
            <Box>
              <Typography variant="subtitle2" color="text.primary">
                Low Stock Alert
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Product "iPhone 13" is running low
              </Typography>
            </Box>
          </MenuItem>
          <Divider sx={{ borderColor: theme.palette.divider }} />
          <Box sx={{ p: 2 }}>
            <Typography
              variant="body2"
              color="secondary"
              align="center"
              sx={{
                cursor: 'pointer',
                '&:hover': {
                  color: theme.palette.secondary.dark
                }
              }}
            >
              View All Notifications
            </Typography>
          </Box>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
