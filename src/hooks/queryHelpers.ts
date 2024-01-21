//Helper functions for useCreateSuggestions
const getCurrentPositionPromise = (): Promise<GeolocationPosition | Error> => {
    return new Promise((resolve, reject) => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => resolve(position),
                (error) => reject(error)
            )
        } else {
            reject(new Error('Geolocation is not supported by this browser.'))
        }
    })
}
function isError(value: GeolocationPosition | Error): value is Error {
    return value instanceof Error
}

export {
    getCurrentPositionPromise,
    isError
}