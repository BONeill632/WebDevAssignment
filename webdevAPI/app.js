const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv').config({ path: './config.env' });
const emotionRouter = require('./routes/emotionRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

app.use(morgan('tiny'));
app.use(express.urlencoded({ extended: false }));

app.use(express.json());
app.use('/', emotionRouter);
app.use('/', userRouter);

app.listen(process.env.PORT, (err) => {
    if (err) return console.log(err);

    console.log(`Express API is listening on port ${process.env.PORT}`);
});

