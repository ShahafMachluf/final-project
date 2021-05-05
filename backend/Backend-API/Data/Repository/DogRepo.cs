using Backend_API.Models.DbModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend_API.Data.Repository
{
    public class DogRepo: IDogRepo
    {
        private readonly AppDbContext _appDbContext;
        public DogRepo(AppDbContext appDbContext)
        {
            this._appDbContext = appDbContext;
        }

        public async Task CreateDogAsync(Dog dog)
        {
            if(dog == null)
            {
                throw new ArgumentException("null dog");
            }
            await _appDbContext.Dogs.AddAsync(dog);
        }

        public IEnumerable<Dog> getAllDogs()
        {
            return _appDbContext.Dogs.ToList();
        }

        public IEnumerable<Dog> getAllDogs(int idOfClient)//reciving idOfClient from frontend, depends us how
        {//
            IEnumerable<Dog> dogsList = _appDbContext.Dogs;
           return  getOwnerDogs(idOfClient);
        }

        private IEnumerable<Dog> getOwnerDogs(int i_IdOfClient)//Move function To Service?..
        {
           List<Dog> dogsList =  new List<Dog>();
            foreach (Dog dog in dogsList)
            {
                if ((int.Parse(dog.OwnerId)) == i_IdOfClient)
                {
                    dogsList.Add(dog);
                }
            }

            return dogsList;
        }

        //private getDogsByOwnerId(int idOfClient)
        //{

        //}

        public Dog GetDogById(int id)// Need to see how you Will have the id of the dog on the front end - or doing it diffrently 
        {
          return _appDbContext.Dogs.FirstOrDefault(p => p.Id == id);//First object with id equal to paramter id )
        }

        public async Task<bool> SaveChangesAsync()
        {
            return await _appDbContext.SaveChangesAsync() >= 0;
        }

       

    }
}
