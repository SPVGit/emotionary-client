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
      style={{ marginBottom: "20px" }}
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
      </Container>
    </Navbar>

  )
}

export default NavbarComponent
