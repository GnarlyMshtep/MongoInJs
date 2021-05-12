const mongo = require('mongodb');

const MongoClient = require('mongodb').MongoClient();
const url = "mongodb://localhost:27017/mydb";

MongoClient.connect(url, function (err, db) {
    if (err) {
        throw err;
    }
    console.log("Database created!");
    db.close();
});

/*
    see W3schools for more info on using the mongo client. It seems a bit verbose, so I am going ot switch to moongose 
*/