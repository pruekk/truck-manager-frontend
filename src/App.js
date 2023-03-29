import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, useRoutes, Navigate } from "react-router-dom";

//Material UI
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";

//Components
import PersistentDrawerLeft from "./components/PersistentDrawer";
// import NavigationBar from "./components/NavigationBar";
// import Footer from "./components/Footer";

//Scenes
import Agency from './scenes/Agency';
import Car from './scenes/Car';
import CarReplacement from './scenes/CarReplacement';
import DP from './scenes/DP';
import Driver from './scenes/Driver';
import Home from './scenes/Home';
import Login from './scenes/Login';
import OilDelivery from './scenes/OilDelivery';
import TransportPrice from './scenes/TransportPrice';

//Others
export const drawerWidth = 250;

const NotFound = () => {
  return <h1>Not Found</h1>;
};

const App = (props) => {
  let routes = useRoutes([
    { path: "/", element: props.isLoggedIn ? <Home /> : <Navigate to='/login' /> },
    { path: "/agency", element: props.isLoggedIn ? <Agency logOut={props.logOut} /> : <Navigate to='/login' /> },
    { path: "/car-replacement", element: props.isLoggedIn ? <CarReplacement logOut={props.logOut} /> : <Navigate to='/login' /> },
    { path: "/transport-price", element: props.isLoggedIn ? <TransportPrice logOut={props.logOut} /> : <Navigate to='/login' /> },
    { path: "/dp-schedule", element: props.isLoggedIn ? <DP logOut={props.logOut} /> : <Navigate to='/login' /> },
    { path: "/oil-transaction", element: props.isLoggedIn ? <OilDelivery logOut={props.logOut} /> : <Navigate to='/login' /> },
    { path: "/car-information", element: props.isLoggedIn ? <Car logOut={props.logOut} /> : <Navigate to='/login' /> },
    { path: "/driver", element: props.isLoggedIn ? <Driver logOut={props.logOut} /> : <Navigate to='/login' /> },
    { path: "/login", element: <Login onLogIn={props.logIn} /> },
    { path: "*", element: <NotFound /> }
  ]);

  return routes;
};

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const theme = createTheme({
  backgroundColor: "#FBFBFB",
  typography: {
    allVariants: {
      //fontFamily: 'TTNormsPro Regular,Sukhumvit Tadmai Regular,sans-serif'
      fontFamily: 'Kanit',
    },
  },
});

export default function AppWrapper() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => localStorage.getItem('isLoggedIn') !== null
  );

  useEffect(() => {
    localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);

  const logIn = () => setIsLoggedIn(true);
  
  const logOut = () => {
    setIsLoggedIn(false);
    localStorage.setItem('isLoggedIn', false);
    localStorage.setItem('userToken', null);
    localStorage.setItem('userObject', null);
  };
  
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Box sx={{ display: 'flex', backgroundColor: '#FBFBFB', height: '100vh' }}>
          <PersistentDrawerLeft logOut={logOut} isLoggedIn={isLoggedIn} />
          <Main
            component="main"
            // sx={{ width: { sm: `calc(100% - ${drawerWidth}px)` } }}
          >
            <Toolbar />
            <Container maxWidth={false}>
              <App isLoggedIn={isLoggedIn} logIn={logIn} logOut={logOut} />
            </Container>
          </Main>
        </Box>
        {/* <Footer /> */}
      </Router>
    </ThemeProvider>
  );
};
