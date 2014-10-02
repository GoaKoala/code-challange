exports.createServer = function( serverPort ) {

    var express  = require('express');
    var app 	 = express();
    var morgan   = require('morgan');
    var bParser  = require( 'body-parser' );

    var allowCrossDomain = function(req, res, next) {
        res.header('Access-Control-Allow-Origin',  '*');
        res.header('Access-Control-Allow-Methods', 'PUT,GET,OPTIONS,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type, X-PINGOTHER, X-Requested-With');
        next();
    }

    app.use( allowCrossDomain );
    app.use( bParser.json() );
    app.use( morgan( 'combined' ) );
	app.use(function(err, req, res, next){	  
        res.set('Content-Type', 'application/json');
    	res.status(400);
        res.json( { "error": "Could not decode request: JSON parsing failed" } ).end();
	});
    
    app.listen(serverPort, function(){
        console.log( "Service Listening on -port : " + serverPort ); 
    });

    return app;
}