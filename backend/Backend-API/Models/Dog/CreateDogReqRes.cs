using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend_API.Models.Dog
{
    public class CreateDogReqRes
    {
        public int Id { get; set; }
        public bool Success { get; set; }
        public string Error { get; set; }
    }
}
