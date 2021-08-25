import { SAVE_USER_DETAILS, SET_MAX_DISTANCE, SET_USER_IMAGE_URL, LOGOUT } from '../actions/UserDetails';

const initialState = {
    id: null,
    token: null,
    fullName: null,
    email: null,
    imageUrl: null,
    maxDistance: 0
}

const userDetailsReducer = (state = initialState , action) => {
    switch (action.type) {
        case SAVE_USER_DETAILS:
            return action.details;
        case SET_USER_IMAGE_URL:
            return {
                ...state,
                imageUrl: action.details.imageUrl
            }
        case SET_MAX_DISTANCE:
            return {
                ...state,
                maxDistance: action.details.maxDistance
            }
        case LOGOUT:
            return initialState;
        default:
            return state;
    }
}

export default userDetailsReducer;