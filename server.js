const express = require('express');
const path = require('path')
const app = express();
require('./db/mongodb');

const articleRouter = require('./router/article')
const userdata = require('./models/userdata');
const articledata = require('./models/articledata');
const port = 3000;

app.set('view engine', 'ejs');
app.use('/articles',articleRouter);
app.use(express.json());
app.use(express.urlencoded({extended:false}))

const publicDir = path.join(__dirname, 'public');
app.use(express.static(publicDir));



app.get('/', (req, res) => {
    res.sendFile(path.join(publicDir,'index.html'));
});


app.get('/signup', (req, res) => {
    res.sendFile(path.join(publicDir, 'signup.html'));
});

app.get('/login',(req,res)=>{
    res.sendFile(path.join(publicDir,'login.html'));
})

app.get('/editor',(req,res)=>{
    res.render('editor');
})

app.get('/about',(req,res)=>{
    res.sendFile(path.join(publicDir,'about.html'));
})

app.get('/post',(req,res)=>{
    res.sendFile(path.join(publicDir,'post.html'))
})

app.get('/home',(req,res)=>{
    res.sendFile(path.join(publicDir,'index2.html'))
})

app.get('/articles/:id', async(req,res)=>{
    const article = await articledata.findById(req.params.id);
    res.render('show',{article:article});
})

app.get('/allblogs',async (req,res)=>{

    const article =await articledata.find().sort({createdAt : 'desc'});
    res.render('blogs',{article:article})
})


app.post('/signup',async (req,res)=>{
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;

    

    const newUser = new userdata({
        firstName:firstName,
        lastName:lastName,
        email:email,
        password:password
    })

   await newUser.save().then(()=>{
        console.log('saved');
        res.sendFile(path.join(publicDir,'index2.html'));
    }).catch(error => {
        console.error('Error saving user:', error);
        res.status(500).send('Error signing up user');
    });
})




app.post('/login',async (req,res)=>{
    try{
        const email = req.body.email;
        const password = req.body.password;
        // console.log(`${email} and password is ${password}`);
        const userEmail = await userdata.findOne({email:email});

       if(userEmail.password === password){
        res.status(201).sendFile(path.join(publicDir,'index2.html'));
       }else{
        res.send('email or password is not matching');
       }


    }catch(err){
       res.send('invalid details');
    }
})


app.post('/editor',async (req,res)=>{
      let article = new articledata({
        title:req.body.title,
        tags:req.body.title,
        content:req.body.title
      })  
      try{
      article = await article.save();
      res.redirect(`/articles/${article.id}`)
      }
      catch(err){
        console.log(err);
        res.render('blogs')
      }
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});