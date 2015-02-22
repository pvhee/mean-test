'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Post = mongoose.model('Post'),
  _ = require('lodash');


/**
 * Find post by id
 *
 * Will also allow :postId to be used everywhere and smartly replaced by a post
 */
exports.post = function(req, res, next, id) {

  var query = Post.findById(id);
  query.exec(function(err, post) {
    if (err) return next(err);
    if (!post) return next(new Error('Failed to load post ' + id));
    req.post = post;
    return next();
  });

  // Post.load(id, function(err, post) {
  //   if (err) return next(err);
  //   if (!post) return next(new Error('Failed to load post ' + id));
  //   req.post = post;
  //   next();
  // });
}

/**
 * Show an article
 */
exports.show = function(req, res) {
  res.json(req.post)
}

/**
 * Creates a new post
 */
exports.create = function(req, res) {
  var post = new Post(req.body);
  post.save(function(err) {
    if (err) {
      return res.status(500).json({
        error: 'Cannot save the article'
      });
    }
    res.json(post);
  });
};

/**
 * Deletes a post
 */
exports.delete = function(req, res) {
  var post = req.post;

  post.remove(function(err) {
    if (err) {
      return res.status(500).json({
        error: 'Cannot delete the post'
      });
    }
    res.json(post);
  });
}

/**
 * Upvote a post
 */
exports.upvote = function(req, res, next) {
  req.post.upvote(function(err, post) {
    if (err) { return next(err); }
    res.json(post);
  });
}


/**
 * List of all posts
 */
exports.all = function(req, res) {
  Post.find(function(err, posts) {
    if (err) { return next(err); }
    res.json(posts);
  });

};
