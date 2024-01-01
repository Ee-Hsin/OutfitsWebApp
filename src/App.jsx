import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom"

import LandingPage from "./pages/LandingPage"
import Closet from "./pages/Closet"
import Suggestions from "./pages/Suggestions"
import Favorites from "./pages/Favorites"
import Upload from "./pages/Upload"
import Navbar from "./components/Navbar"
import LoginPage from "./pages/LoginPage"
import Signup from "./pages/Signup"
import Create from "./pages/Create"
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
          <Route path="favorites" element={<Favorites />} />
          <Route path="suggestions" element={<Suggestions />} />
          <Route path="upload" element={<Upload />} />
          <Route path="create" element={<Create />} />
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
      {console.log(user)}
    </>
  )
}

export default App
