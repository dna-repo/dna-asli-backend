/*
Author : Hadi Gunawan
Tanggal mulai : Selasa, 24 juli 2022
Desc : Backend untuk aplikasi web crm inspektorat kab paluta
*/


// initial setup
const express = require('express');
const router = express.Router();
const disposisi_controller = require("../controller/disposisi_surat_controller")
// end intial setup

// all user routes
router.get('/', disposisi_controller.index);
router.post('/store', disposisi_controller.store);
router.post('/show', disposisi_controller.show);
router.post('/show_id', disposisi_controller.show_id);
router.post('/show_irban', disposisi_controller.show_irban);
router.post('/edit',disposisi_controller.edit);
router.post('/delete', disposisi_controller.destroy);
// end all user routes


module.exports = router;

