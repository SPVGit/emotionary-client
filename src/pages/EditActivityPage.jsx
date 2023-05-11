import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import Happy from "../components/emotions/Happy";
import Sad from "../components/emotions/Sad";
import Angry from "../components/emotions/Angry";
import Anxious from "../components/emotions/Anxious";
import Calm from "../components/emotions/Calm";
import Depressed from "../components/emotions/Depressed";
import Embarrassed from "../components/emotions/Embarrassed";
import Excited from "../components/emotions/Excited";
import InLove from "../components/emotions/InLove";
import Satisfied from "../components/emotions/Satisfied";

const API_URL = "http://localhost:5006";

const EditActivityPage = () => {
  const { user } = useContext(AuthContext);
  const { postId, activityId } = useParams();
  const navigate = useNavigate();
  const [emotion, setEmotion] = useState("");
  const storedToken = localStorage.getItem("authToken");
  console.log("editActivity Id", activityId);
  const [updatedActivity, setUpdatedActivity] = useState({
    /*  title: "",
      level: "easy",
      time: "",
      successRating: "1",
      notes: "",
      //post: postId
      */
  });

  // going through editPost to edit activity - create useEffect

  return <div>EditActivityPage</div>;
};

export default EditActivityPage;
