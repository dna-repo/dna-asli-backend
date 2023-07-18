/*
Author : Hadi Gunawan
Tanggal mulai : 25 Juli 2022
Desc : Backend untuk aplikasi web crm inspektorat kab paluta
*/

// initial setup
const mongoose = require("mongoose");
const schema = mongoose.Schema;
// end initial setup

// made laporan model
const suratSchema = new schema({
  owner: { type: Object, required: true },
  irban: { type: Object, required: true },
  surat: { type: Object, required: true },
  id_surat: { type: String, required: true },
  isi: { type: String, required: true },
  batas_waktu: { type: String, required: true },
  catatan : { type: String, required: true },
  sifat : { type: String, required: true },
  createdAt: String,
  updatedAt: String,
});
// end made laporan model

const surat_masuk = mongoose.model("disposisi", suratSchema);
module.exports = surat_masuk;
