import { useContext } from "react"
import { NavLink } from "react-router-dom"
import { AuthContext } from "../context/auth.context"
import "bootstrap/dist/css/bootstrap.min.css"

const Navbar = () => {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext)

  return (
    <nav className="Navbar">
      <ul>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "selected" : "")}>
          Home
        </NavLink>

        {/*If logged in show Posts Button and Logout Button */}
        {isLoggedIn && (
          <>
            <NavLink
              to="/chat"
              className={({ isActive }) => (isActive ? "selected" : "")}>
              Chat
            </NavLink>
            <NavLink
              to="/posts"
              className={({ isActive }) => (isActive ? "selected" : "")}>
              Posts
            </NavLink>
            <NavLink
              to="/addpost"
              className={({ isActive }) => (isActive ? "selected" : "")}>
              Add Posts
            </NavLink>

            <NavLink onClick={logOutUser}>Logout</NavLink>
            <span className="text-light">Welcome back, {user && user.name}</span>
          </>
        )}

        {/*If not logged in show login and signup button  */}

        {!isLoggedIn && (
          <>
            <NavLink
              to="/signup"
              className={({ isActive }) => (isActive ? "selected" : "")}>
              Sign up
            </NavLink>
            <NavLink
              to="/login"
              className={({ isActive }) => (isActive ? "selected" : "")}>
              Login
            </NavLink>
          </>
        )}
      </ul>
    </nav>
  )
}

export default Navbar
