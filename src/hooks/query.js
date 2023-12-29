import { useMutation } from "@tanstack/react-query"
import API from "../services/api"
import { useAuth } from "./AuthContext"

//Sends post request to create user on backend. Then updates the frontend with the
//token that is returned from the backend
const useCreateUser = () => {
  const { signIn } = useAuth()

  return useMutation({
    mutationFn: (data) => API.post("/users", data),
    //backend returns {{ user: token }}
    //and we want to pass the token
    onSuccess: (data) => signIn(data.user),

    // For Testing:
    // onSuccess: (data) => console.log(data),
  })
}
export { useCreateUser }
