const mongoose = require ('mongoose')

const Product= require('./models/product')

mongoose.connect('mongodb://localhost:27017/farmStand')
    .then(()=>{
        console.log('connected')
    })
    .catch(err=>{
        console.log('oh,no!')
        console.log(err)
    })


const product1= [
    {
        name: 'celery',
        price: 1.99,
        category: 'veg'
    },
    {
        name: 'full cream milk',
        price: 4.20,
        category: 'dairy'  
    },
    {
        name: 'strawberry',
        price: 2.99,
        category: 'fruit'
    },
    {
        name: 'tomato',
        price: 6.99,
        catergory: 'vf'
    }]

    Product.insertMany(product1)
    .then(res=>{
        console.log(res)
    })
    .catch(e =>{
        console.log(e)
    })