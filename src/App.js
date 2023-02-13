import React from "react";
import { BrowserRouter as Router, useRoutes } from "react-router-dom";

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
import OilDelivery from './scenes/OilDelivery';
import Transport from './scenes/Transport';

//Others
export const drawerWidth = 250;

const NotFound = () => {
  return <h1>Not Found</h1>;
};

const App = () => {
  let routes = useRoutes([
    { path: "/", element: <Home /> },
    { path: "/agency", element: <Agency /> },
    { path: "/car-replacement", element: <CarReplacement /> },
    { path: "/transport-price", element: <Transport /> },
    { path: "/dp-schedule", element: <DP /> },
    { path: "/oil-transaction", element: <OilDelivery /> },
    { path: "/car-information", element: <Car /> },
    { path: "/driver", element: <Driver /> },
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
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Box sx={{ display: 'flex', backgroundColor: '#FBFBFB', height: '100vh' }}>
          <NavigationBar />
          <Box
            component="main"
            sx={{ width: { sm: `calc(100% - ${drawerWidth}px)` } }}
          >
            <Toolbar />
            <App />
          </Box>
        </Box>
        <Footer />
      </Router>
    </ThemeProvider>
  );
};
