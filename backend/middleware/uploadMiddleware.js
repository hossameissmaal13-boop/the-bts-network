const multer = require("multer");
const path = require("path");
const fs = require("fs");

const uploadPath = "uploads/";

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  const allowedExt = /pdf|doc|docx|ppt|pptx|xls|xlsx|jpg|jpeg|png/;
  const extname = allowedExt.test(path.extname(file.originalname).toLowerCase());

  if (extname) cb(null, true);
  else cb(new Error("File type not allowed"));
};

const upload = multer({ storage, fileFilter });

module.exports = upload;