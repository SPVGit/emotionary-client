import { useContext, useState, useEffect } from "react"
import { NavLink } from "react-router-dom"
import { AuthContext } from "../context/auth.context"

// Bootstrap components
import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import NavDropdown from "react-bootstrap/NavDropdown"


const NavbarComponent = () => {
  const { isLoggedIn, user, therapist, logOutUser } = useContext(AuthContext)
  const [navBarOpen, setNavBarOpen] = useState(false)

  return (
    <Navbar
      variant="dark"
      expand="lg">
      <Container>
        {user && <Navbar.Brand href={isLoggedIn && "/posts"}>
          <img
            src="/Frame-35.png"
            alt="Emotionary Logo"
            width="140px"
            height="80px"
          />
        </Navbar.Brand>}

        {therapist && <Navbar.Brand href={isLoggedIn && "/users"}>
          <img
            src="/Frame-35.png"
            alt="Emotionary Logo"
            width="140px"
            height="80px"
          />
        </Navbar.Brand>}

        {!user && !therapist &&
          <Navbar.Brand href={"/"}>
            <img
              src="/Frame-35.png"
              alt="Emotionary Logo"
              width="140px"
              height="80px"
            />
          </Navbar.Brand>}

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="'me-auto">
            {isLoggedIn && (
              <NavLink
                className="navlink"
                as={NavLink}
                to="#"
                onClick={logOutUser}>
                Log out
              </NavLink>
            )}
          </Nav>
          <Nav>
            {!isLoggedIn && (
              <>
                <Nav.Link
                  className="navlink"
                  as={NavLink}
                  to="/signup">
                  Sign up
                </Nav.Link>
                <Nav.Link
                  className="navlink"
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
