import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import API from '../services/api'
import { useAuth } from './AuthContext'
import {
    ForgotPasswordFormData,
    LoginFormData,
    GoogleFormData,
    SignUpFormData,
    ResetPasswordFormData,
    ResetPasswordParams,
    UpdateItemDetailsProps,
    CustomError,
    CreateFavoriteData,
} from '../types/interfaces'
import { getCurrentPositionPromise, isError } from './queryHelpers'

/* **************************************************************************** */
/* AUTHENTICATION */

//Signs in Email and Password User (POST)
//Sends post request to Sign In user on backend.
//Updates the frontend with the token that is returned from the backend
const useSignInUser = () => {
    const { signIn } = useAuth()

    //<any, Error, LoginFormData> 
    // Is: <*response type*, *error type*, *the sent data type*>
    return useMutation<any, Error, LoginFormData>({
        mutationFn: (data) => API.post('/users/login', data),
        onSuccess: (data) => {
            // console.log(data)
            signIn(data.data.user)
        },
    })
}

// Signs in Google User (POST)
const useSignInGoogleUser = () => {
    const { signIn } = useAuth()

    return useMutation<any, Error, GoogleFormData>({
        mutationFn: (data) => API.post('/users/login/google', data),
        onSuccess: (data) => signIn(data.data.user),
    })
}

//Signs up Email and Password User (POST), logs them in after.
const useCreateUser = () => {
    const { signIn } = useAuth()

    return useMutation<any, CustomError, SignUpFormData>({
        mutationFn: (data) => API.post('/users', data),
        //backend returns {{ user: token }}
        //and we want to pass the token
        onSuccess: (data) => signIn(data.data.user),
    })
}

//Signs up Google User, logs them in after. (POST)
const useCreateGoogleUser = () => {
    const { signIn } = useAuth()

    return useMutation<any, CustomError, GoogleFormData>({
        // {}
        mutationFn: (data) => API.post('/users', data),
        onSuccess: (data) => signIn(data.data.user),
    })
}

//User gives us their email and requests to change password (POST)
const useForgotPassword = () => {
    return useMutation<void, Error, ForgotPasswordFormData>({
        mutationFn: (data) => API.post('/users/forget-password', data),
    })
}

//User has reset link, and is using that to reset their password (POST)
const useResetPassword = ({ id, token }: ResetPasswordParams) => {
    return useMutation<void, Error, ResetPasswordFormData>({
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

    return useMutation<any, Error, FormData>({
        mutationFn: (data) =>
            API.post('/api/closet/uploadItem', data, {
                headers: {
                    'x-access-token': user,
                },
            }),
        onSuccess: () => {
            // Invalidate so that the useGetCloset query will refetch
            queryClient.invalidateQueries({ queryKey: ['closet', user] })
        },
    })
}

//User updates an item (POST)
const useUpdateItem = () => {
    const { user } = useAuth()
    const queryClient = useQueryClient()

    return useMutation<any, Error, UpdateItemDetailsProps >({
        mutationFn: (data) =>
            API.put(`/api/closet/updateItemDetails/${data.itemId}`, data, {
                headers: {
                    'x-access-token': user,
                },
            }),
        onSuccess: () => {
            // Invalidate so that the useGetCloset query will refetch
            queryClient.invalidateQueries({ queryKey: ['closet', user] })
        },
    })
}

//User deletes an item (DELETE)
const useDeleteItem = () => {
    const { user } = useAuth()
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (itemId: string) =>
            API.delete(`/api/closet/closetItem/${itemId}`, {
                headers: {
                    'x-access-token': user,
                },
            }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['closet', user] })
        },
    })
}

//To get the user's closet items (GET)
const useGetCloset = () => {
    const { user } = useAuth()

    return useQuery({
        queryKey: ['closet', user],
        queryFn: () =>
            API.get('/api/closet', {
                headers: {
                    'x-access-token': user,
                },
            }),
        enabled: !!user,
        select: (response) => response.data.items,
    })
}

//TO IMPLEMENT (NEED TO CHANGE BACKEND TO ACCOMODATE), FOR FETCHING INFINITE SCROLL.
// const useGetInfiniteScrollCloset = () => {
//     return useInfiniteQuery({
//         queryKey: ["closet", user],
//         queryFn:
//     })
// }

/* **************************************************************************** */
/* OUTFITS */

//THESE ARE FOR THE FAVORITES PAGE:
//To get the user's Favorite Outfits (GET)
const useGetFavorites = () => {
    const { user } = useAuth()

    return useQuery({
        queryKey: ['favorites', user],
        queryFn: () =>
            API.get('/api/favorites', {
                headers: {
                    'x-access-token': user,
                },
            }),
    })
}

//User Creates a new Favorite outfit and this saves it (POST)
const useCreateFavorites = () => {
    const { user } = useAuth()
    const queryClient = useQueryClient()

    return useMutation<any, Error, CreateFavoriteData>({
        mutationFn: (data) =>
            API.post('/api/favorites', data, {
                headers: {
                    'x-access-token': user,
                },
            }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['favorites', user] })
        },
    })
}

//User deletes an outfit (DELETE)
const useDeleteFavorites = () => {
    const { user } = useAuth()
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (outfitId: string) =>
            API.delete(`/api/favorites/${outfitId}`, {
                headers: {
                    'x-access-token': user,
                },
            }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['favorites', user] })
        },
    })
}

//************************************************ */
//THESE ARE FOR THE SUGGESTIONS PAGE:
//To generate suggestions for the user (POST)
const useCreateSuggestions = () => {
    const { user } = useAuth()
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async () => {
            let position = await getCurrentPositionPromise()
            if (isError(position)) {
                throw position
            }

            const latitude = position.coords.latitude
            const longitude = position.coords.longitude

            return API.post('/api/favorites/suggestions', {latitude, longitude}, {
                headers: {
                    'x-access-token': user,
                },
            })
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['suggestions', user] })
        },
    })
}

const useGetSuggestions = () => {
    const { user } = useAuth()

    return useQuery({
        queryKey: ['suggestions', user],
        queryFn: () =>
            API.get('/api/favorites/suggestions', {
                headers: {
                    'x-access-token': user,
                },
            }),
    })
}

//When the user is on the suggestions page, 
//they can save an outfit to their favorites (POST)
const useSaveSuggestion = () => {
    const { user } = useAuth()
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data) =>
            API.post('/api/favorites/suggestions', data, {
                headers: {
                    'x-access-token': user,
                },
            }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['favorite', user] })
        },
    })
}

export {
    useSignInUser,
    useSignInGoogleUser,
    useCreateUser,
    useCreateGoogleUser,
    useForgotPassword,
    useResetPassword,
    useUploadItem,
    useUpdateItem,
    useDeleteItem,
    useGetCloset,
    //   useGetInfiniteScrollCloset,
    useCreateFavorites,
    useGetFavorites,
    useDeleteFavorites,
    useCreateSuggestions,
    useGetSuggestions,
    useSaveSuggestion,
    // useRemoveFavoriteItem,
}


// To remove an outfit from favorite (DELETE)
// const useRemoveFavoriteItem = () => {
//     const { user } = useAuth()
//     const queryClient = useQueryClient()

//     return useMutation({
//         mutationFn: (id: string) =>
//             API.delete(`/api/favorite/${id}`, {
//                 headers: {
//                     'x-access-token': user,
//                 },
//             }),
//         onSuccess: () => {
//             queryClient.invalidateQueries({ queryKey: ['favorite', user] })
//         },
//     })
// }