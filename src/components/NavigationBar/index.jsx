import React from "react";
import { Link, useNavigate } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

//List
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { drawerWidth } from '../../App.js';

//Constants
import * as MenusConstants from "../../constants/NavigationBarConstants";

const settings = ["Profile", "Account", "Dashboard", "Logout"];

export default function NavigationBar(props) {
  const navigate = useNavigate();

  const [title, setTitle] = React.useState("Welcome");
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const open = Boolean(anchorElUser);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = (setting) => {
    if (setting === "Logout") {
      props.logOut();
    }

    setAnchorElUser(null);
    return navigate("/login");
  };

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`,
          backgroundColor: "#30C464"
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ marginLeft: "1rem" }}>
            {title}
          </Typography>
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
        variant="permanent"
        anchor="left"
      >
        <Toolbar disableGutters>
          <Avatar src="logo_2.png" sx={{ ml: 1, mr: 3 }} />
          <Link to="/" style={{ textDecoration: 'none', color: 'black' }}>
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
        <Divider />
        <List>
          {MenusConstants.menus.map((menu) => (
            <React.Fragment key={menu.main}>
              <ListItem key={menu.main} sx={{ padding: "16px", paddingTop: "8px", paddingBottom: "8px" }}>
                <ListItemText primary={menu.main} />
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
        </List>
        <Toolbar disableGutters>
          <ListItem disablePadding>
            <ListItemButton onClick={handleOpenUserMenu}>
              <ListItemIcon>
                <PersonRoundedIcon />
              </ListItemIcon>
              <Typography
                variant="50%"
                sx={{
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                {JSON.parse(localStorage.getItem('userObject'))?.name ? JSON.parse(localStorage.getItem('userObject'))?.name : "example@gmail.com"}
              </Typography>
            </ListItemButton>
            <Menu
              sx={{ mt: "0", ml: `${drawerWidth - 15}px` }}
              anchorEl={anchorElUser}
              open={open}
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
      </Drawer>
    </>
  );
}