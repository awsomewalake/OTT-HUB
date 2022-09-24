const express = require("express")
const ejsMate = require('ejs-mate')
const path = require('path')
const axios = require('axios').default;
const fs = require('fs');
const app = express();
app.use(express.static(path.join(__dirname, 'Client')));
app.use(express.urlencoded({ extended: true }))
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/Client/views'));
var methodOverride = require('method-override');
const { log } = require("console");
app.use(methodOverride('_method'));


// Home Route Get Request
app.get("/", (req, res) => {
    res.render("form.ejs")
})

// Home Route Post Request
app.post('/', (req, res) => {
    const { search } = req.body;

    console.log("Search[genre]1 :: ", search.genre);

    if (typeof search.genre === 'string' || search.genre instanceof String) {
        var s = search.genre;
    }
    else {
        var s = "";
        for (let i of search.genre) {
            // console.log(i);

            s = s.concat(",", i.toLowerCase());

        }
        s = s.substring(1);
    }
    search["page"] = 1;
    search.genre = s;
    console.log("Search[genre]2 :: ", search.genre);
    search.min_idbm = Number(search.min_idbm);
    // min_idbm

    // console.log("Search :: ", search);

    const options = {
        method: 'GET',
        url: 'https://ott-details.p.rapidapi.com/advancedsearch',
        params: search,
        headers: {
            'X-RapidAPI-Key': '03ffe1cadcmshe653975363c53a4p1ffa00jsn7d40601cb65f',
            'X-RapidAPI-Host': 'ott-details.p.rapidapi.com'
        }
    };
    // console.log("search :: \n", search);
    // axios.request(options).then(function (response) {
    //     console.log(response.data);
    //     res.render("search.ejs", { search: response.data.results });
    // }).catch(function (error) {
    //     console.error(error);
    // });




    fs.readFile('data.json', (err, data) => {
        if (err) throw err;
        let d = JSON.parse(data);
        // console.log(data);
        res.render("search.ejs", { search: d.results });


    });
});


app.post('/search', (req, res) => {
    const { search } = req.body;
    // console.log(search);
    search["page"] = 1;

    const options = {
        method: 'GET',
        url: 'https://ott-details.p.rapidapi.com/search',
        params: search,
        headers: {
            'X-RapidAPI-Key': '03ffe1cadcmshe653975363c53a4p1ffa00jsn7d40601cb65f',
            'X-RapidAPI-Host': 'ott-details.p.rapidapi.com'
        }
    };

    axios.request(options).then(function (response) {
        console.log(response.data);
        res.render("search.ejs", { search: response.data.results });
    }).catch(function (error) {
        console.error(error);
    });


});



app.listen(3000, () => {
    console.log('Listning on port 3000');
})