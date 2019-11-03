'use strict';

const logger          =   require('morgan');
const cookieParser    =   require('cookie-parser');
const bodyParser      =   require('body-parser');
const cors 			  =	  require('cors');


module.exports = function(app){

	// use morgan to log requests to the console
	app.use(logger('dev'));

	// use body parser so we can get info from POST and/or URL parameters
	app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
	app.use(bodyParser.json({limit: '50mb'}));
    app.use(cookieParser());
	app.use(cors());
}
