import { useContext } from "react"
import { AuthContext } from "../context/auth.context"
import { Navigate } from "react-router-dom"

function IsTherapistPrivate({ children }) {

  const { isLoggedIn, isLoading, therapist } = useContext(AuthContext)

  // If the authentication is still loading, show the spinner

  if (isLoading)
    return (
      <div className="outer-spinner-div">
        <div className="lds-default">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    )

  if (!isLoggedIn) {
    // If the therapist is not logged in, go to signup page
    return <Navigate to="/signup" />
  } else if (therapist) {
    // If the therapist is logged in, allow to see the page
    return children
  }
}

export default IsTherapistPrivate
