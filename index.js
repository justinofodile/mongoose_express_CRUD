require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const Contact = require('./routes/Contact')


app.use('/api', Contact);

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            /* useNewUrlParser: true,
            useUnifiedTopology: true */
        })

        console.log('Connected Successfully')
        const port = process.env.PORT || 3000;
        app.listen(port, () => {
            console.log('Server started successfully');
        })
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

connectDB();


