import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, useRoutes, Navigate } from "react-router-dom";

//Material UI
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";

//Components
import NavigationBar from "./components/NavigationBar";
import Footer from "./components/Footer";

//Scenes
import Agency from './scenes/Agency';
import Car from './scenes/Car';
import CarReplacement from './scenes/CarReplacement';
import DP from './scenes/DP';
import Driver from './scenes/Driver';
import Home from './scenes/Home';
import Login from './scenes/Login';
import OilDelivery from './scenes/OilDelivery';
import Transport from './scenes/Transport';

//Others
export const drawerWidth = 250;

const NotFound = () => {
  return <h1>Not Found</h1>;
};

const App = (props) => {
  let routes = useRoutes([
    { path: "/", element: props.isLoggedIn ? <Home /> : <Navigate to='/login' /> },
    { path: "/agency", element: props.isLoggedIn ? <Agency /> : <Navigate to='/login' /> },
    { path: "/car-replacement", element: props.isLoggedIn ? <CarReplacement /> : <Navigate to='/login' /> },
    { path: "/transport-price", element: props.isLoggedIn ? <Transport /> : <Navigate to='/login' /> },
    { path: "/dp-schedule", element: props.isLoggedIn ? <DP /> : <Navigate to='/login' /> },
    { path: "/oil-transaction", element: props.isLoggedIn ? <OilDelivery /> : <Navigate to='/login' /> },
    { path: "/car-information", element: props.isLoggedIn ? <Car /> : <Navigate to='/login' /> },
    { path: "/driver", element: props.isLoggedIn ? <Driver /> : <Navigate to='/login' /> },
    { path: "/login", element: <Login onLogIn={props.logIn} /> },
    { path: "*", element: <NotFound /> }
  ]);

  return routes;
};

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

  // pass this callback to components you want to allow logging out
  // it will update the local state and then get persisted
  const logOut = () => {
    setIsLoggedIn(false);
    localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
    localStorage.setItem('userToken', null);
    localStorage.setItem('userObject', null);
  };

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Box sx={{ display: 'flex', backgroundColor: '#FBFBFB', height: '100vh' }}>
          <NavigationBar logOut={logOut} isLoggedIn={isLoggedIn} />
          <Box
            component="main"
            sx={{ width: { sm: `calc(100% - ${drawerWidth}px)` } }}
          >
            <Toolbar />
            <App isLoggedIn={isLoggedIn} logIn={logIn} />
          </Box>
        </Box>
        <Footer />
      </Router>
    </ThemeProvider>
  );
};
