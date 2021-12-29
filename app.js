const express = require('express');
const app = express();
const movies = require('./movies');
const connectMongoDB = require('./config/mongoose.config');

const connection = connectMongoDB().connection;

connection.on('open', () => {
    console.log('Connected to MongoDB...');
});

connection.on('error', (error) => {
    console.log('database error', error);
});

app.use(express.json());

app.use('/abc', movies);


app.get('/', (req,res) => {
    res.send('Hello from FICO-Express-API!');
});









const port = process.env.PORT || '9000';
app.listen(port, () => console.log(`Server started on Port ${port}`));