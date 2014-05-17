# krakn
### Real-time chat application built with AngularJS, Firebase & Ionic

[![Gitter chat](https://badges.gitter.im/XachMoreno/krakn.png)](https://gitter.im/XachMoreno/krakn)

## Directory Layout

    app/                --> all of the files to be used in production
      css/              --> css files
        app.css         --> default stylesheet
      img/              --> image files
      index.html        --> app layout file (the main html template file of the app)
      index-async.html  --> just like index.html, but loads js files asynchronously
      js/               --> javascript files
        app.js          --> application
        config.js       --> custom angularFire config file
        controllers.js  --> application controllers
        directives.js   --> application directives
        filters.js      --> custom angular filters
        services.js     --> custom angular services
      lib/              --> angular and 3rd party javascript libraries
        angular/        --> the latest angular js libs
          version.txt       --> version number
        firebase/
          angularFire.*.js  --> the angularFire adapter
      partials/             --> angular view partials (partial html templates)
        home.html           --> a rudimentary $firebase().$bind() example
        chat.html           --> a $firebase() sync used as an array, with explicit bindings
        login.html          --> authentication and registration using $firebaseAuth
        account.html        --> a secured page (must login to view this)

    config/karma.conf.js        --> config file for running unit tests with Karma
    config/karma-e2e.conf.js    --> config file for running e2e tests with Karma
    config/security-rules.json  --> sample security rules for your Firebase

    scripts/            --> handy shell/js/ruby scripts
      e2e-test.sh       --> runs end-to-end tests with Karma (*nix)
      e2e-test.bat      --> runs end-to-end tests with Karma (windows)
      test.bat          --> autotests unit tests with Karma (windows)
      test.sh           --> autotests unit tests with Karma (*nix)
      web-server.js     --> simple development webserver based on node.js

    test/               --> test source files and libraries
      e2e/              -->
        runner.html     --> end-to-end test runner (open in your browser to run)
        scenarios.js    --> end-to-end specs
      lib/
        angular/                --> angular testing libraries
          angular-mocks.js      --> mocks that replace certain angular services in tests
          angular-scenario.js   --> angular's scenario (end-to-end) test runner library
          version.txt           --> version file
      unit/                     --> unit level specs/tests
        *Spec.js                --> specs for a specific module in app/js

## Contact

More information on AngularFire: http://angularfire.com
More information on Firebase: http://firebase.com
More information on AngularJS: http://angularjs.org/
More information on Ionic: http://ionicframework.com/
