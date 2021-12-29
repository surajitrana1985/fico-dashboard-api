const express = require('express');
const app = express();
const customers = require('./routes/customer.routes');

app.use(express.json());

app.use('/customers', customers);


app.get('/', (req, res) => {
    res.send('Hello from FICO-Express-API!');
});

const port = process.env.PORT || '9000';
app.listen(port, () => console.log(`Server started on Port ${port}`));