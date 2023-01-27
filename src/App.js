import React from "react";
import { BrowserRouter as Router, useRoutes } from "react-router-dom";

//Material UI
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";

//Components
import NavigationBar from "./components/navigationbar/NavigationBar";
import AgencyPage from "./components/agency/AgencyPage";
import HomePage from "./components/homepage/HomePage";
import Footer from "./components/footer/Footer";
import TransportPricePage from "./components/transportPricePage/TransportPricePage";
import DPSchedulePage from "./components/dp/DPSchedulePage";
import DriverPage from "./components/driver/DriverPage";

//Others
export const drawerWidth = 250;

const NotFound = () => {
  return <h1>Not Found</h1>;
};

const App = () => {
  let routes = useRoutes([
    { path: "/", element: <HomePage /> },
    { path: "/agency", element: <AgencyPage /> },
    { path: "/transport-price", element: <TransportPricePage /> },
    { path: "/dp-schedule", element: <DPSchedulePage /> },
    { path: "/driver", element: <DriverPage /> },
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

const AppWrapper = () => {
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

export default AppWrapper;
