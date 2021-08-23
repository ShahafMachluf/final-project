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

export const getDogsByAreaHandler = async (area) => {
    const dogs = await dogDataService.getDogsByArea(area);
    return dogs;
}

export const GetLikedDogs = async () => {
    const dogs = await dogDataService.getLikedDogs();
    return dogs;
}

export const DeleteLikedDog = async (dogId) => {
    const dog = await dogDataService.deleteLikedDog(dogId);
    return dog;
}

export const GetMyDogs = async () => {
    const dogs = await dogDataService.getMyDogs();
    return dogs;
}

export const DeleteDog = async (dogId) => {
    const dog = await dogDataService.deleteDog(dogId);
    return dog;
}


