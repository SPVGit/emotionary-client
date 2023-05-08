import "./App.css";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import PostsPage from "./pages/PostsPage";
import SinglePostPage from "./pages/SinglePostPage";
import IsAnon from "./components/IsAnon";
import IsPrivate from "./components/IsPrivate";
import PostFormPage from "./pages/PostFormPage";
import MyChatComponent from "./components/MyChat";
import Client from "./components/Client";
import EditPostPage from "./pages/EditPostPage";
import ActivityFormPage from "./pages/ActivityFormPage";
import CalendarFunc from "./components/Calender";
import PostsByDate from "./components/PostsByDate";

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />

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
          path="/posts/:postId"
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
          path="/posts/edit/:postId"
          element={
            <IsPrivate>
              <EditPostPage />
            </IsPrivate>
          }
        />
        <Route
          path="/chat"
          element={
            <IsPrivate>
              <MyChatComponent />
            </IsPrivate>
          }
        />
        <Route
          path="/client"
          element={
            <IsPrivate>
              <Client />
            </IsPrivate>
          }
        />
        <Route
          path="/addactivity/:postId"
          element={
            <IsPrivate>
              <ActivityFormPage />
            </IsPrivate>
          }
        />
        <Route
          path="/calendar"
          element={
            <IsPrivate>
              <CalendarFunc />
            </IsPrivate>
          }
        />
        <Route
          path="/postsbydate/:postId"
          element={
            <IsPrivate>
              <PostsByDate />
            </IsPrivate>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
