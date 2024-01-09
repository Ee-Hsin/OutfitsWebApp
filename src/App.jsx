import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom"

import LandingPage from "./pages/LandingPage"
import Closet from "./pages/Closet"
import Suggestions from "./pages/Suggestions"
import Favorites from "./pages/Favorites"
import Upload from "./pages/Upload"
import Navbar from "./components/Navbar"
import LoginPage from "./pages/LoginPage"
import Signup from "./pages/Signup"
import Create from "./pages/Create"
import Update from "./pages/Update"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useAuth } from "./hooks/AuthContext"
import ForgotPassword from "./pages/ForgotPassword"
import ResetPassword from "./pages/ResetPassword"
import { FailureModal } from "./components/UI/FailureModal"
import { ContactUsForm } from "./pages/ContactUsForm"
import LandingPageNavbar from "./components/LandingPageNavbar"

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
  const { user } = useAuth()

  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<Signup />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="reset-password/:id/:token" element={<ResetPassword />} />
        <Route
          path="contact"
          element={
            <>
              <LandingPageNavbar />
              <ContactUsForm />
            </>
          }
        />
        {/* To protect app routes */}
        {user && (
          <>
            <Route path="/app" exact element={<Navigate to="/app/closet" />} />
            <Route path="/app" element={<NavbarWithOutlet />}>
              <Route path="closet" element={<Closet />} />
              <Route path="favorites" element={<Favorites />} />
              <Route path="suggestions" element={<Suggestions />} />
              <Route path="upload" element={<Upload />} />
              <Route path="create" element={<Create />} />
              <Route path="update" element={<Update />} />
            </Route>
          </>
        )}

        {/* Catch-all Route */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  )
}

function NavbarWithOutlet() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}

const NotFoundPage = () => {
  return (
    <FailureModal
      mainMessage="404 Not Found"
      subMessage="Sorry, the page you are looking for does not exist."
      redirectLink="/"
      redirectMessage="Click here to return to Landing Page"
    />
  )
}

export default App
