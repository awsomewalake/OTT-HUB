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


const search = {
    genre: "action",
    language: "english",
    type: "movie",
}

app.get("/", (req, res) => {
    res.render("home.ejs")
})

app.post('/', (req, res) => {
    // const {search}=req.body;

    if (typeof seacrh === 'string' || search instanceof String) {
        const s = search;
    }
    else {
        const s = "";
        for (let i of search) {
            // console.log(i);
            s = s.concat(",", i.toLowerCase());
        }
    }

    axios.get('https://ott-details.p.rapidapi.com/advancedsearch', {
        params: {
            search: s
        }
    })
        .then(function (response) {
            // console.log(response.data);
            // { ques } = responce.data;
            const { data } = response;
            const dataJSON = JSON.stringify(data);
            fs.writeFileSync('data.json', dataJSON);
            res.render('home.ejs', { data: data });
        })
        .catch(function (error) {
            console.log(error);
        })

})

app.listen(3000, () => {
    console.log('Listning on port 3000');
})