const express = require("express")
const ejsMate = require('ejs-mate')
const path = require('path')
const app = express();
app.use(express.static(path.join(__dirname, 'Client')));
app.use(express.urlencoded({ extended: true }))
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/Client/views'));
var methodOverride = require('method-override')
app.use(methodOverride('_method'));

// axios.get('https://ott-details.p.rapidapi.com/advancedsearch', {
//         params: {}
//     })
//     .then(function(response) {
//         //

//     })
//     .catch(function(error) {
//         console.log('error');
//     })


const search = {
    genre: "action",
    language: "english",
    type: "movie",
}

app.get("/", (req, res) => {
    res.render("form.ejs")
})

app.post("/", async(req, res) => {
    const { search } = req.body
    console.log(search)
    res.send("Posted")
})

app.post('/', (req, res) => {
    const { search } = req.body;
    console.log(search)
    res.send("posted")

})

app.listen(3000, () => {
    console.log('Listning on port 3000');
})