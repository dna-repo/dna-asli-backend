/*
Author : Hadi Gunawan
Tanggal mulai : 22 Juli 2022
Desc : Backend untuk aplikasi web crm inspektorat kab paluta
*/

// initial setup
const mongoose = require("mongoose");
const schema = mongoose.Schema;
// end initial setup

// made laporan model
const ktpSchema = new schema({
    NIK:Number,
    NAMA:String,
    JK:String,
    TMPT_LHR:String,
    TGL_LHR:String,
    NAMA_KEC:String,
    DESA_KEL:String,
});
// end made laporan model

const ktp3 = mongoose.model('ktp3', ktpSchema);
module.exports = ktp3;

