import { createContext, useContext, useState, useEffect } from "react"
import { API_URL } from "../services/constants"
import { useAuth } from "./AuthContext"

const ClosetContext = createContext()

const ClosetProvider = ({ children }) => {
  const [uploadedItems, setUploadedItems] = useState([])
  const { user } = useAuth()

  useEffect(() => {
    // Fetch items from the API endpoint
    // console.log(user)
    if (user) {
      fetch(`${API_URL}/api/closet`, {
        method: "GET",
        headers: {
          "x-access-token": user,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setUploadedItems(data.items)
          //setLoading(false); // Set loading to false after receiving the response
          // console.log(data)
        })
        .catch((error) => {
          //setLoading(false); // Set loading to false in case of an error
          console.error("Error fetching items:", error)
        })
    }
  }, [user, setUploadedItems, uploadedItems])

  return (
    <ClosetContext.Provider value={{ uploadedItems, setUploadedItems }}>
      {children}
    </ClosetContext.Provider>
  )
}

const useCloset = () => {
  const context = useContext(ClosetContext)
  if (!context) {
    throw new Error("useCloset must be used within a ClosetProvider")
  }
  return context
}

export { ClosetProvider, useCloset }
