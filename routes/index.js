'use strict';

module.exports = function(app) {

  app.get('/', function(req, res) {
      res.redirect('opportunities/1');
  });

  app.get('/opportunities', function(req, res) {
      res.redirect('opportunities/1');
  });

  app.get('/opportunities/:page', function(req, res) {
      res.render('pages/opportunities', {info: req.params.page});
  });

  app.get('/upload', function(req, res) {
      res.render('pages/upload');
  });

  app.get('/login', function(req, res) {
      res.render('pages/login');
  });

  app.get('/admin', function(req, res) {
    //if (req.session.loggedin) {
      res.render('pages/protected/admin')
    //} else {
    //  return res.send('Please login to view this page!');
    //}
  });

  app.get('/admin/completed', function(req, res) {
    if (req.session.loggedin) {
      res.redirect('back');
    } else {
     return res.send('Please login to view this page!');
    }
  });

};
