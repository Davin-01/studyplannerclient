import { Route, Routes } from "react-router-dom"
import LandingPage from "./main/LandingPage"
import SignUp from "./auth/SignUp"
import SignIn from "./auth/SignIn"
import Home from "./main/Home"
import Profile from "./main/Profile"
import Planner from "./main/Planner"
import MyPlans from "./main/MyPlans"
import Courses from "./main/Events"
import CourseDetail from "./main/CourseDetail"

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth/signup" element={<SignUp />} />
        <Route path="/auth/signin" element={<SignIn />} />
        <Route path="/home" element={<Home />} />
        <Route path="/home/profile" element={<Profile />} />
        <Route path="/home/planner" element={<Planner />} />
        <Route path="/home/myplans" element={<MyPlans />} />
        <Route path="/home/courses" element={<Courses />} />
        <Route path="/home/course/:id" element={<CourseDetail />} />
      </Routes>
    </>
  )
}

export default App
