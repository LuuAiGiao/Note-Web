const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const authRouter = require('./routes/auth')
const postRouter = require('./routes/post')
require('dotenv').config();

const conectDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@note-web.7qlpffj.mongodb.net/`)

        console.log('MongoDB connected')
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

conectDB()

const app = express();
app.use(express.json())
app.use(cors())

app.use('/api/auth', authRouter)
app.use('/api/post', postRouter)

const PORT = 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));