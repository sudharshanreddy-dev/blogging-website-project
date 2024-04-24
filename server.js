const express = require('express');
const path = require('path')
const app = express();
require('./db/mongodb');
const userdata = require('./models/userdata');
const port = 3000;

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
    res.sendFile(path.join(publicDir,'editor.html'));
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


app.post('/signup',(req,res)=>{
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

    newUser.save().then(()=>{
        console.log('saved');
        res.sendFile(path.join(publicDir,'index2.html'));
    }).catch(error => {
        console.error('Error saving user:', error);
        res.status(500).send('Error signing up user');
    });
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});