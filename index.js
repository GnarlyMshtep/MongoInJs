const mongoose = require('mongoose');

const {
    studModel
} = require('./models');

/*
can't use this syntax, I think its not in node
import {
    studModel
} from './models'*/

try {
    /*await*/
    mongoose.connect('mongodb://localhost:27017/examples', { //will this work with out an await if I don't mind just letting the internal buffering do its thing? 
        useNewUrlParser: true, //they had an old parser they didn't like, now for example, you have to specify the port. always true unless it is preventing ur connection
        useUnifiedTopology: true, // use mongo's official engine for connections. reccomended as always true unless prevents stable connections
    });
} catch (err) {
    console.error('not connected to mongoDb');
}

//note that we can use models and all that regardless of connection because of mongoose's internal buffering

mongoose.connection.on('error', (err) => {
    console.error('the following non-initial error occured: ' + err);
});


