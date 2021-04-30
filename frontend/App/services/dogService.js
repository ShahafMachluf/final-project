import {createDog} from './dataServices/dogDataService';
export const GetNextDog = () => {

}

export const LikeDog = () => {
    
}

export const createDogHandler = (dog) => {
    return createDog(dog)
    .then(dog =>{console.log(dog)})
    .catch(error => {
        throw error
    });
}