/**
 * Created by Tejaswi Rana on 5/22/16.
 */


//
//Welcome to app.js
//This is main application config of project. You can change a setting of :
//  - Global Variable
//  - Theme setting
//  - Icon setting
//  - Register View
//  - Spinner setting
//  - Custom style
//
//Global variable use for setting color, start page, message.

window.globalVariable = {
  //custom color style variable
  color: {
    appPrimaryColor: ""
  },// End custom color style variable
  startPage: {
    url: "/app/home",//Url of start page.
    state: "app.home"//State name of start page.
  },
  message: {
    errorMessage: "Technical error please try again later!", //Default error message.
    privacyTitle: "Terms of Use and Privacy",
    privacyContent: "By downloading or using the app, these terms will automatically apply.",
    privacyNotSelectedMessage: "You must accept terms and conditions to use this app."

  },
  weather: {
    current_weather: 'http://api.openweathermap.org/data/2.5/weather',
    five_day_forecast: 'http://api.openweathermap.org/data/2.5/forecast/city',
    token: '003eb7a7d55b82788dbe5f66b766688f',
    sydney_city_id: '6619279',
    hobart_city_id: '2163355',
    units_celsius: 'metric',
    units_farenheit: 'imperial',
    units_kelvin: ''
  }
};// End Global variable


angular.module('yieldWeather', ['ionic','ngIOS9UIWebViewPatch', 'yieldWeather.controllers', 'ngMaterial', 'ngMessages', 'ngCordova','ngMdIcons'])

  .run(function($ionicPlatform, $rootScope, $ionicHistory, $state, $mdDialog, $mdBottomSheet) {

    function initialiseRootScope() {
      $rootScope.appPrimaryColor = appPrimaryColor;// Add value of appPrimaryColor to rootScope for use it to base color.
      $rootScope.isAndroid = ionic.Platform.isAndroid();// Check platform of running device is android or not.
      $rootScope.isIOS = ionic.Platform.isIOS();// Check platform of running device is ios or not.
    };

    function hideActionControl() {
      //For android if user tap hardware back button, Action and Dialog should be hide.
      $mdBottomSheet.cancel();
      $mdDialog.cancel();
    };


    // Create custom defaultStyle.
    function getDefaultStyle() {
      return "" +
        ".material-background-nav-bar { " +
        "   background-color        : " + appPrimaryColor + " !important; " +
        "   border-style            : none;" +
        "}" +
        ".md-primary-color {" +
        "   color                     : " + appPrimaryColor + " !important;" +
        "}";
    }// End create custom defaultStyle



    // createCustomStyle will change a style of view while view changing.
    // Parameter :
    // stateName = name of state that going to change for add style of that page.
    function createCustomStyle(stateName) {
      var customStyle =
        ".material-background {" +
        "   background-color          : " + appPrimaryColor + " !important;" +
        "   border-style              : none;" +
        "}" +
        ".spinner-android {" +
        "   stroke                    : " + appPrimaryColor + " !important;" +
        "}";


      customStyle += getDefaultStyle();

      return customStyle;
    }// End createCustomStyle

    // Add custom style while initial application.
    $rootScope.customStyle = createCustomStyle(window.globalVariable.startPage.state);


    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }


      initialiseRootScope();


      //Checking if view is changing it will go to this function.
      $rootScope.$on('$ionicView.beforeEnter', function () {
        //hide Action Control for android back button.
        hideActionControl();
        // Add custom style ti view.
        $rootScope.customStyle = createCustomStyle($ionicHistory.currentStateName());
      });


    });
  })

  .config(function($ionicConfigProvider, $stateProvider, $urlRouterProvider, $mdThemingProvider, $mdIconProvider, $mdColorPalette) {

    // Use for change ionic spinner to android pattern.
    $ionicConfigProvider.spinner.icon("android");
    $ionicConfigProvider.views.swipeBackEnabled(false);

    // mdIconProvider is function of Angular Material.
    // It use for reference .SVG file and improve performance loading.
    $mdIconProvider
      .icon('facebook', 'img/icons/facebook.svg')
      .icon('twitter', 'img/icons/twitter.svg')
      .icon('mail', 'img/icons/mail.svg')
      .icon('message', 'img/icons/message.svg')
      .icon('share-arrow', 'img/icons/share-arrow.svg')
      .icon('more', 'img/icons/more_vert.svg');
//mdThemingProvider use for change theme color of Ionic Material Design Application.
    /* You can select color from Material Color List configuration :
     * red
     * pink
     * purple
     * purple
     * deep-purple
     * indigo
     * blue
     * light-blue
     * cyan
     * teal
     * green
     * light-green
     * lime
     * yellow
     * amber
     * orange
     * deep-orange
     * brown
     * grey
     * blue-grey
     */
    //Learn more about material color patten: https://www.materialpalette.com/
    //Learn more about material theme: https://material.angularjs.org/latest/#/Theming/01_introduction
    $mdThemingProvider
      .theme('default')
      .primaryPalette('light-green')
      .accentPalette('blue');

    appPrimaryColor = $mdColorPalette[$mdThemingProvider._THEMES.default.colors.primary.name]["800"]; //Used to get base color of theme.


    //$stateProvider is used for adding or editing HTML view to navigation bar.
    //
    //Schema :
    //state_name(String)      : Name of state to use in application.
    //page_name(String)       : Name of page to present at localhost url.
    //cache(Bool)             : Cache of view and controller default is true. Change to false if you want page reload when application navigate back to this view.
    //html_file_path(String)  : Path of html file.
    //controller_name(String) : Name of Controller.
    //
    //Learn more about ionNavView at http://ionicframework.com/docs/api/directive/ionNavView/
    //Learn more about  AngularUI Router's at https://github.com/angular-ui/ui-router/wiki
    $stateProvider

      .state('app', {
        url: "/app",
        abstract: true,
        templateUrl: "templates/menu/html/menu.html",
        controller: 'menuCtrl'
      })

      .state('app.home', {
        url: '/home',
        views: {
          'menuContent': {
            templateUrl: 'templates/weather/html/weather.html',
            controller: 'weatherCtrl'
          }
        }
      });


    //Use $urlRouterProvider.otherwise(Url);
    $urlRouterProvider.otherwise(window.globalVariable.startPage.url);
  });
