#!/usr/bin/env node

var debug = require('debug')('passport-mongo'),
    app = require('./app');

//Set app to run on port #3000
app.set('port', process.env.PORT || 3030);

var server = app.listen(app.get('port'), function() {
  debug('Express server listening on port ' + server.address().port);
});
