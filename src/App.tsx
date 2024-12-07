import { Route, Routes } from "react-router-dom"
import LandingPage from "./main/LandingPage"
import SignUp from "./auth/SignUp"
import SignIn from "./auth/SignIn"
import Home from "./main/Home"

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth/signup" element={<SignUp />} />
        <Route path="/auth/signin" element={<SignIn />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </>
  )
}

export default App
