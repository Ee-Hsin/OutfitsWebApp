import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom"

import LandingPage from "./pages/LandingPage"
import Closet from "./pages/Closet"
import Outfits from "./pages/Outfits"
import Upload from "./pages/Upload"
import Navbar from "./components/Navbar"
import LoginPage from "./pages/LoginPage"
import Signup from "./pages/Signup"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useAuth } from "./hooks/AuthContext"

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </div>
    </QueryClientProvider>
  )
}

function AppRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="signup" element={<Signup />} />
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
  //Just for testing purposes
  const { user } = useAuth()

  return (
    <>
      <Navbar />
      <Outlet />
      {/* Just for testing purposes */}
      <h1>{user}</h1>
    </>
  )
}

export default App
