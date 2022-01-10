const mongoose = require('mongoose')

async function connect() {
    try{

        await mongoose.connect('mongodb://localhost:27017/duongminhtri_dev',{
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Da ket noi')
    }catch(e){
        console.log('loi')
    }
    

}
module.exports = {connect}