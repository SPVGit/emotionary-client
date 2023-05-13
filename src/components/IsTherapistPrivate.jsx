import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Navigate } from "react-router-dom";

function IsTherapistPrivate( { children } ) {


  
  const { isLoggedIn, isLoading , therapist} = useContext(AuthContext);



  // If the authentication is still loading 
  if (isLoading) return <div className='outer-spinner-div'><div className="lds-default"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div>

if (!isLoggedIn) {
  // If the user is not logged in 
    return <Navigate to="/signup" />;
  } else if(therapist){
  // If the user is logged in, allow to see the page 
    return children;
  }
}

export default IsTherapistPrivate;