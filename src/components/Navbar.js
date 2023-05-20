import { useContext } from "react"
import { NavLink } from "react-router-dom"
import { AuthContext } from "../context/auth.context"

// Bootstrap components
import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"

const NavbarComponent = () => {
  const { isLoggedIn, user, therapist, logOutUser } = useContext(AuthContext)

  return (
    <Navbar
      style={{ marginBottom: "20px", marginTop: "20px" }}
      variant="dark"
      expand="lg">
      <Container>
        {user && (
          <Nav.Link
            to="/posts"
            className="navlink"
            as={NavLink}>
            <img
              src="/Frame-35.png"
              alt="Emotionary Logo"
              width="140px"
              height="80px"
            />
          </Nav.Link>
        )}

        {therapist && (
          <Nav.Link
            to="/users"
            className="navlink"
            as={NavLink}>
            <img
              src="/Frame-35.png"
              alt="Emotionary Logo"
              width="140px"
              height="80px"
            />
          </Nav.Link>
        )}

        {!user && !therapist && (
          <Nav.Link
            to={"/"}
            className="navlink"
            as={NavLink}>
            <img
              src="/Frame-35.png"
              alt="Emotionary Logo"
              width="140px"
              height="80px"
            />
          </Nav.Link>
        )}

        <Nav className="'me-auto">
          {isLoggedIn && (
            <NavLink
              className="navlink"
              style={{ textDecoration: "none", color: "white", fontWeight: "bold", marginRight: "20px", fontSize: "16px" }}
              as={NavLink}
              to="#"
              onClick={logOutUser}>
              Log out
            </NavLink>
          )}
        </Nav>
      </Container>
    </Navbar>

    // <nav className="Navbar">
    //   <ul>
    //     <NavLink
    //       to="/"
    //       className={({ isActive }) => (isActive ? "selected" : "")}>
    //       Home
    //     </NavLink>

    //     {/*If logged in show Posts Button and Logout Button */}
    //     {isLoggedIn && (
    //       <>
    //         <NavLink
    //           to="/posts"
    //           className={({ isActive }) => (isActive ? "selected" : "")}>
    //           Posts
    //         </NavLink>
    //         <NavLink
    //           to="/chat"
    //           className={({ isActive }) => (isActive ? "selected" : "")}>
    //           Chat
    //         </NavLink>

    //         <NavLink onClick={logOutUser}>Logout</NavLink>
    //         <span className="text-light">Welcome back, {user && user.name}</span>
    //       </>
    //     )}

    //     {/*If not logged in show login and signup button  */}

    //     {!isLoggedIn && (
    //       <>
    //         <NavLink
    //           to="/signup"
    //           className={({ isActive }) => (isActive ? "selected" : "")}>
    //           Sign up
    //         </NavLink>
    //         <NavLink
    //           to="/login"
    //           className={({ isActive }) => (isActive ? "selected" : "")}>
    //           Login
    //         </NavLink>
    //       </>
    //     )}
    //   </ul>
    // </nav>
  )
}

export default NavbarComponent
