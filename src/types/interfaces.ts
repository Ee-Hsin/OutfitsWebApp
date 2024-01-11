export interface ForgotPasswordFormData {
  email: string
}

export interface AxiosError {
  response?: {
    data?: {
      message?: string
    }
    // ... other properties of Axios response
  }
  // ... other properties of Axios error
}
