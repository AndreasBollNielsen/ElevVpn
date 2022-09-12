const express = require('express');
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
    origin: [
      `${process.env.FRONT_URL}`,
      'http://localhost:4200'
    ],
    credentials: true
  }));
app.use('/api',apiRouter);
app.use('/api/email',apiEmail);
app.use('/api/info',apiInfo);



//output port listener
app.listen(port, () =>{console.log(`port is listening ${port}` )} );