const http = require('http');
const app = require('express')();
// const server = http.Server(app);
// const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const mongo = require('mongodb');


app.use(bodyParser.urlencoded({ extended: true }));



app.get('/', function(req, res){
	res.sendFile(__dirname+'/index.html');
});


app.get('/second', function(req, res){
	res.sendFile(__dirname+'/second.html');
});

app.get('/new_article', function(req, res){
	res.sendFile(__dirname+'/new_article.html');
});



const url = 'mongodb+srv://aak:aak1234@cluster0-n2krw.mongodb.net/test?retryWrites=true&w=majority'


 
 
mongo.MongoClient.connect(url,{useNewUrlParser: true, useUnifiedTopology: true },
  function(err, client){
    if(err){
      console.log('Could not connect to MongoDB')
    }else{
      db = client.db("node-cw9")
    }
  })
 
 
 
// let articles = [];
 
// app.get('/article/:index', function(request,response){
//   if(articles[request.params.index]){
//     response.render('article.ejs',{
//       article:articles[request.params.index]
//     })
//   }else{
//     response.json({msg: 'Article not found'})
//   }
// })
 
 
// app.post('/new_article', function(req, res){
//   SVGFEFuncAElement()
//   console.log(req.body);
//   articles.push(req.body);
//     res.send('response successfully sent');
// });
 




mongoose.connect(url, {useNewUrlParser:true, useUnifiedTopology: true})
mongoose.connection.on('error',function(err){
  console.log('could not connect to mongoose')
})
// var save = function(form_data){
  
// db.createCollection('article',function(err,collection){
//   var collection = db.collection('article')
//   collection.save(form_data)
// })
// }

var Schema = mongoose.Schema
var articleSchema = new Schema(
  {
    title:{
      type: String,
      required: 'title is required'
    },
    content:{
      type: String,
      required: 'content is required'
    }
  }
)
var Article = mongoose.model("Article",articleSchema)

app.get('/articles', function(request,response){
      Article.find(function(err,data){
        if(err){
          return response.status(400).json({msg: 'cant find'})
        }
        return response.render("article.ejs",{
          'article': data
        })
      })
    })


  app.post('/new_article', function(request,response){

    let article = new Article(request.body)
    article.save(function(err,data){
      if(err){
       return  response.status(400).json({msg: "All fields are required"})
      }
      return response.status(200).json({article:data})

    })
    
  })


   
app.listen(3000, 'localhost', function() {
    console.log('Server running');
});
