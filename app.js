const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
let nodemailer = require('nodemailer');

if (!process.env.trans_api) {
  console.log('add to process.env');
  require('dotenv').config();
  console.log(process.env);
  console.log(process.env.TRANS_API)
}

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

let languageTranslator = require('language-translator');
console.log(process.env)
app.use(languageTranslator.init(
    {
      langs          : ["en", "ru"], // ... And other languages
      defaultLang    : "en",
      cookieName     : "lang",
      translate      : "true",
      translationApiKey: process.env.TRANS_API
    }));

let main_router = require('./routes/index');
let works_router = require('./routes/works');

app.use('/', main_router);
app.use('/works', works_router);

app.post("/send", async function (request, response) {
  if (!request) return response.sendStatus(400);
  let body = '';
  await request.on('data', async function (data) {
    body += data;
    let t = JSON.parse(body);
    let transporter = createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      secure: true,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
      }
    });
    await transporter.sendMail({
      from: process.env.MAIL_USER,
      sender: decodeURIComponent(t.email),
      to: process.env.MAIL_SEND,
      subject: decodeURIComponent(t.title),
      html: "<p>Письмо направилено с формы контакта в портфолио</p><h1 style='color: #f80b0b'>" + decodeURIComponent(t.title) + "</h1><p><h3 style='color: #3f6efd'>Name sender:</h3>" + decodeURIComponent(t.name) + "</p><p><h3 style='color: #0b99f8'>Object:</h3>" + decodeURIComponent(t.object) + "</p><p><h3 style='color: #743ffd'>Email for answer:</h3>" + decodeURIComponent(t.email) + "</p><p><h3 style='color: #0bf889'>Text:</h3><pre>" + decodeURIComponent(t.mail) + "</pre></p>",
    }, (error, infoSuccess) => {
      if (error) {
        console.log("error in sending email: ", error);
        return response.sendStatus(400);
      } else {
        console.log("success in sending email: ", infoSuccess);
        return response.sendStatus(200);
      }
    });
  });
});




module.exports = app;