/* import axios from "axios";
const API_URL = `http://localhost:${process.env.REACT_APP_API_URL}`
 
const api = axios.create({
  // make sure you use PORT = 5005 (the port where our server is running)
  baseURL: `${API_URL}/api`
  // withCredentials: true // => you might need this option if using cookies and sessions
});
 
const errorHandler = (err) => {
  throw err;
};

const uploadImage = (file) => {
    return api.post("/upload", file)
      .then(res => res.data)
      .catch(errorHandler);
  };

  const createImage = (newImage) => {
    return api.post("/image", newImage)
      .then(res => res.data)
      .catch(errorHandler);
  };

  export default {

    uploadImage,
    createImage

  }; */