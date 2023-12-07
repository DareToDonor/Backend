const { Storage } = require('@google-cloud/storage');

// Initialize Google Cloud Storage
const storage = new Storage({
  projectId: 'YOUR_PROJECT_ID',
  keyFilename: 'path/to/your/keyfile.json', // Replace with your key file
});

const bucketName = 'your-cloud-storage-bucket-name'; // Replace with your bucket name
const bucket = storage.bucket(bucketName);

const uploadFile = async (file) => {
  try {
    const fileName = Date.now() + '-' + file.originalname;
    const cloudFile = bucket.file(fileName);

    // Upload the file to the cloud storage bucket
    await cloudFile.createWriteStream().end(file.buffer);

    // Get the public URL of the uploaded file
    const publicUrl = `https://storage.googleapis.com/${bucketName}/${fileName}`;

    return { fileName, publicUrl };
  } catch (error) {
    console.error('Error uploading file:', error);
    throw new Error('Error uploading file to cloud storage');
  }
};

module.exports = { uploadFile };
