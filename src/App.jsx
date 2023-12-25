import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom"

import LandingPage from "./pages/LandingPage"
import Closet from "./pages/Closet"
import Outfits from "./pages/Outfits"
import Upload from "./pages/Upload"
import Navbar from "./components/Navbar"
import LoginPage from "./pages/LoginPage"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </div>
  )
}

function AppRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/app" element={<NavbarWithOutlet />}>
          <Route path="closet" element={<Closet />} />
          <Route path="outfits" element={<Outfits />} />
          <Route path="upload" element={<Upload />} />
        </Route>
      </Routes>
    </>
  )
}

function NavbarWithOutlet() {
  return (
    <>
      <Navbar />
      <Outlet />{" "}
      {/* This is where Closet, Outfits, and Upload components will render */}
    </>
  )
}

export default App
