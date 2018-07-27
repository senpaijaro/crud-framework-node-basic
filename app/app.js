'use strict'
import "babel-polyfill";
//modules  
import express from 'express'
import requireAll from 'require.all'
import {compose} from 'compose-middleware'
import _ from 'underscore'
import validition from 'express-validator'
import cookieParser  from 'cookie-parser'
import bodyParser from 'body-parser'
import path from 'path'
import flash  from 'express-flash'
import session  from 'express-session'
import ejs from 'ejs'

//files
import routes from './application/config/routes'
import policy from './application/config/policies'

//constant variables
const app    = express()
, http = require('http').createServer(app)
, io = require('socket.io').listen(http)
, static_dir   = __dirname+'/node_modules/'
, node_plugins = static_dir.replace('dist/','')
, template = __dirname+'/template/'
, views = template.replace('dist/','')


global.io = io

//set or user function
app.set('views',  path.join(views))
app.set('view engine', 'ejs');
app.use('/assets', express.static(node_plugins))
app.use(validition())
app.use(flash())
app.use(cookieParser());
app.set('trust proxy', 1) // trust first proxy
app.use(session({
    key: 'password!@#$',
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { 
        secure: false, maxAge: 20000000 
    }
}));
//body parser
app.use(bodyParser.urlencoded({ extended: true,limit: '50mb' }));
app.use(bodyParser.json({limit: '50mb'}));

let controllers = requireAll({
	dir: './application/controller', //only files that end with 'controller.js' 
	match: /Controller\.js$/i,
	recursive: false,
	map: (name, path, isFile ) => requireAll.map(name, path, isFile).replace(/Controller$/i,'')
}),
policies = requireAll({
	dir: './application/policies',
  	match: /Policy\.js$/i, //only files that end with 'controller.js' 
})

_.each(routes, function(value, index){
	let getApi = index.split(" "),
	path = value.split("."),
	middleware = []

	_.each(policy["policies"], function(val, ind){
		if(path[0] == ind && path[1] in val){
			middleware = val[path[1]];
			return false;
		}
	});

	_.each(middleware, function(val, ind){
		if(val.indexOf("Policy") > -1 ){
			middleware[ind] = policies[val];
		}
	});
	const change = getApi[0]
	middleware.push(controllers[path[0]][path[1]])
	app[change.toLowerCase()](getApi[1], compose(middleware))
})


http.listen(4200, "0.0.0.0", function(){
	console.log('running port 4200');
});