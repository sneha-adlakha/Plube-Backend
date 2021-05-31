const express = require('express');
require('dotenv').config();

const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 3000;
app.use(cors());
app.use(bodyParser.json());

const { initializeDBConnection } = require('./db/db.connect.js');
const populateDB=require("./db/populateDB.js");
initializeDBConnection();
populateDB();

const usersRouter = require('./routers/users-router');
const videosRouter = require('./routers/videos-router');
const likedVideoRouter = require('./routers/likedvideo-router');
const playListRouter = require('./routers/playlists-router');
const historyRouter=require('./routers/history-router')
const errorHandler=require("./middlewares/errorHandler");
const routeHandler=require("./middlewares/routeHandler");



app.use('/users', usersRouter);
app.use('/videos', videosRouter);
app.use('/liked-video', likedVideoRouter);
app.use('/playlist', playListRouter);
app.use('/history', historyRouter);

app.get('/', (req, res) => {
	res.json('API for Plube Videos');
});

app.use(routeHandler);
app.use(errorHandler);

app.listen(PORT, () => {
	console.log(`Server Started on Port ${PORT}`);
});
