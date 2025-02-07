const mongoose = require('mongoose');

const monogoURL="mongodb://localhost:27017";

const connecttoMongo=()=>{

    console.log("this is connect to func");
    mongoose.connect('mongodb://127.0.0.1:27017/iNoteBook').then(() => console.log('Connected to Mongo Successfully!'));

}

module.exports = connecttoMongo;




// const Cat = mongoose.model('Cat', { name: String });

// const kitty = new Cat({ name: 'Zildjian' });
// kitty.save().then(() => console.log('meow'));