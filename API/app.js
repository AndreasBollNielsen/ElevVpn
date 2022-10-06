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
const config = require('./Origins_Config.json');
const port = 3600;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieparser('secretkey'));
//app.use(cors());
app.use(cors({
  origin: config.origins,
  credentials: true
}));

app.set('trust proxy','127.0.0.1');

app.use('/api', apiRouter);
app.use('/api/email', apiEmail);
app.use('/api/info', apiInfo);


app.use("/", express.static("public"));


//-----------------------SSl not in use-------------------------------------------
// const ssloptions = {
//   cert: fs.readFileSync('/etc/pki/tls/certs/cert.pem',"utf-8"),
//   Key: fs.readFileSync('/etc/pki/tls/certs/key.pem',"utf-8")
// }

const ssloptions = {
  cert: fs.readFileSync('/etc/pki/tls/certs/172.18.150.51.crt',"utf-8"),
  Key: fs.readFileSync('/etc/pki/tls/certs/172.18.150.51.key',"utf-8")
}
// console.log(ssloptions.cert);
 const sslServere = https.createServer(ssloptions, app);

//output port listener
sslServere.listen(port, () => { console.log(`port is listening ${port}`) });

