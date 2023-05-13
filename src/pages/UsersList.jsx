import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { useState, useEffect } from "react";
import axios from "axios";
import ListGroup from "react-bootstrap/ListGroup";
import { Link } from "react-router-dom";
const API_URL = "http://localhost:5005";

function UsersList (){
    const { therapist, isLoggedIn } = useContext(AuthContext);
    const [users, setUsers] = useState([]);
 



  const storedToken = localStorage.getItem("authTherapistToken");

  console.log(storedToken)

  const getUsers = () => {
    console.log('monkey')
    axios
      .get(`${API_URL}/users`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        
        const allUsers = response.data;
        console.log("response.data", response.data);

        setUsers(allUsers);
      })
      .catch((error) => console.log(error));
  };


  useEffect(()=>{
    getUsers()
  },[])



    return(
        <div>{therapist.name}</div>
    )
}
export default UsersList