
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
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            ...headers,
            'Authorization': getAuthToken()
        },
        ...options,
        body: JSON.stringify(body)
    });

    if(!response.ok) {
        const error = await response.text();
        throw new Error(error);
    }

    return response.json();
}

export const Put = async (url, body, headers = {}, options = {}) => {
    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            ...headers,
            'Authorization': getAuthToken()
        },
        ...options,
        body: JSON.stringify(body)
    });

    if(!response.ok) {
        const error = await response.json();
        throw new Error(error);
    }

    return response.json();
}

export const Delete = async (url, headers = {}, options = {}) => {
    const response = await fetch(url, {
        method: 'DELETE',
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

const getAuthToken = () => 'Bearer ' + localStorage.getItem('token');