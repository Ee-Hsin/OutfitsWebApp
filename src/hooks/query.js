import { useMutation, useQuery } from "@tanstack/react-query"
import API from "../services/api"
import { useAuth } from "./AuthContext"

//Sends post request to Sign In user on backend.
//Updates the frontend with the token that is returned from the backend
const useSignInUser = () => {
  const { signIn } = useAuth()

  return useMutation({
    mutationFn: (data) => API.post("/users/login", data),
    onSuccess: (data) => signIn(data.data.user),
  })
}

const useSignInGoogleUser = () => {
  const { signIn } = useAuth()

  return useMutation({
    mutationFn: (data) => API.post("/users/login/google", data),
    onSuccess: (data) => signIn(data.data.user),
  })
}

//Sends post request to create user on backend. Then updates the frontend with the
//token that is returned from the backend
const useCreateUser = () => {
  const { signIn } = useAuth()

  return useMutation({
    mutationFn: (data) => API.post("/users", data),
    //backend returns {{ user: token }}
    //and we want to pass the token
    onSuccess: (data) => signIn(data.data.user),

    // For Testing:
    // onSuccess: (data) => console.log(data),
  })
}

const useCreateGoogleUser = () => {
  const { signIn } = useAuth()

  return useMutation({
    // {}
    mutationFn: (data) => API.post("/users", data),
    onSuccess: (data) => signIn(data.data.user),
  })
}

const useForgotPassword = () => {
  return useMutation({
    mutationFn: (data) => API.post("/users/forget-password", data),
  })
}

const useResetPassword = ({ id, token }) => {
  return useMutation({
    mutationFn: (data) =>
      API.post(`/users/reset-password/${id}/${token}`, data),
  })
}
const useSaveOutfit = () => {
  const { user } = useAuth()
  return useMutation({
    mutationFn: (data) =>
      API.post("/api/outfit", data, {
        headers: {
          "x-access-token": user,
        },
      }),
  })
}

const useGetOutfits = ({ user }) => {
  console.log(user)
  return useQuery({
    queryKey: ["api", "outfits"],
    queryFn: () =>
      API.get("/api/outfits", {
        headers: {
          "x-access-token": user,
        },
      }),
    enabled: user !== null && user !== undefined,
  })
}

const useGetRecommendations = ({ user }) => {
  return useQuery({
    queryKey: ["api", "recommendation"],
    queryFn: (data) =>
      API.get("/api/recommendation", {
        data,
        headers: {
          "x-access-token": user,
        },
      }),
    enabled: user !== null && user !== undefined,
  })
}
export {
  useSignInUser,
  useSignInGoogleUser,
  useCreateUser,
  useCreateGoogleUser,
  useForgotPassword,
  useResetPassword,
  useSaveOutfit,
  useGetOutfits,
  useGetRecommendations,
}
