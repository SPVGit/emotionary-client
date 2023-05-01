import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import {Route, Routes} from "react-router-dom"
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import PostsPage from "./pages/PostsPage";
import SinglePostPage from "./pages/SinglePostPage";

function App() {
  return (
    <div className="App">
      <Navbar />


      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path= "/posts" element={<PostsPage /> } />
        <Route path="/posts/:postid" element={<SinglePostPage />} />
      </Routes>
    </div>
  );
}

export default App;
