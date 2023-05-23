import { useContext} from "react"
import { AuthContext } from "../context/auth.context"
import { Navigate} from "react-router-dom"

function IsAnon({ children }) {
  
  const { isLoading, user, therapist } = useContext(AuthContext)

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

  // Else if user logs in, go to /posts page, or if therapist logs in, go to /users page, otherwise navigate back to sign up page

  if (user) {
    return <Navigate to="/posts" />
  } 
  else if (therapist) {
    return <Navigate to="/users" />
  } 
  else {
    return children
  }
}

export default IsAnon
