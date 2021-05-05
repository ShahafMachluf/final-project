using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend_API.Models.User
{
    public class UploadImageReq
    {
        public string ImageBase64 { get; set; }
        public string Type { get; set; }
    }
}
