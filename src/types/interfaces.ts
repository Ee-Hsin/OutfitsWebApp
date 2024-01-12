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

export interface ResetPasswordFormData{
  password: string
}

export interface ContactUsFormData {
  firstName: string
  lastName: string
  email: string
  message: string
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
  id?: string;
  token?: string;
}
