import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ROUTES } from "./routes";
import UserContextProvider from "./services/context/UserContext";
import Navbar from "./components/User/Navbar";

const routes = createBrowserRouter(ROUTES);

function App() {
  return (
    <UserContextProvider>
      <RouterProvider router={routes} />
    </UserContextProvider>
  );
}

export default App;
