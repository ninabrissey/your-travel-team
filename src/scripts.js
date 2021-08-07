// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// import and export syntax video found here
// https://www.youtube.com/watch?v=_3oSWwapPKQ

// Examples
// scripts 👇
// import ActivityRepository from './ActivityRepository';
// import {
//   displayAllData,
//   weeksWaterInput,
//   displayUserSelectWeek,
// } from './domUpdates';
import getAllData from './apiCalls';

// An example of how you tell webpack to use a CSS (SCSS) file - look at @use here instead of import - must impost ALL scss files here
// styling 👇
import './css/base.scss';
import './css/_reset.scss';
import './css/_variables.scss';
// example of @use syntax - didn't work in fitlit
// @use ‘_colors.scss’ as *;

// An example of how you tell webpack to use an image (also need to link to it in the index.html - example in html)
// images 👇
import './images/turing-logo.png';

// An example of exports to the dom file (after all imports put the exports)
// exports 👇
// export { currentUser, userRepo, hydrationStats, sleepStats, activityStats };

console.log('This is the JavaScript entry file - your code begins here.');

// global variables 👇

// event listeners 👇

// event handlers and functions 👇
getAllData().then((data) => {
  console.log(data[2]); // instantiate all destinations to display on dom for the user
  console.log(data[0]); // build helper function to instantiate/get user
  console.log(data[1]); // build helper function to filter through array to instantiate/get all users trips // will eventually need to filter by date for past/present/future/pending and have those arrays on the user class
});
// .then((data) => console.log(data));

// when do you I need to error handle???
