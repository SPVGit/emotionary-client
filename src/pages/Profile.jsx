/* import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import AddUserImage from "./AddUserImage";
const API_URL = `http://localhost:${process.env.REACT_APP_API_URL}`;

const Profile = () => {
  const { userId } = useParams();
  console.log(userId);
  const [singleUser, setSingleUser] = useState({});

  const storedToken = localStorage.getItem("authToken");

  const getUser = () => {
    axios
      .get(`${API_URL}/profile/${userId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        const singleUser = response.data;
        console.log("response.data", singleUser);

        setSingleUser(singleUser);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div>
      <p>Name: {singleUser.name}</p>
      <p>email: {singleUser.email}</p>
     <p>Joined on: {singleUser.createdAt}</p> 
      <AddUserImage />
    </div>
  );
};

export default Profile; */
