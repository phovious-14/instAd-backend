const multer = require("multer");
const path = require("path");

// Multer config
module.exports = multer({
  storage: multer.diskStorage({}),
  limits: {
    fieldNameSize: 500
  },
  fileFilter: (req, file, cb) => {

    let ext = path.extname(file.originalname);  
    if (ext !== ".jpeg" && ext !== ".jpg" && ext !== ".png") {
      req.profileImageErr1 = "Only supports .png, .jpeg, .jpg format";
      cb(null, true, req.profileImageErr1);
      return;
    }

    const fileSize = parseInt(req.headers['content-length']);
    // console.log(fileSize);
    if (fileSize > 1024 * 1024 * 1) {
      req.profileImageErr2 = "File size is too large , 1mb is the maximum file size";
      cb(null, true, req.profileImageErr2);
      return;
    }
    
  },
});