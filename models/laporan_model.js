/*
Author : Hadi Gunawan
Tanggal mulai : 16 Juni 2022
Desc : Backend untuk aplikasi web crm inspektorat kab paluta
*/

// initial setup
const mongoose = require("mongoose");
const schema = mongoose.Schema;
// end initial setup

// made laporan model
const laporanSchema = new schema({
    account: { // 1
        type: Object,
        required: true
    },
    status: { // 2
        type: String,
        required: true 
    },
    tiket: { // 3
        type: String,
        required: true
    },
    klasifikasi: { // 4
        type: String, 
        required: true
    },
    judul: { // 5
        type: String,
        required: true,
    },
    isi:{  // 6
        type: String,
        required: true
    },
    instansi_tujuan: { // 7
        type: String,
        required: true
    }, 
    file_lampiran: { // 8
        type: Array,
        required: true
    },
    isAnonim: { // 9
        type: String,
        required: true,
    },
    owner: { // 9 // untuk admin yang menangani laporan
        type: Object,
    },
    createdAt: String,
    updatedAt: String
    
});
// end made laporan model

const laporan = mongoose.model('laporans', laporanSchema);
module.exports = laporan;

