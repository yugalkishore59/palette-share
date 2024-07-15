import { Navbar } from "./components/Navigation/Navbar";
import { Gallery } from "./pages/Gallery";
import { Profile } from "./pages/Profile";
import { Discover } from "./pages/Discover";
import { Create } from "./pages/Create/Create";
import classes from "./App.module.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Container, ScrollArea } from "@mantine/core";

function App() {
  return (
    <div className={classes.app}>
      <BrowserRouter>
        <Navbar />

        <Container fluid className={classes.container}>
          <Routes>
            <Route path="/" element={<Gallery />} />
            <Route path="create" element={<Create />} />
            <Route path="discover" element={<Discover />} />
            <Route path="profile" element={<Profile />} />
          </Routes>
        </Container>
      </BrowserRouter>
    </div>
  );
}

export default App;
