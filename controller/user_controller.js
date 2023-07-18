/*
Author : Hadi Gunawan
Tanggal mulai : 09 Juni 2022
Desc : Backend untuk aplikasi web crm inspektorat kab paluta
*/

//initial setup
const user = require("../models/user_model");
const bycrypt = require("bcrypt");

// setup untuk email
const nodemailer = require("nodemailer");
const nodeMailGun = require("nodemailer-mailgun-transport");
const path = require("path");
var hbs = require("nodemailer-express-handlebars");

var address_be = `http://127.0.0.1:3030`
var address_fe = `http://127.0.0.1:8080`
var address_olbe = `http://backend-ins.hadig.my.id:3030`
var address_olfe = `http://103.176.78.247`

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
function checkAuth(req,res){
  const token = req.headers.authorization;
  // apakah ada token, jika tidak ada tolak
  if (!token) {
    return res
      .status(401)
      .json({ message: "Auth not found | Anda tidak punya hak akses" });
  }
}



// start kirim email
let kirim_email = (name, email, link, subject, message, button) => {
  const auth = {
    auth: {
      api_key: "32c5c8f8724f8adc036c338281968545-77985560-935b5313",
      domain: "hadig.my.id",
    },
  };
  let transporter = nodemailer.createTransport(nodeMailGun(auth));
  const handlebars_options = {
    viewEngine: {
      extName: ".handlebars",
      partialsDir: path.resolve("./public/email"),
      defaultLayout: false,
    },
    viewPath: path.resolve("./public/email"),
    extName: ".handlebars",
  };
  transporter.use("compile", hbs(handlebars_options));
  const mailOptions = {
    from: "Hadi Gunawan <jtgunawan007@gmail.com>",
    to: email,
    subject: subject,
    template: "email",
    context: {
      link: link,
      name: name,
      message: message,
      button: button
    },
  };
  transporter.sendMail(mailOptions, function (err, data) {
    console.log("send mail");
    if (err) {
      console.log(err);
      console.log("Gagal kirim email");
    } else {
      console.log("Berhasil lagi");
      console.log(data);
    }
  });

  // end kirim email verifikasi
};
// end kirim email

// show list of users
const index = (req, res, next) => {
  logger(req)
  checkAuth(req,res)
  user
    .find()
    .then((response) => {
      res
        .status(200)
        .json({ status: "berhasil ambil data semua pengguna", data: response });
    })
    .catch((err) => {
      res.status(500).json({
        status: "an error occured! | gagal ambil semua pengguna",
        message: err,
      });
    });
};
// end show list of users

// show user by id
const show = (req, res, next) => {
  logger(req)
  checkAuth(req,res)
  user.findById(req.body.id, (err, rst) => {
    if(err){
      res.status(500).json({
        status: "Gagal",
        message: "Gagal ambil user",
        data: err,
      });
    }else{
      res.status(200).json({
        status: "Berhasil",
        message: "Berhasil ambil user",
        data: rst,
      });
    }
  })
};
// end showing user by id

// storing new user
const store = (req, res, next) => {
  console.log(req.body)
  logger(req)
  checkAuth(req,res)
  // start hashing password
  var salt = bycrypt.genSaltSync(10);
  var password = bycrypt.hashSync(req.body.password, salt);
  // end hashing password

  // start modelkan da ke objek
  let new_user = new user({
    nik: req.body.nik,
    full_name: req.body.full_name,
    email: req.body.email,
    password: password,
    gender: req.body.gender,
    address: req.body.address,
    occupation: req.body.occupation,
    birth_date: req.body.birth_date,
    phone: req.body.phone,
    level: req.body.level,
    status: "verified",
    photo_profile: "basic-photo-profile.png",
    createdAt: moment().format("LLLL"),
    updateAt: moment().format("LLLL"),
  });
  // start modelkan da ke objek

  new_user
    .save()
    .then(() => {
      res.status(200).json({
        status: "Berhasil",
        message: "Berhasil tambah akun baru",
        data: new_user,
      });
    })
    .catch((err) => {
      res.status(500).json({
        statsu: "Gagal",
        message: "Gagal menambah akun baru",
        data: err,
      });
    });
};
// end showing user by id

// updating user
const update = async (req, res, next) => {
  logger(req)
  checkAuth(req,res)
  let date = Date();

  // cek jika password berubah, kalau berubah hashing kembali
  var newPassword = "";
  // const findUser = await user.findOne({ nik: req.body.nik });
  user.findById(req.body._id, (err, rst) => {
    if(err){
      res.status(500).json({
        status: "Gagal",
        message: "User tidak ditemukan",
        data: err,
      });
    }
    else if(rst) {
      console.log(rst)

      var userUpdate = {
        nik: req.body.nik,
        full_name: req.body.full_name,
        email: req.body.email,
        password: newPassword == "" ? `${req.body.password}` : `${newPassword}`,
        gender: req.body.gender,
        address: req.body.address,
        occupation: req.body.occupation,
        birth_date: req.body.birth_date,
        phone: req.body.phone,
        level: req.body.level,
        updateAt: date.toLocaleString(),
      };
    
      user.findOneAndUpdate({ nik: userUpdate.nik }, userUpdate, (err) => {
        if (err) {
          res.status(500).json({
            status: "Gagal",
            message: "Gagal update user",
            data: err,
          });
        } else {
          res.status(200).json({
            status: "berhasil",
            message: "berhasil update user",
            data: userUpdate,
          });
          res.end();
        }
      });
    }
  
  });
};
// end updating user

