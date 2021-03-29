
export const Login = async (email, password) => {
    const response = await fetch('URL', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            email,
            password
        })
    });

    if(!response.ok) {
        throw new Error(response.status);
    }

    return response.json();
}

export const FacebookLogin = () => {

}

export const GoogleLogin = () => {

}

export const Register = () => {

}

export const ResetPassword = () => {
    
}