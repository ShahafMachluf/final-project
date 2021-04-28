import store from '../../store/Store';

export const Get = async (url, headers = {}, options = {}) => { 
    const response = await fetch(url, {
        headers: {
            'Accept': 'application/json',
            ...headers,
            'Authorization': getAuthToken()
        },
        ...options
    });

    if(!response.ok) {
        const error = await response.json();
        throw new Error(error.error);
    }

    return response.json();
}

export const Post = async (url, body, headers = {}, options = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            ...headers,
            //'Authorization': getAuthToken()
        },
        ...options,
        body: JSON.stringify(body)
    });

    if(!response.ok) {
        const error = await response.json();
        throw new Error(error.error);
    }

    return response.json();
}

const getAuthToken = () => 'Bearer ' + store.getState().auth.token;