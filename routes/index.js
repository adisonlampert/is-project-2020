'use strict';

module.exports = function(app) {

  app.get('/', function(req, res) {
      res.render('pages/opportunities');
  });

  app.get('/home', function(req, res) {
      res.render('pages/opportunities');
  });

  app.get('/upload', function(req, res) {
      res.render('pages/upload');
  });

  app.get('/login', function(req, res) {
      res.render('pages/login');
  });

  app.get('/admin', function(req, res) {
    if (req.session.loggedin) {
      res.render('pages/protected/admin')
    } else {
      return res.send('Please login to view this page!');
    }
  });

};
