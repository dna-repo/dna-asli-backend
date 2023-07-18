/*
Author : Hadi Gunawan
Tanggal mulai : Jumat, 17 Juni 2022
Desc : Backend untuk aplikasi web crm inspektorat kab paluta
*/


// initial setup
const express = require('express');
const router = express.Router();
const laporan_controller = require('../controller/laporan_controller')

// multer
const path = require("path");
const fs = require('fs');
const multer = require('multer')
// end intial setup


// setup multer untuk upload file laporan
var storage = multer.diskStorage({
    destination: (req, res, cb) => { 
      cb(null, path.join(__dirname, "../public/photo/file/masuk"));
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
router.get('/', laporan_controller.index);

router.post('/show', laporan_controller.show);
router.get('/show_pengaduan', laporan_controller.show_pengaduan);
router.post('/show_by_tiket', laporan_controller.show_by_tiket);

router.post('/update_owner', laporan_controller.update_owner);

router.post('/store',upload.any('file_lampiran') , laporan_controller.store);

router.get('/show_pengaduan_perceraian' , laporan_controller.show_pengaduan_perceraian);
router.get('/show_permintaan_informasi' , laporan_controller.show_Permintaan_informasi);
router.get('/show_aspirasi' , laporan_controller.show_aspirasi);

router.post('/update_status' , laporan_controller.update_status_laporan);
// end all user routes


module.exports = router;

