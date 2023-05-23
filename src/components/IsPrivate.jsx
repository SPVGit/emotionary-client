import { useContext, useEffect } from "react"
import { AuthContext } from "../context/auth.context"
import { Navigate } from "react-router-dom"

function IsPrivate({ children }) {
  const { isLoggedIn, isLoading, user } = useContext(AuthContext)

  // If the authentication is still loading, then show the spinner

  if (isLoading) {
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
  } else if (!isLoggedIn) {
    // If the user is not logged in go back to signup
    return <Navigate to="/signup" />
  } else if (user) {
    // If the user is logged in, allow to see the page
    return children
  }
}

export default IsPrivate
