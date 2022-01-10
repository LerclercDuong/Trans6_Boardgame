module.exports ={
    multipleMongooseToObject:function(){
        return mongooses.map(mongoose => mongoose.toObject());

    },
    mongooseToObject:function(mongoose){
        return mongoose ? mongoose.toObject() : mongoose;
    }
}