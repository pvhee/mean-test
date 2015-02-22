'use strict';

angular.module('mean.flapper').config(['$stateProvider',
  function($stateProvider) {


    $stateProvider
      .state('flapper example page', {
        url: '/flapper',
        templateUrl: 'flapper/views/index.html'
      });
      // .state('post', {
      //   url: '/flapper/:postId',
      //   templateUrl: 'flapper/views/post.html',
      // });


  }
]);
