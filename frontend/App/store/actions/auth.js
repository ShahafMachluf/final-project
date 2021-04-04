export const SAVE_USER_DETAILS = 'SAVE_USER_DETAILS'

export const saveUserDetails = (userDetails) => {
    return {
        type: SAVE_USER_DETAILS,
        details: {
            id: userDetails.id,
            token: userDetails.token,
        }
    }
}