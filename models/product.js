const mongoose= require('mongoose')
const {Schema} = mongoose

const productSchema= new Schema({
    name: String,
    price: Number,
    category: {
        type: String,
        enum:['veg', 'fruit', 'vf', 'dairy']
    },
    farm:{
        type: Schema.Types.ObjectId,
        ref: 'Farm'
    }
})

const Product= mongoose.model('Product', productSchema)

module.exports= Product