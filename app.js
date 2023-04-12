const express = require("express");
const path = require("path");
const fs = require("fs");
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
const bodyparser = require("body-parser");
const app = express();
const port = 8000;

// main().catch(err => console.log(err));

// async function main() {
  mongoose.connect('mongodb://127.0.0.1:27017/contactDance');
  console.log("We are connected bro and sister");
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
// }

var contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
  });

var Contact = mongoose.model('Contact', contactSchema);

// Express Specific Stuff
// app.use('./static',express.static('static'));
app.use("/static", express.static(path.join(__dirname, 'static'))); //for serving static files
app.use(express.urlencoded());

//Pug Specific stuff
app.set('view engine', 'pug'); // Set the template engine as pug
app.set('views', path.join(__dirname,'views')); // Set the View directory

// Endpoints
app.get("/",(req,res)=>{
    const params = {};
    res.status(200).render('index.pug',params);
});

app.get("/contact",(req,res)=>{
    const params = {};
    res.status(200).render('contact.pug',params);
});

app.get("/about",(req,res)=>{
    const params = {};
    res.status(200).render('about.pug',params);
});

app.get("/services",(req,res)=>{
    const params = {};
    res.status(200).render('services.pug',params);
});

app.get("/classinfo",(req,res)=>{
    const params = {};
    res.status(200).render('classinfo.pug',params);
});

app.post("/contact",(req,res)=>{
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been saved to the database")
    }).catch(()=>{
        res.status(400).send("Item was not saved to the database")
    });
    // res.status(200).render('contact.pug');
});

app.listen(port,()=>{
    console.log(`The application is running successfully on port ${port}`);
});