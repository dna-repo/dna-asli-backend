/*
Author : Hadi Gunawan
Tanggal mulai : Minggu, 12 Juni 2022
Desc : Backend untuk aplikasi web crm inspektorat kab paluta
*/

// initaial setup
// const jwt = require('jsonwebtoken');
const user_model = require("../models/user_model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// end intial setup

// fungsi generate token
const maxAge = 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, "hadi gunawan secret key", { expiresIn: maxAge });
};
// end fungsi generate token

// login controller
const login = async (req, res, next) => {
  const { email, password } = req.body;
  user_model
    .findOne({ email: email })
    // jika pengguna ditemukan
    .then( async (rst) => {
      console.log("berhasil mencari akun selanjutnya melakukan pencocokan sandi dengan bycript");
      console.log(rst);
      bcrypt
        .compare(password, rst.password, function(err, same) {
          console.log("loading");
          console.log(err);
          console.log(same);
          if(err) {
            console.log("err");
            res.status(500).json({
              status: "Gagal",
              message: "Gagal melakukan bycript",
            });
          }else if(same){
            console.log("same");
            console.log("akun ditemukan dan berhasil login");
            const token = createToken(rst.id);
            current_token = token;
            res.status(200).json({
              status: "Berhasil",
              message: "Berhasil login",
              data: { user: rst, token: token },
            });
          }else if(same == false){
            console.log("not same");
            res.status(200).json({
              status: "Gagal",
              message: "Password tidak sesuai",
              data: { rst },
            });
          }
        })
        // jike berhasil melakukan bycript dan menemukan sandi yang sesuai
        // .then(() => {
        //     console.log("akun ditemukan dan berhasil login");
        //     const token = createToken(rst.id);
        //     current_token = token;
        //     res.status(200).json({
        //       status: "Berhasil",
        //       message: "Berhasil login",
        //       data: { user: rst, token: token },
        //     });
        // })
        // // jika gagal melakukan bycript
        // .catch((err) => {
        //   console.log(err);
        //   res.status(500).json({
        //     status: "Gagal",
        //     message: "Gagal melakukan bycript",
        //   });
        // });
    })
    // jika gagal mencari dari database
    .catch((err) => {
      console.log(err);
      res.status(500).json({
            status: "Gagal",
            message: "Gagal mencari pengguna di database",
          });
    });
};
// end login controller

// logout controller
const logout = async (req, res, next) => {
  console.log("user logout");
  res.json({
    status: "logout berhasil",
  });
};
// end logout controller

module.exports = { login, logout };
