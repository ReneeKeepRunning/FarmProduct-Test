const express= require('express')
const app= express()
const path= require('path')
const mongoose = require ('mongoose')
const Product= require('./models/product')
const Farm= require('./models/farm')
const methodOverride= require('method-override')

mongoose.connect('mongodb://localhost:27017/farmStandextend')
    .then(()=>{
        console.log('connected')
    })
    .catch(err=>{
        console.log('oh,no!')
        console.log(err)
    })


app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'))

const category= ['veg', 'fruit', 'vf', 'dairy']
//farm route
app.get('/farms', async (req,res)=>{
    const allFarms= await Farm.find({})
    res.render('farms/index', {allFarms})
})

app.get('/farms/create', (req,res) =>{
    res.render('farms/create')
})

app.post('/farms', async (req,res) =>{
    const farm= new Farm(req.body)
    await farm.save()
    res.redirect('/farms')
})

app.get('/farms/:id', async (req,res)=>{
    const foundFarm= await Farm.findById(req.params.id).populate('products')
    res.render('farms/show', {foundFarm})
})

app.get('/farms/:id/edit', async (req,res)=>{
    const {id}= req.params
    const foundFarm= await Farm.findById(id)
    res.render('farms/edit', {foundFarm})
})

app.put('/farms/:id', async (req, res)=>{
    const {id}= req.params
    const updateFarm= await Farm.findByIdAndUpdate(id, req.body, {runValidators:true, new: true})
    res.redirect(`/farms/${updateFarm._id}`)
})

app.delete('/farms/:id', async (req, res)=>{
    const foundFarm= await Farm.findByIdAndDelete(req.params.id)
    res.redirect('/farms')
})

//在某一个farm中添加一个新的产品
app.get('/farms/:id/products/new', async(req,res)=>{
    const {id}= req.params
//跳转到添加产品的模版； 旧模版中需要改变接收提交的地方，旧的：提交至product；新的需要提交至/farms/:id/products
    const foundFarm= await Farm.findById(id)
    res.render('products/create', {category, foundFarm})
})

app.post('/farms/:id/products', async (req,res)=>{
    const {id}= req.params
    const foundFarm= await Farm.findById(id)
    const {name, price, category}= req.body
    const product=new Product({name, price, category})
    foundFarm.products.push(product)
    product.farm=foundFarm
    await foundFarm.save()
    await product.save()
    res.redirect(`/farms/${foundFarm._id}`)
})
//product route
app.get('/products', async (req, res) => {
    const products= await Product.find({})
    res.render('products/index',{products})
})

app.get('/products/create', (req, res) => {
    res.render('products/create')
})

app.post('/products', async (req,res) =>{
    const newProduct= new Product(req.body)
    await newProduct.save()
    res.redirect(`/products/${newProduct._id}`)
})


app.get('/products/:id', async (req,res) =>{
    const {id} = req.params
    const foundProduct= await Product.findById(id).populate('farm', 'name')
    res.render('products/show', {foundProduct})
})

app.get('/products/:id/edit', async (req,res) =>{
    const {id} =req.params
    const foundProduct= await Product.findById(id)
    res.render('products/edit', {foundProduct})
})

app.put('/products/:id', async (req,res) =>{
    const {id} =req.params
    const updateProduct= await Product.findByIdAndUpdate(id, req.body, {runValidators:true, new: true})
    res.redirect(`/products/${updateProduct._id}`)
})

app.delete('/products/:id', async (req,res) =>{
    const {id} =req.params
    const delectProduct= await Product.findByIdAndDelete(id)
    res.redirect('/products')
})

app.listen(3000,()=>{
    console.log('listening on port 3000')
})