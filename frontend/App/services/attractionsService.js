import {getAllAttractions, getAttractionsWithSameType} from './dataServices/attractionsDataService';


export const getAttractions = async () => {
    try {
        const attractions = await getAllAttractions();
        return attractions;
    }
    catch (error) {
        throw error;
    }
}

export const getAttractionByType = async (type) => {
    try {
        const attractions = await getAttractionsWithSameType(type);
        return attractions;
    }
    catch (error) {
        throw error;
    }
}