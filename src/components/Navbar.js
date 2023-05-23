import { useContext } from "react"
import { NavLink } from "react-router-dom"
import { AuthContext } from "../context/auth.context"
import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"

const NavbarComponent = () => {
  const { isLoggedIn, isLoggedInTher, user, therapist, logOutUser } = useContext(AuthContext)

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
          {(isLoggedIn || isLoggedInTher) && (
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
  )
}

export default NavbarComponent
