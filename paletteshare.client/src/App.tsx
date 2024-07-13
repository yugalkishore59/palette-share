import { Navbar } from "./components/Navigation/Navbar";
import { Gallery } from "./pages/Gallery";
import { Profile } from "./pages/Profile";
import { Discover } from "./pages/Discover";
import { Create } from "./pages/Create";
import classes from "./App.module.scss";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Gallery />}>
      <Route path="create" element={<Create />} />
      <Route path="discover" element={<Discover />} />
      <Route path="profile" element={<Profile />} />
    </Route>
  )
);

function App() {
  return (
    <div className={classes.app}>
      <Navbar />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
