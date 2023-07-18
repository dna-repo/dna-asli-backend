/*
Author : Hadi Gunawan
Tanggal mulai : 22 juli 2022
Desc : Backend untuk aplikasi web crm inspektorat kab paluta
*/

// initial setup
const ktp1 = require("../models/ktp_model1");
const ktp2 = require("../models/ktp_model2");
const ktp3 = require("../models/ktp_model3");

// setup moment.js
const moment = require("moment");
//end initial setup



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

// start showing laporan by id
const show = (req, res, next) => {
  logger(req);
  checkAuth(req,res);
console.log("check ktp")

  let nik = req.body.nik.toString();
  ktp1.find({ NIK: nik }, (err, rst) => {
    if (err) {
      res.status(500),
        json({
          status: "Error",
          message: "Gagal mengambil data | 1",
          data: err,
        });
    } else if (rst) {
      if (rst.length == 0) {
        // start jika data 0 - 1
        ktp2.find({ NIK: nik }, (err, rst) => {
          if (err) {
            res.status(500),
              json({
                status: "Error",
                message: "Gagal mengambil data | 2",
                data: err,
              });
          } else if (rst) {
            if (rst.length == 0) {
              // start jika data 0 - 3
              ktp3.find({ NIK: nik }, (err, rst) => {
                if (err) {
                  res.status(500),
                    json({
                      status: "Error",
                      message: "Gagal mengambil data",
                      data: err,
                    });
                } else if (rst) {
                  if (rst.length == 0) {
                    res.status(200).json({
                      status: "Kosong",
                      message: "Data kosong",
                      data: rst,
                    });
                  } else {
                    res.status(200).json({
                      status: "Berhasil",
                      message: "Berhasil menemukan data nik - lembar 3",
                      data: rst,
                    });
                  }
                }
              });
              // end jika data 0 - 3
            } else {
              res.status(200).json({
                status: "Berhasil",
                message: "Berhasil menemukan data nik - lembar 2",
                data: rst,
              });
            }
          }
        });
        // end jika data 0 - 1
      } else {
        res.status(200).json({
          status: "Berhasil",
          message: "Berhasil menemukan data nik - lembar 1",
          data: rst,
        });
      }
    }
  });
};
// end showing laporan by id

module.exports = {
  show,
};

