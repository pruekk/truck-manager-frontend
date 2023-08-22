import "./styles/global.scss";
import { RouterProvider } from "react-router-dom";
import routes from "./Route";
import { AuthContextProvider } from "./context/AuthContext";

const App = () => {
  return (
    <AuthContextProvider>
      <RouterProvider router={routes} />
    </AuthContextProvider>
  );
}

export default App;
