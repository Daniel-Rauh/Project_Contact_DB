const express = require('express')
const app = express()
const hbs = require('hbs')
hbs.handlebars === require('handlebars')
const mongoose = require('mongoose')
require('dotenv').config()
hbs.registerPartials(__dirname + '/views/partials', function (err) {});
hbs.localsAsTemplateData(app)
const ContactItem = require("./models/contactItem")
app.locals.contacts = []
app.locals.single = ""

app.use(express.static('public'))
app.set('view engine', 'hbs')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
        console.log("connected to db")
        app.listen(3000, () => {
            console.log("Listen here you little...")
        })
})
    .catch(err => console.log(err))

app.get("/", (req, res) => {
    ContactItem.find()
        .then((result) => {
            app.locals.contacts = result
            res.status(200).render("index")
        })
})

app.get("/new", (req, res) => {
    res.status(200).render("new")
})

app.post("/newContact", (req, res) => {
    const newContactItem = new ContactItem({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        url: req.body.url
    })
    newContactItem.save()
        .then((result) => {
            res.status(201).redirect("/")
        })
        .catch(err => console.log(err))
})
app.get("/single/:id", (req, res) => {
    ContactItem.findById(req.params.id)
        .then((result) => {
            app.locals.single = result
            res.status(200).render("single")
        })
        .catch(err => console.log(err))
})