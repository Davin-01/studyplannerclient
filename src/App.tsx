import { Route, Routes } from "react-router-dom"
import LandingPage from "./main/LandingPage"
import SignUp from "./auth/SignUp"
import SignIn from "./auth/SignIn"

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth/signup" element={<SignUp />} />
        <Route path="/auth/signin" element={<SignIn />} />
      </Routes>
    </>
  )
}

export default App
