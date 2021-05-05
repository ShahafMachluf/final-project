import { SAVE_USER_DETAILS, SET_USER_DETAILS, SET_USER_IMAGE_URL } from '../actions/UserDetails';

const initialState = {
    id: null,
    token: null,
    name: null,
    email: null,
    imageUrl: null
}

const userDetaulshReducer = (state = initialState , action) => {
    switch (action.type) {
        case SET_USER_DETAILS:
            return action.details;
        case SAVE_USER_DETAILS:
            return action.details;
        case SET_USER_IMAGE_URL:
            return {
                ...state,
                imageUrl: action.details.imageUrl
            }
        default:
            return state;
    }
}

export default userDetaulshReducer;