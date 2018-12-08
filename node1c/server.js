const express = require('express');
const bodyParser = require('body-parser');
const form = require('express-form');
const field = form.field;
// define the port of access for your server
const PORT = 8081;

const app = express();
app.use(bodyParser());

const ID_reg_expression = /[A-Z][A-Z]\d{7}|C[A-Z]\d{5}[A-Z][A-Z]/;

app.get('/appserver/', function(req, res) {
    res.send('Server: '+ip.address()+' working properly. Requested URL : ' + request.url);
  });

app.post('/appserver/login', form(field('name').trim().required().is(ID_reg_expression), field('password').trim().required() ) , function(req, res){

    if(!req.form.isValid){
        console.log(req.form.errors);
        res.send(req.form.errors);
    }
    else{
        console.log("id:", req.form.name );
        console.log("pw:", req.form.password );
        res.send("Login da verificare con il database ID: "+req.form.name+"PW: "+req.form.password);
    }
});

app.post('/appserver/registrazione', 
                        form(field('name').trim().required(),
                        field('cognome').trim().required(),
                        field('cid').trim().required().is(ID_reg_expression),
                        field('email').trim().required().isEmail(),
                        field('pw').trim().required(),
                        field('confirmpw').trim().required().equals("field::pw"),
                        field('cf').trim().required(),
                        field('municipio')  ), 

                        
                        function(req, res){
    if(!req.form.isValid){
        console.log(req.form.errors);
        res.send(req.form.errors);
    }
    else{
        res.send(req.body);
    }

});

app.listen(PORT);
