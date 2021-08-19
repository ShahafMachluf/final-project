export default class Dog {
    constructor(ownerId ,name, age, race, color, gender, size, area, checkBoxItems, information, imageBase64)
    {
        this.ownerId = ownerId;
        this.name = name;
        this.age= age; 
        this.race = race; 
        this.color = color; 
        this.gender = gender;
        this.size = size; 
        this.area = area; 
        this.isVaccinated = false;
        this.isNeutered = false;
        this.information = information;
        this.imageBase64 = imageBase64;

        if(checkBoxItems.length === 2){
            this.isVaccinated = true;
            this.isNeutered = true;
        }
        else if(checkBoxItems.length === 1){
            this.isVaccinated = checkBoxItems[0].value === 'Vaccinated';
            this.isNeutered = checkBoxItems[0].value === 'Neutered';
        }
    }
}