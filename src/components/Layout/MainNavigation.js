import { Link, useHistory } from "react-router-dom";
import { useContext } from "react";
import classes from "./MainNavigation.module.css";
import AuthContext from "../store/auth-context";

const MainNavigation = () => {
  const history = useHistory();
  const authCtx = useContext(AuthContext);
  const btnLogoutHandler = () => {
    history.push("/auth");
    authCtx.logout();
  };
  return (
    <header className={classes.header}>
      <Link to="/">
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {!authCtx.isLoggedIn && (
            <li>
              <Link to="/auth">Login</Link>
            </li>
          )}
          {authCtx.isLoggedIn && (
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          )}
          {authCtx.isLoggedIn && (
            <li>
              <button onClick={btnLogoutHandler}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
