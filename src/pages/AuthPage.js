import AuthForm from "../components/Auth/AuthForm";
import AuthContext from "../components/store/auth-context";
import { useContext } from "react";
const AuthPage = () => {
  const authCtx = useContext(AuthContext);
  console.log(authCtx);

  return <AuthForm></AuthForm>;
};

export default AuthPage;
