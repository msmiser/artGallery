//this file says what page to show

var express=require("express");
var router=express.Router();
var artists_raw= require("../db/Artist.js");
var art_raw= require("../db/Art.js");
var headers;

    router.get('/', function (req, res) {
        var artistsObject = {
            artists: artists_raw,
            art: art_raw,
        };
        res.render('index', artistsObject);  
    });

    router.get('/artist/:id', function (req,res) {
        var thisArtist = req.params.id;
        const bio = artists_raw.find( person=> person.name === thisArtist );
        const work = art_raw.filter( works=> works.category === thisArtist );
        var artistPage={
            artists: artists_raw,
            artist_name: bio.displayName,
            artist_desc: bio.description,
            art: work 
        };
        res.render('artist', artistPage);    
    });

    router.get('/art/:id', function (req,res) {
        headers=req.headers;
        // console.log(req);
        var thisPiece = req.params.id;
        const piece = art_raw.find( work=> work.id === thisPiece );
        var artPage={
            artists: artists_raw,
            art_info: piece ,
            hostdata: headers.host 
        };
        res.render('art', artPage);    
    });

    router.post('/purchase/:id', function (req,res) {
        headers=req.headers;
        var purchPiece = req.params.id;
        console.log(purchPiece);
        var purchaseData={
            quantity: req.body.quantity,
            total: req.body.total,
            hostdata: headers.host
        }

        const items = art_raw.find( work=> work.id === purchPiece );
        headers=req.headers;
        var purchPage={
            art_info: items,
            purchaseData: purchaseData,
            hostdata: headers.host   
        };
        
        res.render('purchase', purchPage);
        // res.send({err: 0, redirectUrl: "/purchase/"+purchPiece});    
    });



module.exports = router;
