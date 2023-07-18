/*
Author : Hadi Gunawan
Tanggal mulai : 09 Juni 2022
Desc : Backend untuk aplikasi web crm inspektorat kab paluta
*/

const path = require("path");
const multer = require("multer");

var storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, path.join(__dirname, "photo/profil"));
  },
  filename: (req, file, cb) => {
    let date = new Date();
    let ext = path.extname(file.originalname);
    cb(
      null,
      `${date.getDate()}${date.getMonth()}${date.getFullYear()}` +
        "-" +
        file.originalname
    );
  },
});

var upload = multer({
  storage,
});

module.exports = upload;
