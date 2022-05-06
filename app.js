const express = require('express');
const {engine} = require('express-handlebars');
const mongoose = require('mongoose');

const cars = require('./DB/cars.json');
const users = require('./DB/users.json');
const userRouter = require('./routes/user.router');
const carRouter = require('./routes/car.router');
const {PORT} = require('./config/config');
const {MongoURL} = require('./config/config');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('.hbs', engine({ defaultLayout: false }));
app.set('view engine', '.hbs');
app.set('views', './static');

mongoose.connect(MongoURL).then(() => {
    console.log('Connection DB success');
})

app.use('/users', userRouter);
app.use('/cars', carRouter);


app.get('/', (req, res) => {
    res.render('welcome', { users, cars });
})

app.listen(PORT, () => {
    console.log('Server started...')
});

