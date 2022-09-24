const express = require("express")
const ejsMate = require('ejs-mate')
const path = require('path')
const app = express();
app.use(express.urlencoded({ extended: true }))
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/Client/views'));
var methodOverride = require('method-override')
app.use(methodOverride('_method'));


app.get("/", (req, res) => {
    res.render("home.ejs")
})

app.listen(3000, () => {
    console.log('Listning on port 3000');
})