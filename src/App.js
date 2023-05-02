import "./App.css"
import Navbar from "./components/Navbar"
import { Route, Routes } from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import HomePage from "./pages/HomePage"
import SignUpPage from "./pages/SignUpPage"
import PostsPage from "./pages/PostsPage"
import SinglePostPage from "./pages/SinglePostPage"
import IsAnon from "./components/isAnon"
import IsPrivate from "./components/IsPrivate"
import PostFormPage from "./pages/PostFormPage"
import Chatbox from "./components/Chatbox"

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={<HomePage />}
        />
        <Route
          path="/login"
          element={
            <IsAnon>
              <LoginPage />
            </IsAnon>
          }
        />
        <Route
          path="/signup"
          element={
            <IsAnon>
              <SignUpPage />
            </IsAnon>
          }
        />
        <Route
          path="/posts"
          element={
            <IsPrivate>
              <PostsPage />
            </IsPrivate>
          }
        />
        <Route
          path="/posts/:postid"
          element={
            <IsPrivate>
              <SinglePostPage />
            </IsPrivate>
          }
        />
        <Route
          path="/addpost"
          element={
            <IsPrivate>
              <PostFormPage />
            </IsPrivate>
          }
        />

        <Route
          path="/chat"
          element={
            <IsPrivate>
              <Chatbox />
            </IsPrivate>
          }
        />
      </Routes>
    </div>
  )
}

export default App
