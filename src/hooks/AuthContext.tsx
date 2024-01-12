import { ReactNode, createContext, useContext, useEffect, useState } from "react"

interface AuthContextType {
  user: string | null;
  signIn: (token: string) => void;
  signOut: () => void;
}

const UserContext = createContext<AuthContextType | null>(null);

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState<string | null>(null)

  //For when page is refreshed, puts the existing user back in state.
  useEffect(() => {
    const existingUser = localStorage.getItem("token")

    if (existingUser) {
      // console.log("this", existingUser)
      setUser(existingUser)
    }
  }, [])

  const signIn = (token: string) => {
    localStorage.setItem("token", token)
    setUser(token)
  }

  const signOut = () => {
    localStorage.removeItem("token")
    setUser(null)
  }

  return (
    <UserContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </UserContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useAuth must be used within a AuthContextProvider");
  }
  return context
}
