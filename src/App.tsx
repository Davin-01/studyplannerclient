import { Route, Routes } from "react-router-dom"
import LandingPage from "./main/LandingPage"

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </>
  )
}

export default App
