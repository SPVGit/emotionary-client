import { useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

const Navbar = () => {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <nav className="Navbar">
      <ul>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "selected" : "")}
        >
          Home
        </NavLink>

        {/*If logged in show Posts Button and Logout Button */}
        {isLoggedIn && (
          <>
            <Link
              to="/posts"
              className={({ isActive }) => (isActive ? "selected" : "")}
            >
              <button>Posts</button>{" "}
            </Link>

            <button onClick={logOutUser}>Logout</button>
            <span>{user && user.name}</span>
          </>
        )}

        {/*If not logged in show login and signup button  */}

        {!isLoggedIn && (
          <>
            <NavLink
              to="/signup"
              className={({ isActive }) => (isActive ? "selected" : "")}
            >
              Sign up
            </NavLink>
            <NavLink
              to="/login"
              className={({ isActive }) => (isActive ? "selected" : "")}
            >
              Login
            </NavLink>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
