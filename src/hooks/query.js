import { useMutation } from "@tanstack/react-query"
import API from "./services/api"

//Sends post request to create user on backend. Needs to update auth context with user though.
const useCreateUser = () => {
  return useMutation({
    mutationFn: (data) => API.post("/users", data),
  })
}
export { useCreateUser }
