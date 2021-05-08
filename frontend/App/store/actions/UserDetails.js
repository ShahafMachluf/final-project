import * as db from '../db';

export const SAVE_USER_DETAILS = 'SAVE_USER_DETAILS';
export const SET_USER_IMAGE_URL = 'SET_USER_IMAGE_URL';
export const SET_MAX_DISTANCE = 'SET_MAX_DISTANCE';

export const saveUserDetails = (userDetails) => {
    return async dispatch => {
        try{
            await db.insertUserDetails(userDetails);
            dispatch({
                type: SAVE_USER_DETAILS,
                details: {
                    id: userDetails.id,
                    token: userDetails.token,
                    fullName: userDetails.fullName,
                    email: userDetails.email,
                    imageUrl: userDetails.imageUrl,
                    maxDistance: userDetails.maxDistance
                }
            });
        }
        catch (err) { 
            console.log(err);
            throw err;
        }
    }
}

export const setImageUrl = imageUrl => {
    return async dispatch => {
        try {
            await db.updateImageUrl(imageUrl);
            dispatch({
                type: SET_USER_IMAGE_URL,
                details: {
                    imageUrl: imageUrl
                }
            })
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
            const dbResult = await db.fetchUserDetails();
            userDetails = {};
            if(dbResult.rows._array[0]) {
                userDetails.id = dbResult.rows._array[0].id;
                userDetails.token = dbResult.rows._array[0].token;
                userDetails.fullName = dbResult.rows._array[0].fullName;
                userDetails.email = dbResult.rows._array[0].email;
                userDetails.imageUrl = dbResult.rows._array[0].imageUrl;
                userDetails.maxDistance = dbResult.rows._array[0].maxDistance;
                dispatch({
                    type: SAVE_USER_DETAILS,
                    details: {
                        ...userDetails
                    }
                })
            }
        }
        catch (err) {
            throw err;
        }
    }
}

export const setMaxDistance = maxDistance => {
    return async dispatch => {
        try {
            await db.updateMaxDistance(maxDistance);
            dispatch({
                type: SET_MAX_DISTANCE,
                details: {
                    maxDistance
                }
            })
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    }
}