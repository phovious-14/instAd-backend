const multer = require("multer");
const path = require("path");

// Multer config
module.exports = multer({
  storage: multer.diskStorage({}),
  limits: {
    fieldNameSize: 600 // max field name size
  },
  fileFilter: (req, file, cb) => {

    let ext = path.extname(file.originalname);  
    if (ext !== ".pdf") {
      req.err1 = "Only supports .pdf format";
      cb(null, true, req.err1);
      return;
    }

    const fileSize = parseInt(req.headers['content-length']);
    // console.log(fileSize);
    if (fileSize > 1024 * 1024 * 2) {
      req.err2 = "File size is too large , 2mb is the maximum file size";
      cb(null, true, req.err2);
      return;
    }

    cb(null, true);
  },
});