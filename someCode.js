const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}); //opens a pending connection to mongoose

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: ')); // seems like a rather fancy way to console log error

db.once('open', async () => {
    //all of our code is contained within this callback, which symbolizes we are  connected
    // I am feeling a bit clastrophobic in this callback, so I wouldn't mind figureing a diffrent way...
    console.log('The server is up and running!');

    const kittySchema = new mongoose.Schema({ //this is a precompiled template for an object that will populate our documents
        name: String,
        /*methods: { This did not work, a fucntion cannot be actually in our schema because functions do not get stored in mongo documents. below is the
            way we properly do it, and I believe it works because we are appending only to the js object, not to the actual schema, making it callable 
            in our code, but not a part of the database
            speak: () => {
                console.log(this.name ? "Meow name is" + this.name : "I don't have a name");
            }
        }*/
    });

    kittySchema.methods.speak = function () { //do not use ()=> so we can have the "this" context
        console.log(this.name ? "Meow name is " + this.name : "I don't have a name");
    }

    const Kitten = mongoose.model('Kitten', kittySchema); //We compile our schema to create a model, which is a class with which we construct documents.
    //this returns a class where kitten is a class
    const silence = new Kitten({
        name: 'Silence'
    });
    console.log('silence\'s name is', silence.name);

    const fluffy = new Kitten({
        name: 'fluffy'
    });

    fluffy.speak();
    silence.save((err, silence) => { // we just saved fluffy to the database! Hurray presistance
        if (err) {
            return console.error(err);
        }
        fluffy.speak();
    });
    //find( {params of search (mongo rich query language)}, callback(err, dataReturned))
    Kitten.find({
        name: 'fluffy'
    }, (err, kittens) => { //we use our model (the compiled object that helps us interact with the kitten document) to find some kittens)
        if (err) {
            return console.error(err);
        }
        console.log(kittens);
    })



});