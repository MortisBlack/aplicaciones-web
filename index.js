import express from "express";
const APP = express();
const HOSTNAME = "127.0.0.1";
const PORT = 3000;
APP.use(express.json());

import userRoter from './src/routes/User.routes.js'
import workspaceRouter from './src/routes/Workspace.routes.js'

APP.use('/cola', userRoter)

APP.use('/workspaces', workspaceRouter)

APP.listen(PORT, ()=>{
    console.log(`Server running in http://${HOSTNAME}:${PORT}/`);
});