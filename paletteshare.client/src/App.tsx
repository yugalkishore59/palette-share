import { Navbar } from "./components/Navigation/Navbar";
import { Gallery } from "./pages/Gallery";
import { Profile } from "./pages/Profile/Profile";
import { Discover } from "./pages/Discover/Discover";
import { Create } from "./pages/Create/Create";
import { CreateProfile } from "./pages/CreateProfile/CreateProfile";
import { VerifyEmail } from "./components/VerifyEmail/VerifyEmail";

import classes from "./App.module.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Container } from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { getUserByEmail } from "./utils/api";
import { setUser } from "./redux/slices/userSlice";
import { useDispatch } from "react-redux";

function App() {
  const scrollableRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth0();
  const [isProfileCreated, setIsProfileCreated] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      if (user && user.email) {
        try {
          const response = await getUserByEmail(user.email);
          if (!response) {
            setIsProfileCreated(false);
          } else {
            setIsProfileCreated(true);
            dispatch(setUser(response));
          }
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchUser();
  }, [user]);

  return (
    <div className={classes.app}>
      <BrowserRouter>
        {user && user.email_verified === false ? (
          <VerifyEmail />
        ) : user && !isProfileCreated ? (
          <CreateProfile />
        ) : (
          <>
            <Navbar />

            <Container fluid className={classes.container} ref={scrollableRef}>
              <Routes>
                <Route
                  path="/"
                  element={<Gallery scrollableRef={scrollableRef} />}
                />
                <Route path="create" element={<Create />} />
                <Route path="discover" element={<Discover />} />
                <Route path="profile/:username" element={<Profile />} />
              </Routes>
            </Container>
          </>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
