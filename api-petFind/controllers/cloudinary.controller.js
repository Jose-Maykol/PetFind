const cloudinaryUploader = require('../config/cloudinary.config')

const uploadToCloudinary = async (file) => {
  return new Promise((resolve, reject) => {
    cloudinaryUploader.uploader.upload(file.path, { folder: 'petfind' }, (error, result) => {
      if (error) {
        reject(error)
      } else {
        resolve(result.secure_url)
      }
    })
  })
}

const deleteFromCloudinary = async (fileUrl) => {
  return new Promise((resolve, reject) => {
    cloudinaryUploader.uploader.destroy(fileUrl, (error, result) => {
      if (error) {
        reject(error)
      } else {
        resolve(result)
      }
    })
  })
}

module.exports = {
  uploadToCloudinary,
  deleteFromCloudinary
}
