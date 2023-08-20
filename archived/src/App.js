import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

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
import Permission from './scenes/Permission';
import Trip from './scenes/Trip';

//Others
export const drawerWidth = 250;

const NotFound = () => {
  return <h1>Not Found</h1>;
};

const App = (props) => {
  const loggedInRoutes = [
    { path: "/", element: <Home /> },
    { path: "/agency", element: <Agency logOut={props.logOut} /> },
    { path: "/car-replacement", element: <CarReplacement logOut={props.logOut} /> },
    { path: "/transport-price", element: <TransportPrice logOut={props.logOut} /> },
    { path: "/dp-schedule", element: <DP logOut={props.logOut} /> },
    { path: "/oil-transaction", element: <OilDelivery logOut={props.logOut} /> },
    { path: "/car-information", element: <Car logOut={props.logOut} /> },
    { path: "/driver", element: <Driver logOut={props.logOut} /> },
    { path: "/company", element: <Company logOut={props.logOut} /> },
    { path: "/company-income", element: <CompanyIncome logOut={props.logOut} /> },
    { path: "/company-expense", element: <CompanyExpense logOut={props.logOut} /> },
    { path: "/factory", element: <Factory logOut={props.logOut} /> },
    { path: "/engine-detail", element: <EngineDetail logOut={props.logOut} /> },
    { path: "/engine-replacement", element: <EngineReplacement logOut={props.logOut} /> },
    { path: "/engine-store", element: <EngineStore logOut={props.logOut} /> },
    { path: "/extra-fuel", element: <ExtraFuel logOut={props.logOut} /> },
    { path: "/fuel", element: <Fuel logOut={props.logOut} /> },
    { path: "/farm", element: <Farm logOut={props.logOut} /> },
    { path: "/farm-income", element: <FarmIncome logOut={props.logOut} /> },
    { path: "/farm-expense", element: <FarmExpense logOut={props.logOut} /> },
    { path: "/permission", element: <Permission logOut={props.logOut} /> },
    { path: "/trip", element: <Trip logOut={props.logOut} /> },
    { path: "*", element: <NotFound /> }
  ];

  return (
    <>
      {props.isLoggedIn ? (
        <Routes>
          {loggedInRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Routes>
      ) : (
        <Routes>
          <Route path="/login" element={<Login onLogIn={props.logIn} />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      )}
    </>
  );
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
            <Container maxWidth="100%" sx={{ paddingBottom: '2rem' }}>
              <App isLoggedIn={isLoggedIn} logIn={logIn} logOut={logOut} />
            </Container>
          </Main>
        </Box>
      </Router>
    </ThemeProvider>
  );
};
