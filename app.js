var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(multer()); // for parsing multipart/form-data

app.use(express.static(__dirname + '/public'));

var favorites = [];
var cart = [];
var products = [
    {
        id: 1752745, name: "Apple - iPhone 4s 8GB Cell Phone - Black", image: "http://img.bbystatic.com/BestBuy_US/images/products/1752/1752745_sc.jpg", salePrice: 100,
        regularPrice: 150, shortDesc: "3.5-inch Retina displayA5 chip8MP iSight camera1080p HD video recordingFaceTime HD camera",
        reviews:[
                 {id:11, title:"Nice one. . . .", description:"This is my first smart phone and I am really happy with it.",
                	 reviewer: "Bob"},
                 {id:12, title:"Love this phone", description:" I was pretty surprise at how much I really liked this item. I have had other mobiles for similar price, but this one looks great, " +
                 		"and really saves room on my pocket compared to the others. its truly great because it is simplistic and clean cut looking.",
                     reviewer: "Jesse"},	
                 {id:13, title:"Nice phone", description:" Great bang for the buck paid what most used ones go for and got it new",
                     reviewer: "Steve"},    
                 ]
    },
    {
        id: 1752291, name: "Apple - iPhone 5c 16GB  Cell Phone - Green (AT&T)", image: "http://img.bbystatic.com/BestBuy_US/images/products/1729/1729354_sc.jpg", salePrice: 75,
        regularPrice: 100, shortDesc: "4-inch Retina displayA6 chip8MP iSight camera1080p HD video recordingFaceTime HD camera",
        reviews:[
                 {id:21, title:"Great phone for the price.", description:"My wife loves her phone, way better than her old one.",
                	 reviewer: "TheIntersect76"},
                 {id:22, title:"Love my phone", description:" Good phone but the screen broke easily the first time i dropped it. Other than that awesome lightweight phone that I love..",
                     reviewer: "Steve"},	
                 {id:23, title:"Great phone", description:" This is a Great iphone a lot better than my old iphone 3G",
                     reviewer: "Jesse"},    
                 {id:24, title:"Does what I expected it to do", description:" Nice smart phone that does what I expected it to do. Texting can be a bit hard with the small keyboard but if I " +
                 		"ever learn to use the dictation part maybe that would solve most problems. My biggest complaint is always being asked to review everything.G",
                     reviewer: "Bob"} 
                 ]
    },
    {
        id: 9783423, name: "Nokia - 350W Bass Guitar Amplifier Head - Black", image: "http://img.bbystatic.com/BestBuy_US/images/products/9910/9910115_sc.jpg", salePrice: 180,
        regularPrice: 200, shortDesc: "From our expanded online assortment; compatible with most 350W or 250W bass speaker cabinets; 2 preamp input controls",
        reviews:[
                 {id:31, title:"Basic phone", description:"It's a simple phone that does the job well. keep in mind this is a basic phone. dont expect much. Best to be realistic",
                	 reviewer: "Irene"},
                 {id:32, title:"Worth it", description:"One of the best phones that I ever bought. I would say it a product worth its value.",
                     reviewer: "TheIntersect76"}
                 ]
    }

];

var users = [
             {
            	 id:"Bob", firstName:"Michel", lastName:"Bob", Interests :[ {name:"mobiles"}, {name:"All apple products"}, {name:"electronics"}],
            	 reviewed:[{id:11},{id:24}]
             },
             {
            	 id:"Jesse", firstName:"Jesse", lastName:"Pinkman", Interests :[ {name:"televisions"}, {name:"Nokia products"}, {name:"Thanksgiving deals"}],
             	reviewed:[{id:12},{id:23}]
             },
             {
            	 id:"Steve", firstName:"Steve", lastName:"Mortan", Interests :[ {name:"T-mobile offers"}, {name:"Home appliances"}],
            	 reviewed:[{id:13},{id:22}]
             },
             {
            	 id:"TheIntersect76", firstName:"Christi", lastName:"Josh", Interests :[ {name:"Diamond jewels"}, {name:"Furnitures"}],
            	 reviewed:[{id:21},{id:32}]
             },
             {
            	 id:"Irene", firstName:"Irene", lastName:"Molman", Interests :[ {name:"LCD Tvs"}, {name:"Sound system"}],
            	 reviewed:[{id:31}]
             }
             
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

app.get('/shopping/cart', function (req, res) {
    res.json(cart);
});

app.get('/shopping/reviews/:id', function(req,res){
	for(var j in products){
		if(products[j].id == req.params.id){
			res.json(products[j].reviews);
		}
	}
});

app.get('/shopping/getReviewerDetails/:id', function(req,res){
	var userProfile = null;
	for(var j in users){
		if(users[j].id == req.params.id){
			userProfile = users[j];
			break;
		}
	}
	
	for(var k in userProfile.reviewed){
		for(var p in products){
			for(var r in products[p].reviews){
				if(products[p].reviews[r].id == userProfile.reviewed[k].id){
					userProfile.reviewed[k] = products[p].reviews[r];
				}
			}
		}
	}
	
	res.json(userProfile);
});

app.post('/addFavorite', function (req, res) {
    favorites.push(req.body);
    res.json(favorites);
});

app.post('/shopping/addToCart', function (req, res) {
    cart.push(req.body);
    console.log(req.body.id);
    for(var a in cart){
    	if(cart[a].id == req.body.id){
    		cart[a].count = Number(1);
    	}
    }
});

app.post('/shopping/addReview/:review/:reviewId', function(req,res){
	var k;
	for(k in products){
		if(products[k].id == req.params.reviewId){
			var revId;
			for(r in products[k].reviews){
				revId = products[k].reviews[r].id;
			}
			products[k].reviews.push(req.params.review);
			products[k].reviews[Number(r)+1].id = Number(revId)+1;
			res.json(products[k].reviews);
		}
	}
});

app.delete('/shopping/removeCartItem/:index', function (req, res) {
            cart.splice(req.params.index, 1);
            res.json(cart);
});

app.put('/shopping/update', function (req, res) {
    for (var j in products) {
    	console.log(String(products[j].id));
        if (products[j].id == req.body.id) {
            products[j] = req.body;
        }
    }
});

app.put('/shopping/updateCount/:id/:count', function (req, res) {
    cart[req.params.id].count = req.params.count;
    res.json(cart);
    });

app.post('/add', function (req, res) {
    products.push(req.body);
    res.json(products);
});

var ip = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

app.listen(port,ip);