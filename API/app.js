const express = require('express');
const apiRouter = require('./Routes/RouteManager');
const app = express();
const cors = require('cors');
const port = 3600;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use('/api',apiRouter);

// const mail ="testmail@zbc.dk";
// const Vpn = false;
// const isSticky =true;

// const user = {'email':mail,'vpn':Vpn,'sticky':isSticky};

// const users = [user];


//output port listener
app.listen(port, () =>{console.log(`port is listening ${port}` )} );