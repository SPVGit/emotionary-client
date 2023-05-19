import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Navigate} from "react-router-dom";

function IsAnon( { children } ) {

 
  
  const { isLoggedIn, isLoading, user, therapist } = useContext(AuthContext);

  // If the authentication is still loading 
  if (isLoading) return <div className='outer-spinner-div'><div className="lds-default"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div>

  if (isLoggedIn && user) {
  
    return <Navigate to="/posts" />;

  } 
  else if(isLoggedIn && therapist){
    return <Navigate to="/users" />;
  }
  else {
   
    return children;
  }
}

export default IsAnon;
