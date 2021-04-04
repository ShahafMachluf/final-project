
export const Get = async (url, headers = {}, options = {}) => { 
    const response = await fetch(url, {
        headers: {
            'Accept': 'application/json',
            ...headers
        },
        ...options
    });

    if(!response.ok) {
        throw new Error(response.status);
    }

    return response.json();
}

export const Post = async (url, body, headers = {}, options = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            ...headers
        },
        ...options,
        body: JSON.stringify(body)
    });

    if(!response.ok) {
        throw new Error(response.status);
    }

    return response.json();
}