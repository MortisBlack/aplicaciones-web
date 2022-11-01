import express from "express";
import cors from "cors";

import corsOptionsDelegate from './src/config/cors.config.js';
const APP = express();
const HOSTNAME = "127.0.0.1";
const PORT = 3000;
APP.use(express.json());

import userRoter from './src/routes/User.routes.js';
import workspaceRouter from './src/routes/Workspace.routes.js';
import boardRouter from './src/routes/Board.routes.js';
import columnRouter from './src/routes/Column.routes.js';
import cardRouter from './src/routes/Card.routes.js';
import userTypeRouter from './src/routes/UserType.routes.js';
import imageCardRouter from './src/routes/ImageCard.routes.js';
import commentRouter from './src/routes/Comment.routes.js';

import errorHandler from './src/middlewares/error_handler.js'

APP.use(cors(corsOptionsDelegate))


APP.use('/users', userRoter);
APP.use('/workspaces', workspaceRouter);
APP.use('/boards', boardRouter);
APP.use('/columns', columnRouter);
APP.use('/cards', cardRouter);
APP.use('/users_types', userTypeRouter);
APP.use('/images_cards', imageCardRouter);
APP.use('/comments', commentRouter);


APP.use(errorHandler);

APP.listen(PORT, () => {
    console.log(`Server running in http://${HOSTNAME}:${PORT}/`);
});