import express from "express";
const APP = express();
const HOSTNAME = "127.0.0.1";
const PORT = 3000;
APP.use(express.json());

import router from './src/routes/User.routes.js'

APP.use(router)

APP.listen(PORT, ()=>{
    console.log(`Server running in http://${HOSTNAME}:${PORT}/`);
});