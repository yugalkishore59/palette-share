import { Navbar } from "./components/Navigation/Navbar";
import { Gallery } from "./pages/Gallery";
import { Profile } from "./pages/Profile";
import { Discover } from "./pages/Discover";
import { Create } from "./pages/Create/Create";
import classes from "./App.module.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Container } from "@mantine/core";
import { useRef } from "react";

function App() {
  const scrollableRef = useRef<HTMLDivElement>(null);

  return (
    <div className={classes.app}>
      <BrowserRouter>
        <Navbar />

        <Container fluid className={classes.container} ref={scrollableRef}>
          <Routes>
            <Route
              path="/"
              element={<Gallery scrollableRef={scrollableRef} />}
            />
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
