var fs = require('fs');
var http = require('http');
var url = require('url');
var crypto = require("crypto");  
var utils = require('../../lib/utils.js');
var config = require('../../config');
var model = require('./../models/model.js');


exports.root = function(req, res){
  var data = {};
  //res.render('root', {layout: 'layout.jade', data:data});
  res.render('root');
}