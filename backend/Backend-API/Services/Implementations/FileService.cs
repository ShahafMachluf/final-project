using Backend_API.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using CloudinaryDotNet.Actions;
using CloudinaryDotNet;

namespace Backend_API.Services.Implementations
{
    public class FileService : IFileService
    {
        public async Task<string> UploadImageFromBase64Async(string base64)
        {
            Cloudinary cloudinaryService = new Cloudinary();
            byte[] imageBytes = Convert.FromBase64String(base64);
            Stream stream = new MemoryStream(imageBytes);

            var uploadParams = new ImageUploadParams()
            {
                File = new FileDescription("img", stream)
            };
            
            ImageUploadResult uploadResult = await cloudinaryService.UploadAsync(uploadParams);

            return uploadResult.SecureUrl.OriginalString;
        }

        public async Task<bool> DeleteImage(string imageUrl)
        {
            Cloudinary cloudinaryService = new Cloudinary();
            string[] imageUrlParts = imageUrl.Split("/");
            string imageId = imageUrlParts[imageUrlParts.Length - 1].Split(".")[0];

            var result = await cloudinaryService.DeleteResourcesAsync(ResourceType.Image, imageId);
            return result.DeletedCounts.Count > 0;
        }
    }
}
