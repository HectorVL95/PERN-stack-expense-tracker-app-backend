import streamifier from 'streamifier'
import { cloudinary } from '../config/cloudinary'

export const uploadToCloudinary = (file: Express.Multer.File , folder: string) => {
  return new Promise<string>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, resource_type: 'image' },
      (error, result) => {
        if (error) return reject(error);
        resolve (result?.secure_url || '')
      }
    )
    streamifier.createReadStream(file.buffer).pipe(stream)
  })
}