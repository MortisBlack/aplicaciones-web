import mongoose from 'mongoose';

const url = 'mongodb://localhost/mongo';

const mongo =mongoose.connect(url, function (err){

    if(err) throw err;
    //console.log("conectadoo");
});

export{mongo}