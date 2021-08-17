import { saveUserDetails, setImageUrl, setMaxDistance } from '../store/actions/UserDetails';
import { Login, Register, UploadImage, UpdateMaxDistance } from './dataServices/userDataService';
import profilePicture from '../models/ProfilePicture';
import { validateEmail } from '../utilities/Utilities';

export const LoginEventHandler = async (email, password, dispacher) => {
    try {
        const userDetails = await Login(email, password);
        dispacher(saveUserDetails(userDetails));
        return true;
    } catch (error) {
        throw error;
    }
}

export const RegisterEventHandler = async (email, password, name, dispacher) => {
    try {
        const userDetails = await Register(email, password, name);
        dispacher(saveUserDetails(userDetails));
        return true;
    } catch (error) {
        throw error;
    }
}

export const uploadImageEventHandler = async (image, dispacher) => {
    const uriParts = image.uri.split('.');
    const fileType = uriParts[uriParts.length - 1];
    const profilePictureModel = new profilePicture(image.base64, fileType);

    try {
        const imageUrl = await UploadImage(profilePictureModel);
        dispacher(setImageUrl(imageUrl));
    } catch (error) {
        throw error;
    }
}

export const updateMaxDistance = async (maxDistance, dispacher) => {
    try {
        await UpdateMaxDistance(maxDistance);
        dispacher(setMaxDistance(maxDistance));
    } catch (error) {
        throw error;
    }
}

export const isValidEmail = email => {
    return validateEmail(email);
}

export const isValidPassword = password => {
    return password.length >= 6;
}

export const isValidName = name => {
    return name.length > 0;
}

