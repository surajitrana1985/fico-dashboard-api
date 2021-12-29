const mongoose = require('mongoose');

// const API_URL = 'mongodb://127.0.0.1:27017/ficodb';
const API_URL = 'mongodb+srv://root:admin@fico.jxukj.mongodb.net/ficodb?retryWrites=true&w=majority';

const mongoConnectOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

function connectMongoDB() {
    mongoose.connect(API_URL, mongoConnectOptions);
    return mongoose;
}

module.exports = connectMongoDB;
