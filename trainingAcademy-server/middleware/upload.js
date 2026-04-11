const multer = require("multer")
const { CloudinaryStorage } = require("multer-storage-cloudinary")
const cloudinary = require("../config/cloudinary")

const courseStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "courses",
    allowed_formats: ["jpg", "png", "jpeg", "webp"]
  }
})

const paymentStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "payment-slips",
    allowed_formats: ["jpg", "png", "jpeg", "webp", "pdf"]
  }
})

const uploadCourse = multer({ storage: courseStorage })
const uploadPayment = multer({ storage: paymentStorage })

module.exports = { uploadCourse, uploadPayment }