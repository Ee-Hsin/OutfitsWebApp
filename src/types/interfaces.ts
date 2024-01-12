export interface ContactUsFormData {
  firstName: string
  lastName: string
  email: string
  message: string
}

export interface LoginFormData {
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

//I think I'm doing this wrong but idk
// export interface SignInResponse {
//   data?: {
//     message: string // A message indicating success or an error message
//     user?: string // This could be a token or user data if the login is successful
//   }
// }

export interface CustomError {
  response?: {
    data?: {
      message?: string
    }
    // ... other properties of Axios response
  }
  // ... other properties of Axios error
}
