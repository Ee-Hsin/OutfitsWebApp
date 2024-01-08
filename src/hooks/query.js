import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import API from "../services/api"
import { useAuth } from "./AuthContext"

/* **************************************************************************** */
/* AUTHENTICATION */

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

/* **************************************************************************** */
/* CLOSET ITEMS */

//User uploads a new item (POST)
const useUploadItem = () => {
  const { user } = useAuth()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data) =>
      API.post("/api/uploadItem", data, {
        headers: {
          "x-access-token": user,
        },
      }),
    onSuccess: () => {
      // Invalidate so that the useGetCloset query will refetch
      queryClient.invalidateQueries(["closet", user])
    },
  })
}

//User deletes an item (DELETE)
const useDeleteItem = () => {
  const { user } = useAuth()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (itemId) =>
      API.delete(`/api/closetItem/${itemId}`, {
        headers: {
          "x-access-token": user,
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(["closet", user])
    },
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
    select: (response) => response.data.items,
  })
}

/* **************************************************************************** */
/* OUTFITS */

//User uploads a new outfit (POST)
const useSaveOutfit = () => {
  const { user } = useAuth()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data) =>
      API.post("/api/outfit", data, {
        headers: {
          "x-access-token": user,
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(["outfits", user])
    },
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

/* **************************************************************************** */
/* FAVORITES */
// To add an outfit to favorites (POST)
// To add an outfit to favorites (POST)
// Use this mutation for saving favorites
const useSaveFavoriteItem = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) =>
      API.post("/api/favorites", data, {
        headers: {
          "x-access-token": user,
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(["favorites", user]);
    },
  });
};



const useGetFavorites = () => {
  const { user } = useAuth()

  return useQuery({
    queryKey: ["favorites", user],
    queryFn: (data) =>
      API.get("/api/favorites", {
        data,
        headers: {
          "x-access-token": user,
        },
      }),
    enabled: !!user,
  });
};

// To remove an outfit from favorites (DELETE)
const useRemoveFavoriteItem = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (itemId) =>
      API.delete(`/api/favorites/${itemId}`, {
        headers: {
          "x-access-token": user,
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(["favorites", user]);
    },
  });
};

// In query.js
const useSaveGeneratedOutfit = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) =>
      API.post("/api/favorites", data, {
        headers: {
          "x-access-token": user,
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(["favorites", user]);
    },
  });
};

export {
  useSignInUser,
  useSignInGoogleUser,
  useCreateUser,
  useCreateGoogleUser,
  useForgotPassword,
  useResetPassword,
  useUploadItem,
  useDeleteItem,
  useSaveOutfit,
  useGetCloset,
  useGetOutfits,
  useGetRecommendations,

  useSaveFavoriteItem,
  useGetFavorites,
  useRemoveFavoriteItem,
  useSaveGeneratedOutfit,
};