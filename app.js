const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
let nodemailer = require('nodemailer');
const constants = require('./CONSTANTS');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

let languageTranslator = require('language-translator');
app.use(languageTranslator.init(
    {
      langs          : ["en", "ru"], // ... And other languages
      defaultLang    : "en",
      cookieName     : "lang",
      translate      : "true",
      translationApiKey: "trnsl.1.1.20191211T150132Z.1202d3e8ec0a8df5.7fd6ce84438b8b8a77950ad90aa716c766f81a7c"
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
      host: constants.mail_host,
      port: constants.mail_port,
      secure: true,
      auth: {
        user: constants.mail_user,
        pass: constants.mail_pass
      }
    });
    await transporter.sendMail({
      from: constants.mail_user,
      sender: decodeURIComponent(t.email),
      to: constants.mail_user,
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