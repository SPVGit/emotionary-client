import { useContext } from "react"
import { NavLink } from "react-router-dom"
import { AuthContext } from "../context/auth.context"

// Bootstrap components
import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import NavDropdown from "react-bootstrap/NavDropdown"

import "bootstrap/dist/css/bootstrap.min.css"
const NavbarComponent = () => {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext)

  return (
    <Navbar
      variant="dark"
      expand="lg">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="'me-auto">
            {isLoggedIn && (
              <>
                <Nav.Link
                  as={NavLink}
                  to="/posts">
                  My Diary
                </Nav.Link>
                <Nav.Link
                  as={NavLink}
                  to="/chat">
                  Chat
                </Nav.Link>
              </>
            )}
          </Nav>
          <Nav>
            {isLoggedIn && (
              <>
                <NavDropdown
                  title={`Welcome back, ${user && user.name}`}
                  id="basic-nav-dropdown">
                  <NavDropdown.Item onClick={logOutUser}>Logout</NavDropdown.Item>
                </NavDropdown>
              </>
            )}

            {!isLoggedIn && (
              <>
                <Nav.Link
                  as={NavLink}
                  to="/signup">
                  Sign up
                </Nav.Link>
                <Nav.Link
                  as={NavLink}
                  to="/login">
                  Log in
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
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
