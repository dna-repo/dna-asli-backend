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
  klasifikasi: { type: String, required: true },
  no_agenda: { type: String, required: true },
  asal_surat: { type: String, required: true },
  no_surat: { type: String, required: true },
  kode_klasifikasi: { type: String, required: true },
  indeks_berkas: { type: String, required: true },
  tanggal_surat: { type: String, required: true },
  isi_ringkas: { type: String, required: true },
  keterangan: { type: String, required: true },
  file: { type: String, required: true },
  owner: { type: Object, required: true },
  createdAt: String,
  updatedAt: String,
});
// end made laporan model

const surat_masuk = mongoose.model("surat", suratSchema);
module.exports = surat_masuk;
