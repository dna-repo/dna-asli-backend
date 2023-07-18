/*
Author : Hadi Gunawan
Tanggal mulai : Jumat, 25 juli 2022
Desc : Backend untuk aplikasi web crm inspektorat kab paluta
*/


const express = require('express');
const router = express.Router();
const surat_controller = require("../controller/surat_controller")
// end intial setup


// all user routes
router.post('/store', surat_controller.store);
// end all user routes


module.exports = router;

