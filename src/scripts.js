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
import fetchAllData from './apiCalls';
import * as dayjs from 'dayjs';
import Trip from './Trip';
import Traveler from './Traveler';
import {
  renderDestinationsGrid,
  renderTripsGrid,
  renderCurrentTrip,
  displayBookTripPage,
  // cardsGrid,
  // tripsButtons,
} from './domUpdates';

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

// query selectors 👇
const tripsButtons = document.getElementById('aside');
// export const cardsGrid = document.getElementById('cardsGrid');
export const mainDisplay = document.getElementById('main');

// global variables 👇
export let dateToday = dayjs().format('YYYY/MM/DD');
export let currentTraveler, trips, destinationsData;

// // event listeners 👇
// window.addEventListener('load', fetchAllData);
// tripsButtons.addEventListener('click', () => {
//   renderTripsGrid(e);
// });

// event handlers and functions 👇
const getTrips = (tripsData, travelerData, destinationsData) => {
  trips = tripsData
    .filter((trip) => trip.userID === travelerData.id)
    .map((trip) => {
      const instantiatedTrip = new Trip(trip, destinationsData);
      return instantiatedTrip;
    });
};

const getTraveler = (travelerData, instantiatedTrips) => {
  currentTraveler = new Traveler(travelerData, instantiatedTrips);
};

const updateClassProperties = (dateToday) => {
  trips.forEach((trip) => {
    trip.updateTripProperties();
  });
  currentTraveler.sortAllTripsByDate(dateToday);
  currentTraveler.categorizeTrips(dateToday);
  currentTraveler.getSpendingYTD(dateToday);
  console.log(currentTraveler.upcomingTrips);
};

const displayDashboard = () => {
  renderDestinationsGrid();
  updateClassProperties(dateToday);
  renderCurrentTrip();
};

fetchAllData()
  .then((data) => {
    let travelerData = data[0];
    let tripsData = data[1].trips;
    destinationsData = data[2].destinations;
    getTrips(tripsData, travelerData, destinationsData);
    getTraveler(travelerData, trips);
    console.log('in fetch data');
  })
  .then(displayDashboard);
// .catch((error) => showErrorMessage(error));
// .then((data) => console.log(data));

// when do you I need to error handle???

// event listeners 👇
window.addEventListener('load', fetchAllData);
tripsButtons.addEventListener('click', renderTripsGrid);
mainDisplay.addEventListener('click', displayBookTripPage);
