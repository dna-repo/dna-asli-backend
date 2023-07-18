/*
Author : Hadi Gunawan
Tanggal mulai : 25 Juni 2022
Desc : Backend untuk aplikasi web crm inspektorat kab paluta
*/

// initial setup
const mongoose = require("mongoose");
const schema = mongoose.Schema;
// end initial setup

// made tindak_lanjut model
const tindak_lanjut_schema = new schema({
  laporan: {
    // 1
    type: Object,
    required: true,
  },
  owner: {
    type: Object, // 2
    required: true,
  },
  tiket: {
    type: String, // 2
    required: true,
  },
  tindak_lanjut: {
    // 3
    type: String,
    required: true,
  },
  file: {
    // 4
    type: Array,
    required: true,
  },
  tipe: {
    type: String,
  },
//   isPublic: {
//     type: Boolean,
//     required: true,
//   },
  createdAt: String,
  updatedAt: String,
});
// end made tindak_lanjut model

const tindak_lanjut_ = mongoose.model("tindak_lanjuts", tindak_lanjut_schema);
module.exports = tindak_lanjut_;
