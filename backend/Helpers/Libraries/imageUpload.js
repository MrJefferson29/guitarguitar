const fs = require('fs');
const path = require('path');
const multer = require('multer');
const CustomError = require('../error/CustomError');

const ensureDirectoryExistence = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const rootDir = path.dirname(require.main.filename);
    let destinationPath;

    if (file.fieldname === 'photo') {
      destinationPath = path.join(rootDir, '/public/userPhotos');
    } else {
      destinationPath = path.join(rootDir, '/public/storyImages');
    }

    ensureDirectoryExistence(destinationPath);
    cb(null, destinationPath);
  },

  filename: function (req, file, cb) {
    if (file.fieldname === 'photo') {
      const extension = file.mimetype.split('/')[1];
      req.savedUserPhoto = 'photo_user_' + req.user.id + '.' + extension;
      cb(null, req.savedUserPhoto);
    } else {
      req.savedStoryImage = 'image_' + new Date().toISOString().replace(/:/g, '-') + file.originalname;
      cb(null, req.savedStoryImage);
    }
  },
});

const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/heic', 'image/heiv'];

  if (!allowedMimeTypes.includes(file.mimetype)) {
    return cb(new CustomError('Please provide a valid image file', 400), false);
  }

  cb(null, true);
};

const imageUpload = multer({ storage, fileFilter });

module.exports = imageUpload;