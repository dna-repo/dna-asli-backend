/*
Author : Hadi Gunawan
Tanggal mulai : 25 juli 2022
Desc : Backend untuk aplikasi web crm inspektorat kab paluta
*/

// initial setup
const surat_model = require("../models/surat_model.js");

// setup moment.js
const moment = require("moment");
// end initial setup

function logger (req){
  console.log(`.\n.`);
  console.log(moment().format('MMMM Do YYYY, h:mm:ss a'));
  console.log(moment().format("LLLL"));
  console.log(req.headers);
  console.log(req.method);
  console.log(req.body);
  var ip = req.headers['x-forwarded-for'] ||
  req.socket.remoteAddress ||
  null;
  console.log(ip);
  console.log(`.\n.`);
}
function checkAuth(req,res) {
  const token = req.headers.authorization;
  // apakah ada token, jika tidak ada tolak
  if (!token) {
    return res
      .status(401)
      .json({ message: "Auth not found | Anda tidak punya hak akses" });
  }
}

const index = (req, res, next) => {
  logger(req);
  checkAuth(req,res);

  surat_model
    .find()
    .then((response) => {
      res.status(200).json({
        status: "Berhasil",
        message: "berhasil ambil data surat masuk",
        data: response,
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: "Gagal",
        message: "Gagal menghapus data surat masuk",
        data: err,
      });
    });
};

const store = (req, res, next) => {
  logger(req);
  checkAuth(req,res);

  let new_surat = new surat_model({
    klasifikasi: req.body.klasifikasi,
    no_agenda: req.body.no_agenda,
    asal_surat: req.body.asal_surat,
    no_surat: req.body.no_surat,
    kode_klasifikasi: req.body.kode_klasifikasi,
    indeks_berkas: req.body.indeks_berkas,
    tanggal_surat: req.body.tanggal_surat,
    isi_ringkas: req.body.isi_ringkas,
    keterangan: req.body.keterangan,
    owner: JSON.parse(req.body.owner),
    createdAt: moment().format("LLLL"),
    updatedAt: moment().format("LLLL"),
  });

  let date = new Date();
  if (req.files) {
    for (let data of req.files) {
      new_surat.file =
        `${date.getDate()}${date.getMonth()}${date.getFullYear()}` +
        "-" +
        data.originalname;
    }
  }

  new_surat
    .save()
    .then((response) => {
      res.status(200).json({
        status: "Berhasil",
        message: "berhasil simpan",
        data: response,
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: "Gagal",
        message: "Gagal simpan",
        data: err,
      });
    });
};

const edit = (req, res, next) => {
  logger(req);
  checkAuth(req,res);

  var suratUpdate = {
    no_agenda: req.body.no_agenda,
    asal_surat: req.body.asal_surat,
    no_surat: req.body.no_surat,
    kode_klasifikasi: req.body.kode_klasifikasi,
    indeks_berkas: req.body.indeks_berkas,
    tanggal_surat: req.body.tanggal_surat,
    isi_ringkas: req.body.isi_ringkas,
    keterangan: req.body.keterangan,
    updatedAt: moment().format("LLLL"),
  };

  let date = new Date();
  if (req.files) {
    for (let data of req.files) {
      suratUpdate.file =
        `${date.getDate()}${date.getMonth()}${date.getFullYear()}` +
        "-" +
        data.originalname;
    }
  }

  surat_model.findByIdAndUpdate(req.body.id, suratUpdate, (err, rst) => {
    if (err) {
      res.status(500).json({
        status: "Gagal",
        message: "Gagal update surat",
        data: err,
      });
    } else if (rst) {
      res.status(200).json({
        status: "berhasil",
        message: "berhasil update surat",
        data: suratUpdate,
      });
    }
  });
};

// start showing surat by id
const show = (req, res, next) => {
  logger(req)
  checkAuth(req,res)

  let id = req.body.id;
  surat_model.findById(id, (err, rst) => {
    if (err) {
      res.status(500).json({
        status: "Gagal",
        message: "Gagal mengembil data dengan id " + id,
        data: err,
      });
    } else if (rst) {
      res.status(200).json({
        status: "Berhasil",
        message: "berhasil ambil data dengan id " + id,
        data: rst,
      });
    }
  });
};
// end showing surat by id

const destroy = (req, res, next) => {
  logger(req)
  checkAuth(req,res)

  let id = req.body.id;
  surat_model.findByIdAndDelete(id, (err, rst) => {
    if (err) {
      res.status(500).json({
        status: "Gagal",
        message: "Gagal menghapus data dengan id " + id,
        data: err,
      });
    } else if (rst) {
      res.status(200).json({
        status: "Berhasil",
        message: "berhasil menghapus data dengan id " + id,
        data: rst,
      });
    }
  });
};

module.exports = {
  index,
  store,
  show,
  edit,
  destroy,
};
