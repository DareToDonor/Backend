const multer = require("multer");
require('dotenv').config();
const { Storage } = require("@google-cloud/storage");

// Initialize Google Cloud Storage
const storage = new Storage({
  projectId: process.env.GCP_PROJECT_ID,
  keyFilename: process.env.GCP_KEYFILE_PATH, // Replace with your key file
});

const bucketName = process.env.GCP_BUCKET_NAME; // Replace with your bucket name
const bucket = storage.bucket(bucketName); 

// Multer configuration for handling file uploads
const upload = multer({
  storage: multer.memoryStorage(), // Store the file in memory before uploading to the cloud storage
});
 
const uploadFile = async (file,path) => {
  try {
    // const fileName = `${path}/${Date.now()}-${file.originalname}`;
    const fileName = `${path}/${Date.now()}-${file.originalname}`.replace(/\s/g, '');
    const cloudFile = bucket.file(fileName);

    // Upload the file to the cloud storage bucket
    await cloudFile.createWriteStream().end(file.buffer);

    // Get the public URL of the uploaded file
    const publicUrl = `https://storage.googleapis.com/${bucketName}/${fileName}`;

    return { fileName, publicUrl };
  } catch (error) {
    console.error("Error uploading file:", error);
    throw new Error("Error uploading file to cloud storage");
  }
};

module.exports = { upload, uploadFile };
