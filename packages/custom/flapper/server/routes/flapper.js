'use strict';

var posts = require('../controllers/flapper')

/* jshint -W098 */
// The Package is past automatically as first parameter
module.exports = function(Flapper, app, auth, database) {

  app.get('/flapper/example/anyone', function(req, res, next) {
    res.send('Anyone can access this');
  });

  app.get('/flapper/example/auth', auth.requiresLogin, function(req, res, next) {
    res.send('Only authenticated users can access this');
  });

  app.get('/flapper/example/admin', auth.requiresAdmin, function(req, res, next) {
    res.send('Only users with Admin role can access this');
  });

  app.get('/flapper/example/render', function(req, res, next) {
    Flapper.render('index', {
      package: 'flapper'
    }, function(err, html) {
      //Rendering a view from the Package server/views
      res.send(html);
    });
  });

  app.route('/posts')
    .get(posts.all)
    .post(posts.create);

  app.route('/posts/:postId')
    .get(auth.isMongoId, posts.show)
    .delete(auth.isMongoId, posts.delete);

  app.route('/posts/:postId/upvote')
    .put(auth.isMongoId, auth.requiresLogin, posts.upvote);

  // Finish with setting up the postId param
  app.param('postId', posts.post);


};
