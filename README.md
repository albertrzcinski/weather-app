# Weather application
This is a application to check the weather conditions in cities around the world. Built with HTML5, SCSS and vanilla JavaScript.

## Setup
+ Clone this repo to your desktop and go to it's root directory.

+ You have to provide API key from your account on https://www.weatherapi.com/ for the correct operation of the application. To do this edit `src/js/index.js`. For more information visit https://www.weatherapi.com/docs

+ You can run `npm start` to start the application with https://browsersync.io/

+ Your site is now running at `http://localhost:3000`.

### Development
You can install devDependencies by run `npm install`. After that you can run `npm run watch:all` to start application and watch files. You can add vendor prefixes in your CSS by run `npm run build:css`.

What will be also used :
+ ESLint & AirBnB config
+ `node-sass` to compilation of SCSS to CSS
+ `onchange` for detect changes in files
+ Autoprefixer