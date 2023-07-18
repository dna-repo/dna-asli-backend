/*
Author : Hadi Gunawan
Tanggal mulai : 18 Juni 2022
Desc : Backend untuk aplikasi web crm inspektorat kab paluta
*/

// initial setup
const komentar = require("../models/komentar_model");

// setup moment.js
const moment = require("moment");
// end initial setup

function logger (req){
  console.log(moment().format("LLLL"));
  console.log(req.headers);
  console.log(req.method);
  console.log(req.body);
  var ip = req.headers['x-forwarded-for'] ||
  req.socket.remoteAddress ||
  null;
  console.log(ip)
  console.log(`\n`);
}
function checkAuth(req) {
  const token = req.headers.authorization;
  // apakah ada token, jika tidak ada tolak
  if (!token) {
    return res
      .status(401)
      .json({ message: "Auth not found | Anda tidak punya hak akses" });
  }
}

// ambil list komentar
const index = (req, res, next) => {
  logger(req);
  checkAuth(req);

  komentar.find().then((rst) => {
    res
      .status(200)
      .json({
        status: "berhasil ambil semua komentar",
        data: rst,
      })
      .catch((err) => {
        res.status(204).json({
          status: "data tidak ditemukan",
          data: err,
        });
      });
  });
};
// end ambil list komentar

// showing laporan by id
const show = (req, res, next) => {
  logger(req);
  checkAuth(req);
 let tiket = req.body.tiket
  komentar.find({ tiket: tiket }, (err, rst) => {
    if (rst) {
      res.status(200).json({
        status: "berhasil ambil koementar dengan tiket - " + tiket,
        data: rst,
      });
    } else {
      res.status(204).json({
        status: "tidak ditemukan komentar dengan tiket - " + tiket,
        data: err,
      });
    }
  });
};
// end showing laporan by id

// store laporan
const store = (req, res, next) => {
  logger(req);
  checkAuth(req);

  let new_komentar = new komentar({
    account: req.body.account,
    tanggal:  moment().format("LLLL"),
    tiket: req.body.tiket,
    isi: req.body.isi,
  });

  new_komentar.save((err, doc) => {
    if (err) {
      console.log("gagal"),
        res.status(200).json({
          status: "gagal kirim komentar",
        });
    } else {
      console.log("berhasil");
      res.status(200).json({
        status: "berhasil tambah komentar baru",
        data: new_komentar,
      });
    }
  });
};
// end store laporan

// store laporan
const update = (req, res, next) => {};
// end store laporan

module.exports = {
  index, // done
  show, // done
  store, // done
  update,
};

