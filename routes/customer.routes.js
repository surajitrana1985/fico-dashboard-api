const express = require('express');
const route = express.Router();

const movies = [
    {id: 1, name: 'Star Wars'},
    {id: 2, name: 'Star Trek'},
    {id: 3, name: 'Toy Story'},
    {id: 4, name: 'Transformers'},
    {id: 5, name: 'Terminator'}
]

route.get('/api/movies', (req,res) => {
    res.send(movies);
});

module.exports = route;
