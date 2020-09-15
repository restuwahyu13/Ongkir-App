### Mini Project Ongkir App (Raja Ongkir)

**Berikut** ini adalah mini project aplikasi untuk menghitung biaya ongkos pengiriman barang antar kota atau antar provinsi, menggunakan **Raja Ongkir API** include **Ultimate Authentication V2**, menggunakan **MERN** + **Redux and Redux Thunk**, untuk **Ultimate Authentication V1** [disini](https://github.com/restuwahyu13/mern-real-auth)

#### Cara Menjalankan Aplikasi

**Install module** terlebih dahulu sesuai dengan apa yang tertera di `package.json`, kemudian buka **terminal** dan silahkan ketikan `npm install` atau `yarn add`, setelah selesai menginstall **module** tersebut lalu silahkan jalankan dengan cara mengetikan `npm run server:start` atau `yarn server:start` untuk **server** dan megetikan `npm run client:start` atau `yarn client:start` untuk **client** pada **terminal**.

#### Cara Deploy Aplikasi
+ install **Heroku CLI** terlebih dahulu [disini](https://devcenter.heroku.com/articles/heroku-cli)
+ buka terminal ketikan `heroku login` pada **terminal**
+ buat nama domain anda sendiri dengan mengetikan `heroku create` di ikuti dengan nama yang anda inginkan
+ ketikan `git Init` -> `git add .` -> `git commit -m` pada **terminal**
+ kemudian tes aplikasi via local server **Heroku** dengan mengetikan `heroku local` jika sudah berjalan dengan lancar, tekan **CTRl + C** dan kemudian ketikan `git push heroku master`

#### Front-End Endpoit Routes:

| Nama | Route Name |
| -----| -----------|
|  Home | http://localhost:3000
| Login  | http://localhost:3000/signin
|  Register  | http://localhost:3000/signup
|  Profile | http://localhost:3000/profile
|   Activation Account  | http://localhost:3000/activation/:id
|  Forgot Password | http://localhost:3000/forgot-password
|  Reset Password | http://localhost:3000/reset-password/:id'
|  Resend Token | http://localhost:3000/resend-token'
|  Verification Token Activation Account | http://localhost:3000/verify-activation/:id'
| Verification Token Reset | http://localhost:3000/verify-reset/:id'
|  Logout | http://localhost:3000//logout'

#### Back-End Endpoit Routes:

| Nama | Route Name | Request Method |
| -----| -----------| ---------------|
|  **User Endpoint** | | |
|  Login | http://localhost:3001/api/user/login | POST
| Register  | http://localhost:3001/api/user/register | POST
|  Resend Token  | http://localhost:3001/api//user/resend-token | POST
|  Forgot Password | http://localhost:3001/api/user/forgot-password | POST
|  Reset Verification  | http://localhost:3001/api/user/reset-password/verify/:id | GET
|  Reset Password | http://localhost:3001/api/user/reset-password/:id| POST
|  Activation Account | http://localhost:3001/api/user/activation/:id' | GET
|  Social Login | http://localhost:3001/api/user/social-login' | GET
|  Social Register | http://localhost:3001/api/user/social-register' | GET
|  **Profile Endpoint** | | |
|  Edit Profile  | http://localhost:3001/api/user/profile/:id' | GET
|  Update Profile | http://localhost:3001/api/user/profile/:id | POST
|  **Ongkir Endpoint** | | |
|  City  | http://localhost:3001/api/cekongkir/city' | GET
|  Province  | http://localhost:3001/api/cekongkir/prov | POST
|  Kabupaten  | http://localhost:3001/cekongkir/kab' | GET
|  Cost | http://localhost:3001/api/cekongkir/cost | GET
|  **Social  Endpoint** | | |
|  Google  | http://localhost:3001/auth/google' | GET
|  Facebook  | http://localhost:3001/auth/facebook | POST
|  Github  | http://localhost:3001/auth/github' | GET

#### Problem Deploy Aplikasi Ke Production

**Aplikasi** tidak saya deploy dikarenakan ada beberapa kendala saat mendeploy aplikasi ke heroku, dan saya belum menemukan solusinya dan saya sudah mencarinya ke **Stack Overflow**, **Webpack Issue** atau yang lainnya dan masih belum membuahkan hasil yang di inginkan, baik itu menggunakan **CRA** atau **React Boilerplate** yang saya buat, jika saya menemukan solusinya saya akan mendeploy nya ke heroku. Terimakasih
