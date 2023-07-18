/*
Author : Hadi Gunawan
Tanggal mulai : Jumat, 22 juli 2022
Desc : Backend untuk aplikasi web crm inspektorat kab paluta
*/


// initial setup
const express = require('express');
const router = express.Router();
const surat_controller = require("../controller/surat_controller")
// end intial setup


// multer
const path = require("path");
const fs = require('fs');
const multer = require('multer')
// end intial setup



// setup multer untuk upload file laporan
var storage = multer.diskStorage({
    destination: (req, res, cb) => { 
      cb(null, path.join(__dirname, "../public/photo/surat"));
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
  var upload= multer({
    storage,
  });
// end setup multer  untuk upload file laporan


// all user routes
router.get('/', surat_controller.index);
router.post('/store', upload.any(), surat_controller.store);
router.post('/show', surat_controller.show);
router.post('/edit', upload.any(),surat_controller.edit);
router.post('/delete', surat_controller.destroy);
// end all user routes


module.exports = router;

