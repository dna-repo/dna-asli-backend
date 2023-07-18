/*
Author : Hadi Gunawan
Tanggal mulai : 16 Juni 2022
Desc : Backend untuk aplikasi web crm inspektorat kab paluta
*/

// initial setup
const tindak_lanjut = require("../models/tindak _lanjut_model");

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
function checkAuth(req,res){
  const token = req.headers.authorization;
  // apakah ada token, jika tidak ada tolak
  if (!token) {
    return res
      .status(401)
      .json({ message: "Auth not found | Anda tidak punya hak akses" });
  }
}



// show list of laporan
const index = (req, res, next) => {
  logger(req)
  checkAuth(req,res)
  tindak_lanjut
    .find()
    .then((response) => {
      res
        .status(200)
        .json({
          satus: "Berhasil",
          message: "Berhasil ambil tindakan lanjut",
          data: response,
        });
    })
    .catch((err) => {
      res.status(500).json({
        status: "Gagal",
        message: "Gagal mengambil tindakan lanjut",
        data: err,
      });
    });
};
// end show list of laporan

// store laporan
const store = (req, res, next) => {
  logger(req)
  checkAuth(req,res)
  let date = new Date();
  let new_tindak_lanjut = new tindak_lanjut({
    laporan: JSON.parse(req.body.laporan),
    owner: JSON.parse(req.body.owner),
    tindak_lanjut: req.body.tindak_lanjut,
    tiket: req.body.tiket,
    tipe: req.body.tipe,
    createdAt: moment().format("LLLL"),
    updatedAt: moment().format("LLLL"),
  });

  // saving lampiran if exist
  console.log(req.body);
  console.log(req.files);
  if (req.files) {
    for (let data of req.files) {
      new_tindak_lanjut.file.unshift(
        `${date.getDate()}${date.getMonth()}${date.getFullYear()}` +
          "-" +
          data.originalname
      );
    }
  }
  new_tindak_lanjut
    .save()
    .then(() => {
      res.status(200).json({
        status: "Berhasil",
        message: "Berhasil tambah tindak lanjut baru",
        data: new_tindak_lanjut,
      });
      res.end();
    })
    .catch((err) => {
      res.status(500).json({
        status: "Gagal",
        message: "Gagal menambah tindak lanjut baru",
        data: err,
      });
      res.end();
    });
};
// end store laporan
const show = (req, res, next) => {
  logger(req)
  checkAuth(req,res)
  let tiket = req.body.tiket
  tindak_lanjut
    .find({ tiket : tiket})
    .then((response) => {
      res
        .status(200)
        .json({
          satus: "Berhasil",
          message: "Berhasil ambil tindakan lanjut",
          data: response,
        });
    })
    .catch((err) => {
      res.status(500).json({
        status: "Gagal",
        message: "Gagal mengambil tindakan lanjut",
        data: err,
      });
    });
};
// end showing laporan by id

// store laporan
const update = (req, res, next) => {};
// end store laporan

module.exports = {
  index,
  store,
  show,
  update,
};

