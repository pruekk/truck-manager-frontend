import * as React from 'react';
import { Link, useNavigate } from "react-router-dom";

import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import * as MenusConstants from "../../constants/NavigationBarConstants";
import { drawerWidth } from '../../App.js';
const settings = ["Profile", "Account", "Dashboard", "Logout"];

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function PersistentDrawerLeft(props) {
  const navigate = useNavigate();
  const theme = useTheme();

  const [title, setTitle] = React.useState("Dashboard");
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const anchorElUserOpen = Boolean(anchorElUser);
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = (setting) => {
    if (setting === "Logout") {
      props.logOut();
      navigate("/login");
    }
    setAnchorElUser(null);
    return;
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} sx={{ backgroundColor: "#30C464" }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(!props.isLoggedIn && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ width: '300px' }}>
            {title}
          </Typography>
          <ListItem disablePadding sx={{ ...(!props.isLoggedIn && { display: 'none' }) }}>
            <ListItemButton 
              sx={{ justifyContent: 'flex-end' }} 
              onClick={handleOpenUserMenu}
            >
              <ListItemIcon>
                <Avatar alt="Profile Image" src={JSON.parse(localStorage.getItem('userObject'))?.picture} />
              </ListItemIcon>
              <Typography
                variant="50%"
                sx={{
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                {JSON.parse(localStorage.getItem('userObject'))?.name}
              </Typography>
            </ListItemButton>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
              }}
              transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
              }}
              open={anchorElUserOpen}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={() => { handleCloseUserMenu(setting); }}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </ListItem>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
          '*::-webkit-scrollbar': {
            width: '0.75rem'
          },
          '*::-webkit-scrollbar-track': {
            background: "#FFFFFF"
          },
          '*::-webkit-scrollbar-thumb': {
            backgroundColor: "#F5F5F5",
          }
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <Toolbar>
            <Avatar src="logo_2.png" sx={{ ml: 1, mr: 3 }} />
            <Link 
              to="/" 
              style={{ textDecoration: 'none', color: 'black' }}
              onClick={() => setTitle('Dashboard')}
            >
              <Typography
                variant="h5"
                noWrap
                component="a"
                sx={{
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                TNCP
              </Typography>
            </Link>
          </Toolbar>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
            {MenusConstants.menus.map((menu) => (
              <React.Fragment key={menu.main}>
                <ListItem key={menu.main} sx={{ padding: "16px", paddingTop: "8px", paddingBottom: "8px" }}>
                  <Typography
                    sx={{
                      fontWeight: 600,
                    }}
                  >
                    {menu.main}
                  </Typography>
                </ListItem>
                {menu.sub.map((sub_menu) => (
                  <ListItem key={sub_menu.name} sx={{ padding: 0 }}>
                    <ListItemButton
                      sx={{ paddingTop: 0, paddingBottom: 0 }}
                      disabled={!sub_menu.isAvailable}
                      onClick={() => setTitle(`${sub_menu.name}`)}
                      component={Link}
                      to={!sub_menu.isAvailable ? '#' : sub_menu.url}
                    >
                      <ListItemIcon>
                        {sub_menu.icon}
                      </ListItemIcon>
                      <ListItemText primary={sub_menu.name} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </React.Fragment>
            ))}
            <Divider sx={{ paddingTop: '1rem' }} />
            <Toolbar disableGutters>
              <ListItem disablePadding>
                <ListItemButton disabled onClick={handleOpenUserMenu}>
                  <Typography variant="body1">
                    {new Date().getFullYear()} © บริษัท ธ.นุชาพร จำกัด
                  </Typography>
                </ListItemButton>
              </ListItem>
            </Toolbar>
          </List>
        <Divider />
      </Drawer>
      {/* <Main open={open}>
        <DrawerHeader />
      </Main> */}
    </Box>
  );
}
