/*
Author : Hadi Gunawan
Tanggal mulai : 09 Juni 2022
Desc : Backend untuk aplikasi web crm inspektorat kab paluta
*/

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookie_parser = require("cookie-parser");

const user_route = require("./routes/user_route");
const auth_route = require("./routes/auth_route");
const laporan_route = require("./routes/laporan_route");
const komentar_route = require("./routes/komentar_route");
const tindak_lanjut_route = require("./routes/tindak_lanjut_route");
const ktp_route = require("./routes/ktp_routes");
const surat_route = require("./routes/surat_routes");
const surat_update_route = require("./routes/surat_update_routes")
const disposisi_surat_routes = require("./routes/disposisi_routes")

// initial setting
const app = express();
const URL = 3030;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./public"));
app.use(cookie_parser());
// end initial setting

// start db connection
mongoose.connect("mongodb://localhost:27017/ins", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", (err) => {
  console.log({ err });
});
db.on("open", () => {
  console.log("database connection established");
});
// end db connection

// start server
app.listen(URL, (err, success) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`server start on : http://localhost/${URL}`);
  }
});
// end start server

// add routes
app.use("/api/user", user_route);
app.use("/api/auth", auth_route);
app.use("/api/laporan", laporan_route);
app.use("/api/komentar", komentar_route);
app.use("/api/tindak_lanjut", tindak_lanjut_route);
app.use("/api/ktp", ktp_route);
app.use("/api/surat", surat_route);
app.use("/api/surat_update", surat_update_route);
app.use("/api/disposisi", disposisi_surat_routes);
// end add routes
