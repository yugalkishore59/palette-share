import { Navbar } from "./components/Navigation/Navbar";
import { Gallery } from "./pages/Gallery";
import { Profile } from "./pages/Profile";
import { Discover } from "./pages/Discover";
import { Create } from "./pages/Create";
import classes from "./App.module.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className={classes.app}>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<Gallery />} />
          <Route path="create" element={<Create />} />
          <Route path="discover" element={<Discover />} />
          <Route path="profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
