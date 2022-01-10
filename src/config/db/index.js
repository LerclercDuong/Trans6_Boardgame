const mongoose = require('mongoose')

async function connect() {
    try{

        await mongoose.connect('mongodb+srv://doantri2003:doantri123@cluster0.wrhde.mongodb.net/test',{
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Da ket noi')
    }catch(e){
        console.log('loi')
    }
    

}
module.exports = {connect}