const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const cookieParser = require('cookie-parser');
const path = require('path')
const mongoose = require('mongoose')
const api = require('./router/api')
const config = require('./db')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(session({
    secret: 'lzy web',
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000000  //1秒=10000
    },
    store: new MongoStore({
        url: config.userSession
    })
}))

app.use('/api',api)

app.use(express.static(path.resolve(__dirname, './dist')))

app.listen(3000,() => {
    console.log('app listening on port 3000.')
})
mongoose.connect(config.mongodb,{useMongoClient:true})
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
    // yay!
    console.log('yay!')
});