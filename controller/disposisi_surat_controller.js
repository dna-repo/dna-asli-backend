/*
Author : Hadi Gunawan
Tanggal mulai : 27 juli 2022
Desc : Backend untuk aplikasi web crm inspektorat kab paluta
*/

// initial setup
const disposisi_surat = require("../models/disposisi_surat_models");

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


// start showing surat by id
const index = (req, res, next) => {
  logger(req);
  checkAuth(req,res);

  disposisi_surat.find((err, rst) => {
    if (err) {
      res.status(500).json({
        status: "Gagal",
        message: "Gagal mengambil semua disposisi",
        data: err,
      });
    } else if (rst) {
      res.status(200).json({
        status: "Berhasil",
        message: "berhasil mengambil semua disposisi",
        data: rst,
      });
    }
  });
};
// end showing surat by id


const store = (req, res, next) => {
  logger(req);
  checkAuth(req,res);

  let new_disposisi = new disposisi_surat({
    owner: JSON.parse(req.body.owner),
    irban: JSON.parse(req.body.irban),
    surat: JSON.parse(req.body.surat),
    id_surat: req.body.id_surat,
    isi: req.body.isi,
    batas_waktu: req.body.batas_waktu,
    catatan: req.body.catatan,
    sifat: req.body.sifat,
    createdAt: moment().format("LLLL"),
    updatedAt: moment().format("LLLL"),
  });

  new_disposisi
    .save()
    .then((response) => {
      res.status(200).json({
        status: "Berhasil",
        message: "berhasil simpan disposisi",
        data: response,
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: "Gagal",
        message: "Gagal simpan disposisi",
        data: err,
      });
    });
};

const edit = (req, res, next) => {
  const token = req.headers.authorization;
  // apakah ada token, jika tidak ada tolak
  if (!token) {
    return res
      .status(401)
      .json({ message: "Auth not found | Anda tidak punya hak akses" });
  }

  var disposisiUpdate = {
    owner: JSON.parse(req.body.owner),
    irban: JSON.parse(req.body.irban),
    irban: JSON.parse(req.body.irban),
    isi: req.body.isi,
    batas_waktu: req.body.batas_waktu,
    catatan: req.body.catatan,
    sifat: req.body.sifat,
    createdAt: moment().format("LLLL"),
  };

  disposisi_surat.findByIdAndUpdate(req.body.id, disposisiUpdate, (err, rst) => {
    console.log(disposisiUpdate)
    console.log("edit")
    if (err) {
      console.log("edit gagal")
      res.status(500).json({
        status: "Gagal",
        message: "Gagal update disposisi",
        data: err,
      });
    } else if (rst) {
      console.log("edit berhasil")
      res.status(200).json({
        status: "berhasil",
        message: "berhasil update disposisi",
        data: disposisiUpdate,
      });
    }
  });
};

// start showing surat by id
const show = (req, res, next) => {
  logger(req);
  checkAuth(req,res);

  let id = req.body.id;
  disposisi_surat.find({id_surat : id}, (err, rst) => {
    if (err) {
      res.status(500).json({
        status: "Gagal",
        message: "Gagal mengambil disposisi dengan id " + id,
        data: err,
      });
    } else if (rst) {
      res.status(200).json({
        status: "Berhasil",
        message: "berhasil mengambil disposisi dengan id " + id,
        data: rst,
      });
    }
  });
};
// end showing surat by id

// start showing surat by id
const show_id = (req, res, next) => {
  logger(req);
  checkAuth(req,res);

  let id = req.body.id;
  disposisi_surat.findById({_id : id}, (err, rst) => {
    if (err) {
      res.status(500).json({
        status: "Gagal",
        message: "Gagal mengambil disposisi dengan id " + id,
        data: err,
      });
    } else if (rst) {
      res.status(200).json({
        status: "Berhasil",
        message: "berhasil mengambil disposisi dengan id " + id,
        data: rst,
      });
    }
  });
};
// end showing surat by id

// start showing surat by id
const show_irban = (req, res, next) => {
  logger(req);
  checkAuth(req,res);

  let id = req.body.id;
  console.log(id)
  disposisi_surat.find({'irban._id': {$in: [id]}}, (err, rst) => {
    console.log("mencari")
    if (err) {
      console.log("mencari ggl")
      res.status(500).json({
        status: "Gagal",
        message: "Gagal mengambil disposisi dengan id " + id,
        data: err,
      });
    } else if (rst) {
      console.log("mencari berhasil")
      console.log(rst)
      res.status(200).json({
        status: "Berhasil",
        message: "berhasil mengambil disposisi dengan id " + id,
        data: rst,
      });
    }
  });
};
// end showing surat by id

const destroy = (req, res, next) => {
  logger(req);
  checkAuth(req,res);

  let id = req.body.id;
  disposisi_surat.findByIdAndDelete(id, (err, rst) => {
    if (err) {
      res.status(500).json({
        status: "Gagal",
        message: "Gagal menghapus disposisi dengan id " + id,
        data: err,
      });
    } else if (rst) {
      res.status(200).json({
        status: "Berhasil",
        message: "berhasil menghapus disposisi dengan id " + id,
        data: rst,
      });
    }
  });
};

module.exports = {
  index,
  store,
  show,
  show_id,
  show_irban,
  edit,
  destroy,
};

