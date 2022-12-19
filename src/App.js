import React from "react";
import { BrowserRouter as Router, useRoutes } from "react-router-dom";

//Material UI
import { ThemeProvider, createTheme } from '@mui/material/styles';

//Components
import NavigationBar from "./components/navigationbar/NavigationBar";
import HomePage from "./components/homepage/HomePage";
import Footer from "./components/footer/Footer";
import TransportPricePage from "./components/transportPricePage/TransportPricePage";

//Others

const NotFound = () => {
  return <h1>Not Found</h1>;
};

const App = () => {
  let routes = useRoutes([
    { path: "/", element: <HomePage /> },
    { path: "/transport-price", element: <TransportPricePage /> },
    { path: "*", element: <NotFound /> }
  ]);
  return routes;
};

const theme = createTheme({
  typography: {
    allVariants: {
      //fontFamily: 'TTNormsPro Regular,Sukhumvit Tadmai Regular,sans-serif'
      fontFamily: 'Kanit'
    },
  },
});

const AppWrapper = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <NavigationBar />
        <App />
        <Footer />
      </Router>
    </ThemeProvider>
  );
};

export default AppWrapper;
