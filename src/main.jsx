import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import "./index.css"
import { GoogleOAuthProvider } from "@react-oauth/google"
import { AuthContextProvider } from "./hooks/AuthContext"

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId="11190237112-ocdfo045sg481ltiqs28fkcdfsjncufo.apps.googleusercontent.com">
    <React.StrictMode>
      <AuthContextProvider>
        {/* <ClosetProvider> */}
        {/* <FavoritesProvider> */}
      
            <App />
            {/* </FavoritesProvider> */}
     
        {/* </ClosetProvider> */}
      </AuthContextProvider>
    </React.StrictMode>
  </GoogleOAuthProvider>,
  document.getElementById("root")
)
