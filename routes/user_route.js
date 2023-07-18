/*
Author : Hadi Gunawan
Tanggal mulai : 09 Juni 2022
Desc : Backend untuk aplikasi web crm inspektorat kab paluta
*/

// initial setup
const express = require('express');
const router = express.Router();
const user_controller = require('../controller/user_controller');
const public = require('../public/upload');
// end intial setup

// all user routes
router.get('/', user_controller.index);

router.post('/show', user_controller.show);
router.get('/show_irban', user_controller.show_irban);

router.post('/store', user_controller.store);
router.post('/updateProfil', public.single('photo_profil'), user_controller.updatePhoto);
router.post('/update', user_controller.update);
router.post('/delete', user_controller.destroy);

router.get('/fo_irban', user_controller.indexFoIr);


router.get('/verify', user_controller.verify);
router.post('/send_mail', user_controller.send_email);
router.post('/reset_password', user_controller.reset_password);
router.post('/new_password', user_controller.new_password);
// end all user routes


module.exports = router;

