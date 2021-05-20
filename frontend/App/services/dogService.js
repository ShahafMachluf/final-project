import * as dogDataService from './dataServices/dogDataService';

export const ReactToDog = (dogId, reaction) => {
    return dogDataService.reactToDog({dogId, reaction})
}

export const createDogHandler = async (dog) => {
    const createdDog = await dogDataService.createDog(dog)
    return createdDog;
}

export const getAllDogsHandler = async () => {
    const dogs = await dogDataService.getAllDogs();
    return dogs;
}

export const GetLikedDogs = async () => {
    const dogs = await dogDataService.getLikedDogs();
    return dogs;
}