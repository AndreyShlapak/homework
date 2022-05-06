const express = require('express');
const {engine} = require('express-handlebars');
const mongoose = require('mongoose');

const Car = require('./DB/Car.model');
const User = require('./DB/User.model');
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
});

app.use('/users', userRouter);
app.use('/cars', carRouter);

async function main() {
    const users = await User.find({}).lean();
    const cars = await Car.find({}).lean();
    return {users, cars};
}

app.get('/', async (req, res) => {
    const users = await User.find({}).lean();
    const cars = await Car.find({}).lean();

    res.render('welcome', {users, cars});
});

app.listen(PORT, () => {
    console.log('Server started...')
});

