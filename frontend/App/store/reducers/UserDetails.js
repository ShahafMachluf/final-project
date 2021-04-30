import { SAVE_USER_DETAILS, SET_USER_DETAILS } from '../actions/UserDetails';

const initialState = {
    id: null,
    token: null,
    name: null,
    email: null
}

const userDetaulshReducer = (state = initialState , action) => {
    switch (action.type) {
        case SET_USER_DETAILS:
            return action.details;
        case SAVE_USER_DETAILS:
            return action.details;
        default:
            return state;
    }
}

export default userDetaulshReducer;