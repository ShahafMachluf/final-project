import { saveUserDetails } from '../store/actions/UserDetails';
import { Login, Register } from './dataServices/userDataService';

export const LoginEventHandler = (email, password, dispacher) => {
    return Login(email, password)
    .then(userDetails => {
        dispacher(saveUserDetails(userDetails));
        return true;
    })
    .catch(error => {
        throw error
    });
}

export const RegisterEventHandler = (email, password, name, dispacher) => {
    return Register(email, password, name)
    .then(userDetails => {
        dispacher(saveUserDetails(userDetails));
        return true;
    })
    .catch(error => {
        throw error;
    })
}