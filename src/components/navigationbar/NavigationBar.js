import React from "react";

import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

//List
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import LocalShippingRoundedIcon from '@mui/icons-material/LocalShippingRounded';
import BusinessRoundedIcon from '@mui/icons-material/BusinessRounded';
import BadgeRoundedIcon from '@mui/icons-material/BadgeRounded';
import ParkRoundedIcon from '@mui/icons-material/ParkRounded';
import PercentRoundedIcon from '@mui/icons-material/PercentRounded';
import ContentPasteSearchRoundedIcon from '@mui/icons-material/ContentPasteSearchRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
// import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const menus = [
  {
    main: "รถโม่",
    sub: [
      "ค่าขนส่ง",
      "รายการเดินรถ"
    ],
    icon: <LocalShippingRoundedIcon />
  },
  {
    main: "บริษัท",
    sub: [
      "รายได้",
      "รายจ่าย"
    ],
    icon: <BusinessRoundedIcon />
  },
  {
    main: "พนักงาน",
    sub: [
      "คนขับรถโม่",
      "เสมียร"
    ],
    icon: <BadgeRoundedIcon />
  },
  {
    main: "สวนปาล์ม",
    sub: [
      "รายได้",
      "รายจ่าย"
    ],
    icon: <ParkRoundedIcon />
  },
  {
    main: "ภาษี",
    sub: [
      "ประกันสังคม",
      "ภงด1"
    ],
    icon: <PercentRoundedIcon />
  },
  {
    main: "รายงานผล",
    sub: [
      "เหมาน้ำมัน",
      "ค่าขนส่งรายเดือน"
    ],
    icon: <ContentPasteSearchRoundedIcon />
  },
  {
    main: "ตั้งค่า",
    sub: [
      "ข้อมูลบริษัท",
      "ข้อมูลสิทธิการเข้าดู"
    ],
    icon: <SettingsRoundedIcon />
  },
]

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function NavigationBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const handleOpenNavMenu = (event) => {
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
    <AppBar
      position="static"
      sx={{ backgroundColor: "#ffffff", color: "#000000" }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Avatar src="logo.png" />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 5,
              display: { xs: 'none', md: 'flex' },
              // fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            TNCP
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {menus.map((menu) => (
              <Box sx={{ flexGrow: 0 }}>
                <IconButton onClick={handleOpenNavMenu} sx={{ p: 0, paddingRight: "1rem" }}>
                  {menu.icon}
                  <Typography textAlign="center" sx={{ paddingLeft: '0.2rem', paddingRight: '0.2rem' }}>{menu.main}</Typography>
                  {/* <KeyboardArrowDownIcon /> */}
                </IconButton>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                >
                  {menu.sub.map((sub) => (
                    <MenuItem key={sub} onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">{sub}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            ))}
          </Box>

          {/* <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <LocalShippingRoundedIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            TNCP
          </Typography> */}

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar
                sx={{ bgcolor: "black" }}
              >
                <PersonRoundedIcon />
              </Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavigationBar;
