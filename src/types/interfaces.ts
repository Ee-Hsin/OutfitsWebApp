//FORM DATA:
export interface LoginFormData {
    email: string
    password: string
}

export interface SignUpFormData {
    username: string
    email: string
    password: string
}

export interface GoogleFormData {
    googleId?: string
    googleCred?: string
}

export interface ForgotPasswordFormData {
    email: string
}

export interface ResetPasswordFormData {
    password: string
}

export interface ContactUsFormData {
    firstName: string
    lastName: string
    email: string
    message: string
}

export interface UploadFormData {
    name: string
    category: string
    subcategory: string
    color: string
    hasGraphic: string | boolean
    // add other fields as necessary
}

export interface CreateOutfitData {
  clothes: string[];
  outfitName: string;
}

export interface UpdateItemDetailsProps {
    itemId: string
    details: ClosetItem
}

//PROPS:
export interface ModalProps {
    mainMessage?: string
    subMessage?: string
    redirectMessage?: string
    redirectLink?: string
}

export interface LoaderProps {
    small?: boolean
    className?: string
}

//RESPONSES AND ERRORS AND STUFF

//I think I'm doing this wrong but idk
// export interface SignInResponse {
//   data?: {
//     message: string // A message indicating success or an error message
//     user?: string // This could be a token or user data if the login is successful
//   }
// }

//This is a bit sus, idk why it works even though the error returned
//is more than just these fields
export interface CustomError {
    response?: {
        data?: {
            message?: string
        }
        // ... other properties of Axios response
    }
    // ... other properties of Axios error
}

//FUNCTION PARAMETERS:
export interface ResetPasswordParams {
    id?: string
    token?: string
}

export interface ClothingSubcategories {
    Tops: string[]
    Bottoms: string[]
    Footwear: string[]
    Dresses: string[]
    Outerwear: string[]
    Accessories: string[]
    Activewear: string[]
}

//Request Details
export interface FavoriteDetails {}

export interface OutfitDetails {}

// Clothing Item
export interface ClosetItem {
    _id: string
    image: string
    name: string
    category: string
    subcategory: string
    color: string
    hasGraphic: string | boolean
}
export type ClothingCategory =
    | 'Tops'
    | 'Bottoms'
    | 'Activewear'
    | 'Footwear'
    | 'Dresses'
    | 'Outerwear'
    | 'Accessories'
