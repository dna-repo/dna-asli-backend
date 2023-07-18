## USER API

- store: http://127.0.0.1:3030/api/user/store ✅
    - auth : true
    - body: {
        "nik":"1234561234567892",
        "full_name": "Hadii",
        "email": "hadii@mail.com",
        "password": "12345678",
        "gender": "laki-laki" ,
        "address": "Gunung Tua",
        "occupation": {
            "name": "pns",
            "id": "123456789"
        },
        "birth_date":"1989-01-01",
        "phone":"081241458213",
        "level":"user",
        "status": "pending"
        }
- update:  http://127.0.0.1:3030/api/user/update
    - auth: true
    - body: {
        "nik":"1234561234567892",
        "full_name": "Hadii",
        "email": "hadii@mail.com",
        "password": "12345678",
        "gender": "laki-laki" ,
        "address": "Gunung Tua",
        "occupation": {
            "name": "pns",
            "id": "123456789"
        },
        "birth_date":"1989-01-01",
        "phone":"081241458213",
        "level":"user",
        "status": "pending"
        }
- delete: http://127.0.0.1:3030/api/user/delete
    - auth: true
    - body: {
        _id : req.body.id
    }
- verify: http://127.0.0.1:3030/api/user/verify/_id
    - auth: no
    - param: req.query.id