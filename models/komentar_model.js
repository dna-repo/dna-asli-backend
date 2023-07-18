/*
Author : Hadi Gunawan
Tanggal mulai : 18 Juni 2022
Desc : Backend untuk aplikasi web crm inspektorat kab paluta
*/

// initial setup
const mongoose = require("mongoose");
const schema = mongoose.Schema;
// end initial setup

// made laporan model
const komentarSchema = new schema({
    account: { // 1
        type: Object,
        required: true
    },
    tanggal:{
        type:String,
        required: true
    },
    isi:{
        type:String,
        required:true
    },
    tiket:{
        type:String,
        required:true
    },
    createdAt: String,
    updatedAt: String
    
});
// end made laporan model

const komentar = mongoose.model('komentars', komentarSchema);
module.exports = komentar;

