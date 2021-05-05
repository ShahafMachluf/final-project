import { saveUserDetails, setImageUrl } from '../store/actions/UserDetails';
import { Login, Register, UploadImage } from './dataServices/userDataService';
import profilePicture from '../models/ProfilePicture';

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

export const uploadImageEventHandler = (image, dispacher) => {
    const uriParts = image.uri.split('.');
    const fileType = uriParts[uriParts.length - 1];
    const profilePictureModel = new profilePicture(image.base64, fileType);

    UploadImage(profilePictureModel).then(imageUrl => {
        dispacher(setImageUrl(imageUrl));
    })
    .catch(err => {
        console.log(err);
    })
}