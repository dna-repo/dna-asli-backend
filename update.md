<!-- 
Author : Hadi Gunawan
Tanggal mulai : 09 Juni 2022
Desc : Backend untuk aplikasi web crm inspektorat kab paluta 
-->

AUTH
1. login
2. logout
PROFILE
1. edit account
2. update photo

1. setup 
2. user
    - user model
    - user controller/file 
    - user routes
    - test CRUD 

selanjutnya
integrasi dengan fronted
1. fungsi login
2. install cookie-parser
2. generate jwt token
3. fungsi login logout
# auth - cek token sebelum akses api
    - yang penting ada token di headers 
4. fungsi edit pengguna
5. update photo profil
6. edit user | sinkronkan data di fronted ketika di refresh
    - setiap ada perubahan maka update data di vuex dan local storage
        - vuex 
        - local storage
7. update photo profil | sinkronkan data di fronted ketika di refresh
    - setiap ada perubahan maka update data di vuex dan local storage
        - vuex 
        - local storage

next 
## BUAT LAPORAN
### LAPORAN PENGADUAN
1. frontend | laporan baru
2. backend | tambah laporan baru | progress | laporan controller
3. lihat detail laporan
4. tambah komentar pada laporan | detail laporan
 🪲 ketika mengirim komentar muncul error
        Uncaught (in promise) TypeError: Cannot read properties of undefined (reading 'fullName')
        at Proxy.render (DetailLaporan.vue?0716:2:1)
        at renderComponentRoot (runtime-core.esm-bundler.js?d2dd:893:1)
        at ReactiveEffect.componentUpdateFn [as fn] (runtime-core.esm-bundler.js?d2dd:5113:1)
        at ReactiveEffect.run (reactivity.esm-bundler.js?89dc:185:1)
        at callWithErrorHandling (runtime-core.esm-bundler.js?d2dd:155:1)
        at flushJobs (runtime-core.esm-bundler.js?d2dd:394:1)
🪲 validasi form daftar akun di fronted belum sesuai
- done: karena salah memanggil variabel

## BUAT AKUN INSPEKTUR DAN SEKRETARIS
 


- frontend | edit akun fo irban | ❌ tidak jadi dibuat
- frontend | hapus akun 
    - buat modal konfirmasi jika mau menghapus akun


- backend | edit akun inspektur ✅
- backend | edit poto profil inspektur ✅ 

- backend | edit akun inspektur  ✅ 
- backend | edit poto profil inspektur  ✅ 

- frontend | tambah akun fo dan irban ✅
- backend | tambah akun fo dan irban ✅

- frontend | hapus akun fo dan irban ✅
- frontend | hapus akun fo dan irban ✅

- frontend | perbaiki sidebar

========= Front office ==========

ambil komentar : tiket 
ambil laporan : id

### FRONT OFFICE

- UI 
    - tulis laporan
    - 

- login sebagai front office ✅

- frontend | tambah laporan baru ✅
- backend | tambah laporan baru ✅

- frontend | tampilkan permintaan infomasi ✅
- backend | tampilkan permintaan infomasi ✅

    ##### tindak lanjut api
        - store ✅

- frontend | fo memberi tanggapan ✅
- backend | fo memberi tanggapan ✅

- frontend | pelapor membalas tanggapan
- backend | pelapor membalas tanggapan


#### PERUBAHAN STATUS LAPORAN
##### Permintaan Infomasi
    - status laporan
        1. laporan baru             
            -> ketika laporan dibuat
        2. proses verifikasi        
            -> ketika dibuka oleh fo
                -> mengubah status laporan menjadi verifikasi
                -> menambah tindak lanjut "melakukan verifikasi"
        3. tindak lanjut            -> ketika fo memberi tanggapan
        4. beri tanggapan           -> pelapor membalas tanggapan fo
        5. selesai                  -> pelapor dan fo sepakat untuk menutup tiket


### TO DO
- fitur edit profil untuk fo









diarahkan ke halaman verifikasi jika akun belum terverifikasi

# REGISTRASI ✅
# LOGIN ✅

# CRUD USER ✅ | user | super_admin 
    ## store ✅
    ## update ✅
    ## update_photo ✅

 # LAPORAN  ✅| user | fo 
    ## store
    ## beranda - semua laporan



    ## BUG

    salah masukkan email ketika daftar