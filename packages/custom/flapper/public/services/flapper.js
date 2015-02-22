'use strict';

angular.module('mean.flapper').factory('Flapper', [
  function() {
    return {
      name: 'flapper'
    };
  }
]);


angular.module('mean.flapper').factory('postsService', ['$http',
  function($http) {

    // We are gonna return a bunch of promises
    return {
      all: function() {
        return $http.get('/posts');
      },
      create: function(post) {
        return $http.post('/posts', post);
      },
      delete: function(post) {
        return $http.delete('/posts/' + post._id);
      },
      upvote: function(post) {
        return $http.put('/posts/' + post._id + '/upvote');
      }
    };

    // var o = {
    //   // 'posts': [
    //   //   {title: 'post 1', upvotes: 5},
    //   //   {title: 'post 2', upvotes: 2},
    //   //   {title: 'post 3', upvotes: 15},
    //   //   {title: 'post 4', upvotes: 9},
    //   //   {title: 'post 5', upvotes: 4}
    //   // ],
    //   'getAll': function() {
    //     return $http.get('/posts').success(function(data) {
    //       angular.copy(data, o.posts)
    //     });
    //   }
    // };

    // return o;
  }
]);
