import multer from 'multer';

// Set storage options
const storage = multer.memoryStorage(); // or diskStorage if you want to store the file locally
const upload = multer({ storage });

export default upload;
