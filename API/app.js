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
const port = 3600;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieparser());
//app.use(cors());
app.use(cors({
    origin: ['htts://localhost:4200','htts://172.18.150.51:3600','htts://172.18.150.51'],
    //origin: 'any',
    credentials: true
  }));
app.use('/api',apiRouter);
app.use('/api/email',apiEmail);
app.use('/api/info',apiInfo);

//'http://localhost:3600'

const ssloptions ={
  Key: fs.readFileSync(path.join(__dirname,'./cert/key.pem')),
  cert:fs.readFileSync(path.join(__dirname,'./cert/cert.pem'))
}

const sslServere = https.createServer(ssloptions,app);

//output port listener
sslServere.listen(port, () =>{console.log(`port is listening ${port}` )} );