import { useAuth0 } from "@auth0/auth0-react";
import { SingInFirst } from "../components/SignInFirst/SingInFirst";

export const Discover = () => {
  const { isAuthenticated } = useAuth0();
  return <>{isAuthenticated ? <>Discover</> : <SingInFirst />}</>;
};
