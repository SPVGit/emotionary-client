import "./App.css";
import Navbar from "./components/Navbar";
import {Route, Routes} from "react-router-dom"
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import PostsPage from "./pages/PostsPage";
import SinglePostPage from "./pages/SinglePostPage";
import IsAnon from "./components/IsAnon";
import IsPrivate from "./components/IsPrivate";
import PostFormPage from "./pages/PostFormPage";
import { useContext } from "react";
import { AuthContext } from "./context/auth.context";

function App() {


  const {user} = useContext(AuthContext);



  return (
    <div className="App">
      <Navbar />


      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<IsAnon><LoginPage /></IsAnon>} />
        <Route path="/signup" element={<IsAnon><SignUpPage /></IsAnon>} />
        <Route path= "/posts" element={<IsPrivate><PostsPage user={user} /></IsPrivate> } />
        <Route path="/posts/:postid" element={<IsPrivate><SinglePostPage user={user}/></IsPrivate>} />
        <Route path="/addpost" element={<IsPrivate><PostFormPage user={user}/></IsPrivate>} />
      </Routes>
    </div>
  );
}

export default App;
