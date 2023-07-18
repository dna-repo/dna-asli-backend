/*
Author : Hadi Gunawan
Tanggal mulai : 16 Juni 2022
Desc : Backend untuk aplikasi web crm inspektorat kab paluta
*/

// initial setup
const laporan = require("../models/laporan_model");

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

// show list of laporan
const index = (req, res, next) => {
  logger(req);
  checkAuth(req,res);

  laporan
    .find()
    .then((response) => {
      res
        .status(200)
        .json({ status: "berhasil ambil data semua laporan", data: response });
    })
    .catch((err) => {
      res.status(500).json({
        status: "an error occured! | gagal ambil semua pengguna",
        message: err,
      });
    });
};
// end show list of laporan

// start showing list of permintaan infomasi
const show_Permintaan_informasi = (req, res, next) => {
  logger(req);
  checkAuth(req,res);

  laporan.find({ klasifikasi: "permintaan informasi" }, (err, rst) => {
    if (rst) {
      res.status(200).json({
        status: "Berhasil",
        message: "Berhasil mengambil list data laporan dengan klasifikasi permintaan informasi",
        data: rst
    })
    } else {
      res.status(500).json({
        status: "Gagal",
        message: "Gagal mengambil list data laporan dengan klasifikasi permintaan informasi",
        data: err
    })
    }
  });
};
// end showing list of permintaan informasi

// start showing list of permintaan infomasi
const show_pengaduan = (req, res, next) => {
  logger(req);
  checkAuth(req,res);

  laporan.find({ klasifikasi: "pengaduan" }, (err, rst) => {
    if (rst) {
      res.status(200).json({
        status: "Berhasil",
        message: "Berhasil mengambil list data laporan dengan klasifikasi pengaduan",
        data: rst
    })
    } else {
      res.status(500).json({
        status: "Gagal",
        message: "Gagal mengambil list data laporan dengan klasifikasi pengaduan",
        data: err
    })
    }
  });
};
// end showing list of permintaan informasi

// start showing list of permintaan infomasi
const show_pengaduan_perceraian = (req, res, next) => {
  logger(req);
  checkAuth(req,res);

  laporan.find({
    $or: [
        {klasifikasi: "pengaduan"},
        {klasifikasi: "perceraian"}
        // ...
    ]
}, (err, rst) => {
    if (rst) {
      res.status(200).json({
        status: "Berhasil",
        message: "Berhasil mengambil list data laporan dengan klasifikasi permintaan informasi",
        data: rst
    })
    } else {
      res.status(500).json({
        status: "Gagal",
        message: "Gagal mengambil list data laporan dengan klasifikasi permintaan informasi",
        data: err
    })
    }
  });
};
// end showing list of permintaan informasi

// start showing list of aspirasi
const show_aspirasi = (req, res, next) => {
  logger(req);
  checkAuth(req,res);

  laporan.find({ klasifikasi: "aspirasi" }, (err, rst) => {
    if (rst) {
      res.status(200).json({
        status: "Berhasil",
        message: "Berhasil mengambil list data laporan dengan klasifikasi aspirasi",
        data: rst
    })
    } else {
      res.status(500).json({
        status: "Gagal",
        message: "Gagal mengambil list data laporan dengan klasifikasi aspirasi",
        data: err
    })
    }
  });
};
// end showing list of aspirasi

// start showing laporan by id
const show = (req, res, next) => {
  logger(req);
  checkAuth(req,res);

  laporan.findById(req.body.id, (err, rst) => {
    if (rst) {
      res.status(200).json({
        status: "berhasil ambil laporan dengan id - " + req.body.id,
        data: rst
    })
    } else {
      res.status(500).json({
        status: "gagal ambil laporan dengan id - " + req.body.id,
        data: err
    })
    }
  });
};
// end showing laporan by id

// start showing laporan by tiket
const show_by_tiket = (req, res, next) => {
  logger(req);
  checkAuth(req,res);

  laporan.findOne({tiket: req.body.tiket}, (err, rst) => {
    if (rst) {
      res.status(200).json({
        status: "berhasil ambil laporan dengan tiket - " + req.body.tiket,
        data: rst
    })
    } else {
      res.status(500).json({
        status: "gagal ambil laporan dengan tiket - " + req.body.tiket,
        data: err
    })
    }
  });
};
// end showing laporan by tiket

// start store laporan
const store = (req, res, next) => {
  logger(req);
  checkAuth(req,res);

  let new_laporan = new laporan({
    account: JSON.parse(req.body.account),
    status: req.body.status,
    tiket: req.body.tiket,
    klasifikasi: req.body.klasifikasi,
    judul: req.body.judul,
    isi: req.body.isi,
    instansi_tujuan: req.body.instansi_tujuan,
    isAnonim: req.body.isAnonim,
    createdAt: moment().format("LLLL"),
    updatedAt: moment().format("LLLL"),
  });

 let date = new Date()
  if (req.files) {
    for (let data of req.files) {
      console.log(new_laporan.file_lampiran);
      new_laporan.file_lampiran.unshift(
        `${date.getDate()}${date.getMonth()}${date.getFullYear()}` +
          "-" +
          data.originalname
      );
    }
  }
  new_laporan
    .save()
    .then(() => {
      res
        .status(200)
        .json({ status: "Berhasil", message: "Berhasil tambah laporan baru", data: new_laporan });
      res.end();
    })
    .catch((err) => {
      res
        .status(500)
        .json({ status: "Gagal", message: "Gagal menambah laporan baru", data: err });
      res.end();
    });
};
// end store laporan

// start update owner laporan
const update_owner = (req, res, next) => {
  logger(req);
  checkAuth(req,res);

  laporan.findOneAndUpdate({ tiket: req.body.tiket },
     { owner: req.body.owner, updateAt: moment().format("LLLL"),}, (err, rst) => {
      console.log("err, rst")
      console.log(err, rst)
      console.log("err, rst")
    if (err) {
      res.status(500).json({
        status: "Gagal",
        message: "Gagal update owner laporan",
        data: err
      });
    } else {
      res.status(200).json({
        status: "Berhasil",
        message: "Berhasil update owner laporan",
        data: rst,
      });
    }
  });
};
// end update owner laporan

// start update status laporan
const update_status_laporan = (req, res, next) => {
  logger(req);
  checkAuth(req,res);

  laporan.findOneAndUpdate({ _id: req.body.id },
     { status: req.body.new_status, updateAt: moment().format("LLLL"),}, (err, rst) => {
    if (err) {
      res.status(500).json({
        status: "Gagal",
        message: "Gagal mengubah status laporan",
        data: err
      });
    } else {
      res.status(200).json({
        status: "Berhasil",
        message: "Berhasil mengubah status tiket",
        data: rst,
      });
      res.end();
    }
  });
};
// end update status laporan

module.exports = {
  index,
  store,

  show,
  show_pengaduan,
  show_by_tiket,

  update_owner,

  show_Permintaan_informasi,
  show_pengaduan_perceraian,
  show_aspirasi,

  update_status_laporan
};

