using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Threading.Tasks;

namespace Backend_API.Services.Interfaces
{
    public interface IFileService
    {
        Task<string> UploadImageFromBase64Async(string base64);
    }
}
