const express = require('express');
const {engine} = require('express-handlebars');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const { Car, User } = require('./DB');
const { carRouter, userRouter } = require('./routes/');
const {MongoURL, PORT} = require('./config/config');
const ApiError = require('./error/ApiError');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('.hbs', engine({ defaultLayout: false }));
app.set('view engine', '.hbs');
app.set('views', './static');

mongoose.connect(MongoURL).then(() => {
    console.log('Connection DB success');
});

app.get('/', main);
app.use('/users', userRouter);
app.use('/cars', carRouter);
app.use('*', _notFoundHandler);

app.use(_mainErrorHandler);

function _notFoundHandler(req, res, next) {
    next(new ApiError('Not found', 404));
}

function _mainErrorHandler(err, req, res, next) {
    console.log(err.stack);

    res
        .status(err.status || 500)
        .json({
            message: err.message || 'Server error',
            status: err.status,
            data: {}
        });
}

async function main(req, res) {
    const users = await User.find({}).lean();
    const cars = await Car.find({}).lean();

    res.render('welcome', {users, cars});
}

app.listen(PORT, () => {
    console.log('Server started...');
});

