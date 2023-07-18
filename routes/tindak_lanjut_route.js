/*
Author : Hadi Gunawan
Tanggal mulai : sabtu, 25 Juni 2022
Desc : Backend untuk aplikasi web crm inspektorat kab paluta
*/

// initial setup
const express = require("express");
const router = express.Router();
const tindak_lanjut_controller = require("../controller/tindak_lanjut_controller");

// multer
const path = require("path");

const fs = require("fs");
const multer = require("multer");
// end intial setup

// setup multer untuk upload file laporan
var storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, path.join(__dirname, "../public/photo/file/keluar"));
  },
  filename: (req, file, cb) => {
    let date = new Date();
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
// end setup multer  untuk upload file laporan

// all user routes
router.get("/", tindak_lanjut_controller.index);

router.post("/store", upload.any("file"), tindak_lanjut_controller.store);
router.post("/show", tindak_lanjut_controller.show);
// end all user routes

module.exports = router;
