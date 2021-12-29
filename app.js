const express = require('express');
const cors = require('cors');

const app = express();

const connectMongoDB = require('./config/mongoose.config');

const movies = require('./movies');
const customerRoutes = require('./routes/customer.routes');

const connection = connectMongoDB().connection;

connection.on('open', () => {
    console.log('Connected to MongoDB...');
});

connection.on('error', (error) => {
    console.log('database error', error);
});


app.use(cors());
app.use(express.json());

app.use('/customers', cors(), customerRoutes);
app.use('/abc', movies);


app.get('/', (req, res) => {
    res.send('Hello from FICO-Express-API!');
});

const port = process.env.PORT || '9000';
app.listen(port, () => console.log(`Server started on Port ${port}`));
