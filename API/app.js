const express = require('express');
const https = require('https');
const fs = require('fs');
const path = require('path');
const apiInfo = require('./Routes/InfoManager');
const apiRouter = require('./Routes/RouteManager');
const apiEmail = require('./Routes/EmailManager');
const cookieparser = require('cookie-parser');
const app = express();
const cors = require('cors');
const { options } = require('./Routes/InfoManager');
const port = 3600;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieparser());
//app.use(cors());
app.use(cors({
  origin: ['https://localhost:4200','http://localhost:4200','https://elevvpn.zbc.dk','https://localhost','http://172.18.150.51','https://172.18.150.51'],
  //origin: 'any',
  credentials: true
}));



app.use('/api', apiRouter);
app.use('/api/email', apiEmail);
app.use('/api/info', apiInfo);


app.use("/", express.static("public"));

app.get('/hello', (req, res) => {
  res.send("hello world");
})

//-----------------------SSl not in use-------------------------------------------
// const ssloptions = {
//   cert: fs.readFileSync('/etc/pki/tls/certs/cert.pem',"utf-8"),
//   Key: fs.readFileSync('/etc/pki/tls/certs/key.pem',"utf-8")
// }

// const ssloptions = {
//   cert: fs.readFileSync('/etc/pki/tls/certs/172.18.150.51.crt',"utf-8"),
//   Key: fs.readFileSync('/etc/pki/tls/certs/172.18.150.51.key',"utf-8")
// }
// console.log(ssloptions.cert);
// const sslServere = https.createServer(options, app);

//output port listener
app.listen(port, () => { console.log(`port is listening ${port}`) });

