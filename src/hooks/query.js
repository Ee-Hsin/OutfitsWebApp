import { useMutation, useQuery } from "@tanstack/react-query"
import API from "../services/api"
import { useAuth } from "./AuthContext"

//Signs in Email and Password User (POST)
//Sends post request to Sign In user on backend.
//Updates the frontend with the token that is returned from the backend
const useSignInUser = () => {
  const { signIn } = useAuth()

  return useMutation({
    mutationFn: (data) => API.post("/users/login", data),
    onSuccess: (data) => signIn(data.data.user),
  })
}

// Signs in Google User (POST)
const useSignInGoogleUser = () => {
  const { signIn } = useAuth()

  return useMutation({
    mutationFn: (data) => API.post("/users/login/google", data),
    onSuccess: (data) => signIn(data.data.user),
  })
}

//Signs up Email and Password User (POST), logs them in after.
const useCreateUser = () => {
  const { signIn } = useAuth()

  return useMutation({
    mutationFn: (data) => API.post("/users", data),
    //backend returns {{ user: token }}
    //and we want to pass the token
    onSuccess: (data) => signIn(data.data.user),
  })
}

//Signs up Google User, logs them in after. (POST)
const useCreateGoogleUser = () => {
  const { signIn } = useAuth()

  return useMutation({
    // {}
    mutationFn: (data) => API.post("/users", data),
    onSuccess: (data) => signIn(data.data.user),
  })
}

//User gives us their email and requests to change password (POST)
const useForgotPassword = () => {
  return useMutation({
    mutationFn: (data) => API.post("/users/forget-password", data),
  })
}

//User has reset link, and is using that to reset their password (POST)
const useResetPassword = ({ id, token }) => {
  return useMutation({
    mutationFn: (data) =>
      API.post(`/users/reset-password/${id}/${token}`, data),
  })
}

//User uploads a new outfit (POST)
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

//To get the user's closet items (GET)
const useGetCloset = () => {
  const { user } = useAuth()

  return useQuery({
    queryKey: ["closet", user],
    queryFn: () =>
      API.get("/api/closet", {
        headers: {
          "x-access-token": user,
        },
      }),
    enabled: !!user,
    select: response => response.data.items,
  })
}

//To get the user's outfits (GET)
const useGetOutfits = () => {
  const { user } = useAuth()

  return useQuery({
    queryKey: ["outfits", user],
    queryFn: () =>
      API.get("/api/outfits", {
        headers: {
          "x-access-token": user,
        },
      }),
    enabled: !!user,
  })
}

//To get recommendations for the user's outfits (GET)
const useGetRecommendations = () => {
  const { user } = useAuth()

  return useQuery({
    queryKey: ["recommendation", user],
    queryFn: (data) =>
      API.get("/api/recommendation", {
        data,
        headers: {
          "x-access-token": user,
        },
      }),
    enabled: !!user,
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
  useGetCloset,
  useGetOutfits,
  useGetRecommendations,
}
