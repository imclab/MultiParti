
/**
 * Module dependencies.
 */

var render = require('./lib/render');
var route = require('koa-route');
var views = require('co-views');
var parse = require('co-body');
var logger = require('koa-logger');
var koa = require('koa');
var wrap = require('co-monk');
var monk = require('monk');


var db = monk('localhost/multi-party');
var worlds = wrap(db.get('worlds'));

var app = koa();

// "database"

var posts = [];

// middleware

app.use(logger());

// route middleware

app.use(route.get('/', list));
app.use(route.get('/world/new', add));
app.use(route.get('/world/:id', show));
app.use(route.post('/world', create));

// route definitions

/**
 * Post listing.
 */

function *list() {
  allWorlds = yield worlds.find({})
  console.log(worlds)
  this.body = yield render('list.jade', {worlds: allWorlds});
}

/**
 * Show creation form.
 */

function *add() {
  this.body = yield render('new');
}

/**
 * Show post :id.
 */

function *show(id) {
  this.body = "post!"
}

/**
 * Create a post.
 */

function *create() {
  this.redirect('/');
}

// listen

app.listen(3000);
console.log('listening on port 3000');