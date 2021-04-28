import {createDog} from './dataServices/dogDataService';
export const GetNextDog = () => {

}

export const LikeDog = () => {
    
}

export const createDogHandler = (ownerId ,name, age, race, color, gender) => {
    return createDog(ownerId, name, age, race, color, gender)
    .then(dog =>{console.log(dog)})
    .catch(error => {
        throw error
    });
}