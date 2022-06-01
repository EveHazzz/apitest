// config inicial
const express = require('express')
const mongoose = require('mongoose')
const app =  express ()

const Pessoas = require('./models/Pessoas')
// forma de ler JSON => utlizar middlewares
app.use(
    express.urlencoded({
        extended: true,
    }),
)
app.use(express.json())

//rota para inserir dados na base
app.post('/pessoas', async(req,res)=>{

    const{nome,salario,aprovado} = req.body
    //{nome:"Everaldo", salario:4800,aprovado:false}

    if(!nome){
        res.status(422).json({error: 'nome é obrigatório'})
    }

    const pessoas = {
        nome,
        salario,
        aprovado
    }
    try{
        await Pessoas.create(pessoas)
        res.status(201).json({message: 'Pessoa inserida com sucesso!'})
    } catch (error) {
        res.status(500).json({error:error})
    }
})

// rota inicial / endpoint
app.get('/', (req,res)=>{
    //mostrar requisição
    res.json({message: 'Oi express!'})
})
// entregar uma porta
const DB_USER = 'Everaldo'
const DB_PASSWORD = encodeURIComponent('Hkvl4848')
mongoose
.connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.6njtw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
)
.then(()=> {
    console.log('Conectamos ao DB')
    app.listen(3000)
})
.catch((err)=>{
    console.log(err)
})
