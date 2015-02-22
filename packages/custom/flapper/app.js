'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Flapper = new Module('flapper');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Flapper.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  Flapper.routes(app, auth, database);

  //We are adding a link to the main menu for all authenticated users
  Flapper.menus.add({
    title: 'Flapper',
    link: 'flapper example page',
    roles: ['authenticated'],
    menu: 'main'
  });

  Flapper.aggregateAsset('css', 'flapper.css');

  /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Flapper.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Flapper.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Flapper.settings(function(err, settings) {
        //you now have the settings object
    });
    */

  return Flapper;
});
