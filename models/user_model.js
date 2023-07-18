/*
Author : Hadi Gunawan
Tanggal mulai : 09 Juni 2022
Desc : Backend untuk aplikasi web crm inspektorat kab paluta
*/

// initial setup
const mongoose = require("mongoose");
const schema = mongoose.Schema;
// end initial setup

/* data needed
1. nik            | required | unique |
2. full_name      | required |    -   |
3. email          | required | unique |
4. password       | required |    -   |
5. gender         | required |    -   |
6. address        | required |    -   |
7. occupation     | required |    -   |
8. birth_date      | required |    -   |
9. phone         | required | unique |
10. level         | required |    -   |
11. photo_profile |     -    |    -   |
12. status        | required |    -   |
*/


// made use schema
const userSchema = new schema({
  nik: {
    type: String, 
    required: true,
    unique: true,
  },
  full_name: {
    type: String, 
    required: true,
  },
  email: {
    type: String, 
    unique:true,
    required: true,
  },
  password: {
    type: String, 
    required: true
  },
  gender: {
    type: String,
    required: true,
  },
  address: {
    type: String, 
    required: true,
  },
  occupation: {
    required: true, 
    type: Map,
    of: String,
  },
  birth_date: {
    required: true, 
    type: String,
  },
  phone: {
    type: String,
    required: true,
    unique: true
  },
  level: {
    type: String,
    required: true,
  },
  photo_profile: {
    type: String, 
  },
  status: {
    type: String, 
    required : true
  },
  createdAt: String,
  updatedAt: String,
});
// end made use schema

const user = mongoose.model("users", userSchema);
module.exports = user;
