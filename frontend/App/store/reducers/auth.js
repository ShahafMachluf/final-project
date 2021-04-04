import { SAVE_USER_DETAILS } from '../actions/auth';

const initialState = {
    id: null,
    token: null
}

const authReducer = (state = initialState , action) => {
    switch (action.type) {
        case SAVE_USER_DETAILS:
            return action.details
        default:
            return state;
    }
}

export default authReducer;