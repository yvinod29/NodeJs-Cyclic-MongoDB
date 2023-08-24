const  mongoose=require('mongoose');

const Schema=mongoose.Schema;
const BookSchema=new Schema({
    title:{
        type:String,
        required:true,

    },
    body:{
        type:String,
        require:true,
    }
})
mongoose.exports =mongoose.model('Book',BookSchema);