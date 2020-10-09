'use strict';

module.exports = function(environment) {
  let ENV = {
    modulePrefix: 'jobs2',
    environment,
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. EMBER_NATIVE_DECORATOR_SUPPORT: true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },
    
    firebase: {
      apiKey: "AIzaSyCi-jS4qodE1f6bJZ_Gs39ZJ-twEAl6mY8",
      authDomain: "jobs-data-db9a8.firebaseapp.com",
      databaseURL: "https://jobs-data-db9a8.firebaseio.com",
      projectId: "jobs-data-db9a8",
      storageBucket: "jobs-data-db9a8.appspot.com",
      messagingSenderId: "829928103309",
      appId: "1:829928103309:web:b5d9089186cb8b9db8b1c4"
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
  }

  if (environment === 'production') {
    // here you can enable a production-specific feature
  }

  return ENV;
};
