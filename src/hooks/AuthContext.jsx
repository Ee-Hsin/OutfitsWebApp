import { createContext, useContext, useEffect, useState } from "react"

const UserContext = createContext()

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState()
  const [loggedIn, setLoggedIn] = useState(true)

  //For when page is refreshed, puts the existing user back in state.
  useEffect(() => {
    const existingUser = localStorage.getItem("token")

    if (existingUser) {
      console.log("this", existingUser)
      setUser(existingUser)
      setLoggedIn(true)
    } else {
        setLoggedIn(false)
    }
  }, [])

  const signIn = (token) => {
    localStorage.setItem("token", token)
    setUser(token)
  }

  const signOut = () => {
    localStorage.removeItem("token")
    setUser()
  }

  return (
    <UserContext.Provider value={{ user, loggedIn, signIn, signOut }}>
      {children}
    </UserContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(UserContext)
}
