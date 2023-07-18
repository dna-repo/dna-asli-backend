/*
Author : Hadi Gunawan
Tanggal mulai : 25 juli 2022
Desc : Backend untuk aplikasi web crm inspektorat kab paluta
*/

// initial setup
const surat_update = require("../models/surat_update_models");

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



const store = (req, res, next) => {
  logger(req)
  checkAuth(req,res)

  let new_surat = new surat_update({
    surat: req.body.surat,
    owner: req.body.owner,
    message: req.body.message,
    createdAt: moment().format("LLLL"),
    updatedAt: moment().format("LLLL"),
  });

  new_surat
    .save()
    .then((response) => {
      res.status(200).json({
        status: "Berhasil",
        message: "berhasil simpan update",
        data: response,
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: "Gagal",
        message: "Gagal simpan update",
        data: err,
      });
    });
};

module.exports = {
  store,
};

