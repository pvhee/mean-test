'use strict';

/* jshint -W098 */
angular.module('mean.flapper').controller('FlapperController', ['$scope', 'postsService', 'Global', 'Flapper',
  function($scope, postsService, Global, Flapper) {


    var loadAll = function() {
      // Load data into $scope from our service, which uses
      // Rest interface powered by our express app
      postsService.all()
        .then(function(data) {
          $scope.posts = data.data;
        });
    }

    $scope.addPost = function() {
      if (!$scope.title || $scope.title === '') {
        return;
      }

      postsService.create({
        title: $scope.title,
        link: $scope.link
      }).then(function(data) {
        $scope.posts.push(data.data);
      });

      $scope.title = '';
      $scope.link = '';
    };

    $scope.deletePost = function(post) {
      postsService.delete(post).then(function(data) {
        // Refresh all, easier than taking off one
        loadAll();
      })
    }

    $scope.incrementUpvotes = function(post) {
      postsService.upvote(post).then(function(data) {
        post.upvotes += 1;
      });
    };

    $scope.findOne = function() {
      console.log('getone');
      postsService.get({
        postId: $stateParams.postId
      }, function(post) {
        $scope.post = post;
      });
    };

    // Load all!
    loadAll();

    $scope.global = Global;
    $scope.package = {
      name: 'flapper'
    };
  }
]);
