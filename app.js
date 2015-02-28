var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var app = express();


app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(multer()); // for parsing multipart/form-data

app.use(express.static(__dirname + '/public'));

app.get("/", function(req,res){
	console.log("hello i'm up");
})

var favorites = [];
var products = [
    {
        id: 1752745, name: "Apple - iPhone 4s 8GB Cell Phone - Black", image: "http://img.bbystatic.com/BestBuy_US/images/products/1752/1752745_sc.jpg", salePrice: 100,
        regularPrice: 150, shortDesc: "3.5-inch Retina displayA5 chip8MP iSight camera1080p HD video recordingFaceTime HD camera"
    },
    {
        id: 1752291, name: "Apple - iPhone 5c 16GB  Cell Phone - Green (AT&T)", image: "http://img.bbystatic.com/BestBuy_US/images/products/1729/1729354_sc.jpg", salePrice: 75,
        regularPrice: 100, shortDesc: "4-inch Retina displayA6 chip8MP iSight camera1080p HD video recordingFaceTime HD camera"
    },
    {
        id: 9783423, name: "Nokia - 350W Bass Guitar Amplifier Head - Black", image: "http://img.bbystatic.com/BestBuy_US/images/products/9910/9910115_sc.jpg", salePrice: 180,
        regularPrice: 200, shortDesc: "From our expanded online assortment; compatible with most 350W or 250W bass speaker cabinets; 2 preamp input controls"
    },

];


app.get('/getDetails/:id', function (req, res) {
    for(var i in products){
        if(products[i].id == req.params.id){
            res.json(products[i]);
        }
    }
});

app.get('/getDetails', function (req, res) {
    res.json(products);
});

app.get('/favorites', function (req, res) {
     res.json(favorites);
});

app.post('/addFavorite', function (req, res) {
    favorites.push(req.body);
    res.json(favorites);
});

/*app.delete('/remove/:id', function (req, res) {
    for (var j in products) {
        if (products[j].id == req.params.id) {
            products.splice(j, 1);
        }
    }
    console.log('After removing');
    console.log(products);
});*/

app.put('/update/:product', function (req, res) {
    for (var j in products) {
        if (products[j].id == req.body.id) {
            products[j] = req.body.id;
        }
    }
    console.log('After updating');
    console.log(req.body.id);
});

app.post('/add', function (req, res) {
    products.push(req.body);
    console.log('After adding');
    res.json(products);
});

app.listen(3000);