import Navbar from "./components/Navbar"
import { Route, Routes } from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import HomePage from "./pages/HomePage"
import SignUpPage from "./pages/SignUpPage"
import PostsPage from "./pages/PostsPage"
import SinglePostPage from "./pages/SinglePostPage"
import IsAnon from "./components/IsAnon"
import IsPrivate from "./components/IsPrivate"
import IsTherapistPrivate from "./components/IsTherapistPrivate"
import PostFormPage from "./pages/PostFormPage"
import EditPostPage from "./pages/EditPostPage"
import ActivityFormPage from "./pages/ActivityFormPage"
import CalendarFunc from "./components/Calender"
import PostsByDate from "./components/PostsByDate"
import ActivityPage from "./pages/ActivityPage"
import TherapistLogin from "./pages/TherapistLogin"
import UsersList from "./pages/UsersList"
import EditActivityPage from "./pages/EditActivityPage"
import ChatPage from "./pages/ChatPage"
import StatsPage from "./pages/StatsPage"
import TherChat from "./pages/TherChat"


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
          path="/therapistlogin"
          element={
            <IsAnon>
              <TherapistLogin />
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
          path="/posts/edit/:postId"
          element={
            <IsPrivate>
              <EditPostPage />
            </IsPrivate>
          }
        />

        <Route
          path="/posts/:postId/:activityId"
          element={
            <IsPrivate>
              <ActivityPage />
            </IsPrivate>
          }
        />

        <Route
          path="/posts/:postId/edit/:activityId"
          element={
            <IsPrivate>
              <EditActivityPage />
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

        <Route
          path="/chat/:chatId"
          element={
            <IsPrivate>
              <ChatPage />
            </IsPrivate>
          }
        />

        <Route
          path="/stats"
          element={
            <IsPrivate>
              <StatsPage />
            </IsPrivate>
          }
        />
        <Route
          path="/users"
          element={
            <IsTherapistPrivate>
              <UsersList />
            </IsTherapistPrivate>
          }
        />

        <Route
          path="/therchat/:chatId"
          element={
            <IsTherapistPrivate>
              <TherChat />
            </IsTherapistPrivate>
          }
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

      </Routes>

    </div>
  )
}

export default App
