// fazendo os imports das bibliotecas
const express = require('express');
const {MongoClient,ObjectId} = require('mongodb')

// Criando o nosso APP
const app = express();
app.use(express.json());

// Criando a conexão com o banco
const client = new MongoClient(process.env.MONGO_URI);
const produtos = client.db('loja').collection('produtos');

// Criando os métodos HTTP
app.post('/produtos',async (req,res)=>{
    const novo_produto = await produtos.insertOne(req.body);
    res.status(201).json(novo_produto);
});

app.get('/produtos',async (req,res)=>{
    const lista = await produtos.find().toArray();
    res.json(lista);
});

app.get('/produtos/:id',async (req,res)=>{
    const produto_especifico = await produtos.findOne({_id: new ObjectId(req.params.id)});
    res.json(produto_especifico);
});

app.put('/produtos/:id',async (req,res)=>{
    const produto_atualizado = await produtos.updateOne({_id: new ObjectId(req.params.id)},{$set: req.body});
    res.json(produto_atualizado);
});

app.delete('/produtos/:id',async (req,res)=>{
    produto_excluido = await produtos.deleteOne({_id: new ObjectId(req.params.id)});
    res.json(produto_excluido)
})

client.connect()
    .then(()=>{
        console.log('CONECTADO AO MONGODB COM SUCESSO!');
        app.listen(3000,()=>console.log('API RODANDO NA PORTA 3000'));
    })
    .catch((erro)=>console.log('ERRO:',erro.message));