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
const surat_update_schema = new schema({
  surat: {
    // 1
    type: Object,
    required: true,
  },
  owner: {
    type: Object, // 2
    required: true,
  },
  message: {
    // 3
    type: String,
    required: true,
  },
  createdAt: String,
  updatedAt: String,
});
// end made tindak_lanjut model

const surat_update = mongoose.model("surat_update", surat_update_schema);
module.exports = surat_update;
