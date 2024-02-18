const mongoose= require('mongoose')
const Product = require('./product')

const {Schema}= mongoose

const farmSchema= new Schema({
    name:{
        type: String,
        required: [true, 'fame must have a name.']
    },
    location:{
        type: String
    },
    contact:{
        type: Number
    },
    products:[{type: Schema.Types.ObjectID, ref:'Product'}]
})

farmSchema.post('findOneAndDelete', async function (){
    if(Farm.products.length){
        Product.deleteMany({_id:{$in:Farm.products}})
    }
})


const Farm= mongoose.model('Farm', farmSchema)
module.exports=Farm