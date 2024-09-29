import { CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, CLOUDINARY_CLOUD_NAME } from '$env/static/private';
import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier';

export async function upload_to_cloudinary_as_stream(public_id: string, file: File) {
  cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET
  });

  const buffer = Buffer.from(await file.arrayBuffer());

  return new Promise((resolve, reject) => {
    const cld_upload_stream = cloudinary.uploader.upload_stream(
      { resource_type: 'image', folder: 'profile', public_id },
      (error, result) => {
        if (result) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    );

    streamifier.createReadStream(buffer).pipe(cld_upload_stream);
  });
}
