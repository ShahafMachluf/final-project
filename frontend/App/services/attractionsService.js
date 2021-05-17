import {getAllAttractions} from './dataServices/attractionsDataService';

export const getAttractions = async () => {
    try {
        const attractions = await getAllAttractions();
        return attractions;
    }
    catch (error) {
        throw error;
    }
}