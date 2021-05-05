import {createDog, getAllDogs} from './dataServices/dogDataService';
export const GetNextDog = () => {

}

export const LikeDog = () => {
    
}

export const createDogHandler = (dog) => {
    return createDog(dog)
    .then(dog =>{
        console.log(dog)
    })
    .catch(error => {
        throw error
    });
}

export const getAllDogsHandler = () => {
    return getAllDogs()
}