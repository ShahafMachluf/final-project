import { insertUserDetails, fetchUserDetails } from '../db';

export const SAVE_USER_DETAILS = 'SAVE_USER_DETAILS'
export const SET_USER_DETAILS = 'SET_USER_DETAILS'

export const saveUserDetails = (userDetails) => {
    return async dispatch => {
        try{
            await insertUserDetails(userDetails.id, userDetails.token, userDetails.name, userDetails.email);
            dispatch({
                type: SAVE_USER_DETAILS,
                details: {
                    id: userDetails.id,
                    token: userDetails.token,
                    name: userDetails.name,
                    email: userDetails.email
                }
            });
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    }
}

export const loadUserDetails = () => {
    return async dispatch => {
        try{
            const dbResult = await fetchUserDetails();
            userDetails = {};
            if(dbResult.rows._array[0]) {
                userDetails.id = dbResult.rows._array[0].id;
                userDetails.token = dbResult.rows._array[0].token;
                userDetails.name = dbResult.rows._array[0].name;
                userDetails.email = dbResult.rows._array[0].email;
            }
            dispatch({
                type: SET_USER_DETAILS,
                details: {
                    ...userDetails
                }
            })
        }
        catch (err) {
            throw err;
        }
    }
}