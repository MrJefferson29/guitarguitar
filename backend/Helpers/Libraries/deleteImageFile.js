const path = require("path")
const fs = require("fs")

const deleteImageFile = (req) => {
    const filePath = req.savedStoryImage ? path.join(__dirname, "/public/storyImages/", req.savedStoryImage) : null;
  
    if (filePath && fs.existsSync(filePath)) {
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error(`Error deleting file: ${err}`);
        } else {
          console.log(`Successfully deleted file: ${filePath}`);
        }
      });
    }
  };

module.exports = deleteImageFile