// update photoProfil
const updatePhoto = (req, res, next) => {
  logger(req)
  checkAuth(req,res)
  // saving photo profile if exist
  let date = new Date();
  let d = `${date.getDate()}${date.getMonth()}${date.getFullYear()}-${
    req.file.originalname
  }`;
  if (req.file) {
    user.findOneAndUpdate(
      { nik: req.body.nik },
      {
        photo_profile: d,
      },
      (err) => {
        if (err) {
          res.status(500).json({
            status: "Gagal",
            message: "Gagal update photo profil",
            data: err,
          });
        } else {
          res.status(200).json({
            status: "berhasil",
            message: "Berhasil update photo profil",
            data: d,
          });
        }
      }
    );
  }

  // end saving photo profile if exist
};
// end update photoProfil

// deleting user
const destroy = async (req, res, next) => {
  logger(req)
  checkAuth(req,res)
  user.findByIdAndRemove(req.body.user_id, (err, rst) => {
    if (err) {
      res.status(500).json({
        status: "Gagal",
        meesage: "Gagal menghapus akun",
        data: err,
      });
    } else if (rst) {
      res.status(200).json({
        status: "Berhasil",
        message: "Berhasil menghapus akun",
        data: rst,
      });
    }
  });
};
// end deleting user

// start fo and irban account
const indexFoIr = (req, res, next) => {
  logger(req)
  checkAuth(req,res)

  user.find({ level: ["fo", "irban"] }, (err, rst) => {
    if (rst) {
      res.status(200).json({
        status: "berhasil ambil akun fo dan irban",
        data: rst,
      });
    } else {
      res.status(204).json({
        status: "tidak ditemukan data fo dan irban",
        data: err,
      });
    }
  });
};
// end fo and irban account

// start fo and irban account
const show_irban = (req, res, next) => {
  logger(req)
  checkAuth(req,res)

  user.find({ level: "irban" }, (err, rst) => {
    if (rst) {
      res.status(200).json({
        status: "berhasil ambil akun fo dan irban",
        data: rst,
      });
    } else {
      res.status(204).json({
        status: "tidak ditemukan data fo dan irban",
        data: err,
      });
    }
  });
};
// end fo and irban account

// start verify - dipanggil dari klik link dari email, id-nya diambil dari header - jika berhasil diarah ke frontend
const verify = (req, res, next) => {
  logger(req)
  // checkAuth(req,res)
  const id = req.query.id;

  user.findOneAndUpdate(
    { _id: id },
    {
      status: "verified",
    },
    (err, rst) => {
      if (err) {
        console.log(err);
        res.status(500).json({
          status: "Gagal",
          message: "Gagal update status",
          data: err,
        });
      } else {
        res.redirect( address_olfe + "/#/confirm");
      }
    }
  );
};
// end  verify

// start api kirim email
const send_email = (req, res, next) => {
  logger(req)
  checkAuth(req,res)
  let link = `${address_olbe}/api/user/verify?id=${req.body.id}`;
  kirim_email(req.body.full_name, req.body.email, link, "Verifikasi email", "Terima kasih telah menghubungi kami, silahkan klik link dibahawa ini untuk untuk memperbaharui password anda.", "Verifikasi");
};
// end api kirim email

// start cek email untuk reset sandi - cek email jika terdaftar
//jika terdaftar maka akan dikirim link link masukan passord baru melalui email
// dalam email ada tombol yang membawa parameter berupa id akun
// parameter itu yang akan frontend untuk melakukan update password ke backend
let reset_password = (req, res, next) => {
  // tidak perlu token
  logger(req)
  user.find({$or:[{email: req.body.email},{nik: req.body.email}]})
  .then((rst) => {
    let link = `${address_olfe}/#/new_password?id=${rst[0].id}`;
      kirim_email(rst[0].full_name, rst[0].email, link, "Lupa sandi", "Terima kasih telah menghubungi kami, silahkan klik link dibawah ini untuk untuk memperbaharui password anda.", "Pasword baru");
          res.status(200).json({
            status: "Berhasil",
            message: "Berhasil mencari email",
            data: rst[0],
          });
    
  })
  .catch((err) => {
    res.status(500).json({
    status: "Gagal",
    message: "Gagal mencari email",
    data: err,
    });
})
};
// end cek email untuk reset sandi

// update photoProfil
const new_password = (req, res, next) => {
  logger(req)
  // checkAuth(req,res)
  // start hashing password
  var salt = bycrypt.genSaltSync(10);
  var new_password = bycrypt.hashSync(req.body.password, salt);
  // end hashing password
  user.findOneAndUpdate(
    { _id: req.body.id },
    { password: new_password },
    (err, rst) => {
      if (rst) {
        console.log("berhasil");
        res.status(200).json({
          status: "Berhasil",
          message: "Berhasil update password",
          data: rst,
        });
      } else {
        console.log("gagal");
        res.status(500).json({
          status: "Gagal",
          message: "Gagal update password",
          data: err,
        });
      }
    }
  );
};
// end update photoProfil

module.exports = {
  index,

  show,
  show_irban,

  store,
  update,
  destroy,
  updatePhoto,
  indexFoIr,

  verify, // register✅
  send_email, // re-verify ✅
  reset_password, // untuk reset password jika email ditemukan ✅
  new_password, //melakukan update password
};

