import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, useRoutes, Navigate } from "react-router-dom";

//Material UI
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";

//Components
import NavigationBar from "./components/NavigationBar";
// import Footer from "./components/Footer";

//Scenes
import Agency from './scenes/Agency';
import Car from './scenes/Car';
import CarReplacement from './scenes/CarReplacement';
import Company from './scenes/Company';
import CompanyIncome from './scenes/CompanyIncome';
import CompanyExpense from './scenes/CompanyExpense';
import DP from './scenes/DP';
import Driver from './scenes/Driver';
import EngineDetail from './scenes/EngineDetail';
import EngineReplacement from './scenes/EngineReplacement';
import EngineStore from './scenes/EngineStore';
import ExtraFuel from './scenes/ExtraFuel';
import Fuel from './scenes/Fuel';
import Factory from './scenes/Factory';
import Farm from './scenes/Farm';
import FarmIncome from './scenes/FarmIncome';
import FarmExpense from './scenes/FarmExpense';
import Home from './scenes/Home';
import Login from './scenes/Login';
import OilDelivery from './scenes/OilDelivery';
import TransportPrice from './scenes/TransportPrice';
import Trip from './scenes/Trip';

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

    { path: "/company", element: props.isLoggedIn ? <Company logOut={props.logOut} /> : <Navigate to='/login' /> },
    { path: "/company-income", element: props.isLoggedIn ? <CompanyIncome logOut={props.logOut} /> : <Navigate to='/login' /> },
    { path: "/company-expense", element: props.isLoggedIn ? <CompanyExpense logOut={props.logOut} /> : <Navigate to='/login' /> },
    { path: "/factory", element: props.isLoggedIn ? <Factory logOut={props.logOut} /> : <Navigate to='/login' /> },
    { path: "/engine-detail", element: props.isLoggedIn ? <EngineDetail logOut={props.logOut} /> : <Navigate to='/login' /> },
    { path: "/engine-replacement", element: props.isLoggedIn ? <EngineReplacement logOut={props.logOut} /> : <Navigate to='/login' /> },
    { path: "/engine-store", element: props.isLoggedIn ? <EngineStore logOut={props.logOut} /> : <Navigate to='/login' /> },
    { path: "/extra-fuel", element: props.isLoggedIn ? <ExtraFuel logOut={props.logOut} /> : <Navigate to='/login' /> },
    { path: "/fuel", element: props.isLoggedIn ? <Fuel logOut={props.logOut} /> : <Navigate to='/login' /> },
    { path: "/farm", element: props.isLoggedIn ? <Farm logOut={props.logOut} /> : <Navigate to='/login' /> },
    { path: "/farm-income", element: props.isLoggedIn ? <FarmIncome logOut={props.logOut} /> : <Navigate to='/login' /> },
    { path: "/farm-expense", element: props.isLoggedIn ? <FarmExpense logOut={props.logOut} /> : <Navigate to='/login' /> },
    { path: "/trip", element: props.isLoggedIn ? <Trip logOut={props.logOut} /> : <Navigate to='/login' /> },
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
          <NavigationBar logOut={logOut} isLoggedIn={isLoggedIn} />
          <Main
            component="main"
            // sx={{ width: { sm: `calc(100% - ${drawerWidth}px)` } }}
          >
            <Toolbar />
            <Container maxWidth={false} sx={{ paddingBottom: '2rem' }}>
              <App isLoggedIn={isLoggedIn} logIn={logIn} logOut={logOut} />
            </Container>
          </Main>
        </Box>
      </Router>
    </ThemeProvider>
  );
};
