var config = require('./config');
var appController = require('./app/controllers/app');

app = module.parent.exports.app;

app.get('/', appController.root);

