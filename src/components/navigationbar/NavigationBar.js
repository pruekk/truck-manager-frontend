import React from "react";

import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

//List
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import Paper from '@mui/material/Paper';

import { Link } from "react-router-dom";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
// import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

//Constants
import * as NavigationBarConstants from "../../constants/NavigationBarConstants";
import * as MenusConstants from "../../constants/NavigationBarConstants";

import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

import { drawerWidth } from '../../App.js';

const settings = ["Profile", "Account", "Dashboard", "Logout"];

function NavigationBar() {
  const [title, setTitle] = React.useState("Welcome");

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [clickedMain, setClickedMain] = React.useState("");
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event, main) => {
    setClickedMain(main);
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    // <AppBar
    //   position="static"
    //   sx={{ backgroundColor: "#ffffff", color: "#000000" }}
    // >
    //   <Container maxWidth="xl">
    //     <Toolbar disableGutters>
    //       <Avatar src="logo.png" />
    //       <Typography
    //         variant="h5"
    //         noWrap
    //         component="a"
    //         href="/"
    //         sx={{
    //           mr: 5,
    //           display: { xs: "none", md: "flex" },
    //           // fontFamily: 'monospace',
    //           fontWeight: 700,
    //           letterSpacing: ".3rem",
    //           color: "inherit",
    //           textDecoration: "none",
    //         }}
    //       >
    //         TNCP
    //       </Typography>
    //       <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
    //         {NavigationBarConstants.menus.map((menu, index) => (
    //           <Box key={`${menu.main}-${index}`} sx={{ flexGrow: 0, padding: "5px" }}>
    //             <Button
    //               variant="text"
    //               startIcon={menu.icon}
    //               onClick={(event) => {
    //                 handleOpenNavMenu(event, menu.main);
    //               }}
    //               sx={{
    //                 color: "black",
    //                 "&:hover": {
    //                   background: "#f8f8f8",
    //                 },
    //               }}
    //             >
    //               <Typography textAlign="center">{menu.main}</Typography>
    //             </Button>
    //             {/*<IconButton
    //               onClick={handleOpenNavMenu}
    //               sx={{ p: 0, paddingRight: "1rem", borderRadius: "0px" }}
    //             >
    //               {menu.icon}
    //               <Typography
    //                 textAlign="center"
    //                 sx={{ paddingLeft: "0.2rem", paddingRight: "0.2rem" }}
    //               >
    //                 {menu.main}
    //               </Typography>
    //             </IconButton>*/}
    //             <Paper>
    //               <Menu
    //                 sx={{ mt: "45px" }}
    //                 id="menu-appbar"
    //                 anchorEl={anchorElNav}
    //                 anchorOrigin={{
    //                   vertical: "top",
    //                   horizontal: "left",
    //                 }}
    //                 keepMounted
    //                 transformOrigin={{
    //                   vertical: "top",
    //                   horizontal: "left",
    //                 }}
    //                 elevation={1}
    //                 open={Boolean(anchorElNav)}
    //                 onClose={handleCloseNavMenu}
    //               >
    //                 {NavigationBarConstants.menus
    //                   .filter((menu) => menu.main === clickedMain)[0]
    //                   ?.sub?.map((sub, index) =>
    //                     sub.isAvailable ? (
    //                       <Link
    //                         key={`${sub.name}-${index}`}
    //                         to={sub.url}
    //                         style={{ textDecoration: "none", color: "black" }}
    //                       >
    //                         <MenuItem
    //                           disabled={!sub.isAvailable}
    //                           onClick={handleCloseNavMenu}
    //                         >
    //                           <Typography textAlign="center">
    //                             {sub.name}
    //                           </Typography>
    //                         </MenuItem>
    //                       </Link>
    //                     ) : (
    //                         <MenuItem
    //                           key={`${sub.name}-${index}`}
    //                           disabled={!sub.isAvailable}
    //                           onClick={handleCloseNavMenu}
    //                         >
    //                           <Typography textAlign="center">
    //                             {sub.name}
    //                           </Typography>
    //                         </MenuItem>
    //                       )
    //                   )}
    //               </Menu>
    //             </Paper>
    //           </Box>
    //         ))}
    //       </Box>

    //       {/* <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
    //         <IconButton
    //           size="large"
    //           aria-label="account of current user"
    //           aria-controls="menu-appbar"
    //           aria-haspopup="true"
    //           onClick={handleOpenNavMenu}
    //           color="inherit"
    //         >
    //           <MenuIcon />
    //         </IconButton>
    //         <Menu
    //           id="menu-appbar"
    //           anchorEl={anchorElNav}
    //           anchorOrigin={{
    //             vertical: 'bottom',
    //             horizontal: 'left',
    //           }}
    //           keepMounted
    //           transformOrigin={{
    //             vertical: 'top',
    //             horizontal: 'left',
    //           }}
    //           open={Boolean(anchorElNav)}
    //           onClose={handleCloseNavMenu}
    //           sx={{
    //             display: { xs: 'block', md: 'none' },
    //           }}
    //         >
    //           {pages.map((page) => (
    //             <MenuItem key={page} onClick={handleCloseNavMenu}>
    //               <Typography textAlign="center">{page}</Typography>
    //             </MenuItem>
    //           ))}
    //         </Menu>
    //       </Box>
    //       <LocalShippingRoundedIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
    //       <Typography
    //         variant="h5"
    //         noWrap
    //         component="a"
    //         href=""
    //         sx={{
    //           mr: 2,
    //           display: { xs: 'flex', md: 'none' },
    //           flexGrow: 1,
    //           fontFamily: 'monospace',
    //           fontWeight: 700,
    //           letterSpacing: '.3rem',
    //           color: 'inherit',
    //           textDecoration: 'none',
    //         }}
    //       >
    //         TNCP
    //       </Typography> */}

    //       <Box sx={{ flexGrow: 0 }}>
    //         <Tooltip title="Open settings">
    //           <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
    //             <Avatar sx={{ bgcolor: "black" }}>
    //               <PersonRoundedIcon />
    //             </Avatar>
    //           </IconButton>
    //         </Tooltip>
    //         <Menu
    //           sx={{ mt: "45px" }}
    //           id="menu-appbar"
    //           anchorEl={anchorElUser}
    //           anchorOrigin={{
    //             vertical: "top",
    //             horizontal: "right",
    //           }}
    //           keepMounted
    //           transformOrigin={{
    //             vertical: "top",
    //             horizontal: "right",
    //           }}
    //           open={Boolean(anchorElUser)}
    //           onClose={handleCloseUserMenu}
    //         >
    //           {settings.map((setting) => (
    //             <MenuItem key={setting} onClick={handleCloseUserMenu}>
    //               <Typography textAlign="center">{setting}</Typography>
    //             </MenuItem>
    //           ))}
    //         </Menu>
    //       </Box>
    //     </Toolbar>
    //   </Container>
    // </AppBar>
    <>
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
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
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar disableGutters>
          <Avatar src="logo.png" sx={{ ml: 1, mr: 3 }}/>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            TNCP
          </Typography>
        </Toolbar>
        <Divider />
        <List>
          {MenusConstants.menus.map((menu) => (
            <React.Fragment key={menu.main}>
              <ListItem key={menu.main} disablePadding>
                <ListItemButton>
                  <ListItemText primary={menu.main} />
                </ListItemButton>
              </ListItem>
              {menu.sub.map((sub_menu) => (
                <ListItem key={sub_menu.name} sx={{ padding: 0 }}>
                  <Link
                      key={`${sub_menu.name}`}
                      to={sub_menu.url}
                      style={{ textDecoration: "none", color: "black" }}
                      onClick={() => setTitle(`${sub_menu.name}`)}
                  >
                    <ListItemButton 
                      sx={{ paddingTop: 0, paddingBottom: 0 }}
                      disabled={!sub_menu.isAvailable}
                    >
                      <ListItemIcon>
                        {menu.icon}
                      </ListItemIcon>
                      <ListItemText primary={sub_menu.name} />
                    </ListItemButton>
                  </Link>
                </ListItem>
              ))}
            </React.Fragment>
          ))}
        </List>
    </Drawer>
  </>
  );
}

export default NavigationBar;
