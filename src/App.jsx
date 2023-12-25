import { BrowserRouter, Routes, Route } from "react-router-dom"

import LandingPage from "./pages/LandingPage"
import Closet from "./pages/Closet"
import Outfits from "./pages/Outfits"
import Upload from "./pages/Upload"
// import Navbar from "./components/Navbar"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        {/* <Navbar /> */}
        <Routes>
          <Route path="/closet" element={<Closet />} />
          <Route path="/outfits" element={<Outfits />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/" element={<LandingPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
