// scripts 👇
import { fetchAllData } from './apiCalls';
import * as dayjs from 'dayjs';
import Trip from './Trip';
import Traveler from './Traveler';
import {
  renderDestinationsGrid,
  renderTripsGrid,
  renderCurrentTrip,
  displayBookTripPage,
  displayYearToDateSpent,
  getTripEstimate,
  displayTravelerDashBoard,
  hide,
  show,
} from './domUpdates';

// styling 👇
import './css/base.scss';
import './css/_reset.scss';
import './css/_variables.scss';

// query selectors 👇
let username = document.getElementById('username');
let userPassword = document.getElementById('userPassword');
const travelerDashboard = document.getElementById('travelerDashboard');
const loginPage = document.getElementById('loginPage');
const loginBtn = document.getElementById('loginBtn');
const loginErrorMessage = document.getElementById('loginErrorMessage');
const logoutBtn = document.getElementById('logoutBtn');
const tripsButtons = document.getElementById('aside');
export const mainDisplay = document.getElementById('main');
export const bookTripBtn = document.getElementById('bookNow');
const getEstimateBtn = document.getElementById('getEstimate');

// global variables 👇
export let dateToday = dayjs().format('YYYY/MM/DD');
export let currentTraveler;
export let trips;
export let destinationsData;
export let tripsData;

// event listeners 👇

// display on load 👇

// event handlers and functions 👇
function validatePassword() {
  let passwordString = username.value.slice(0, 8);
  let passwordNumber = parseInt(username.value.slice(8, 10));
  if (
    username.value.length < 11 &&
    passwordString === 'traveler' &&
    passwordNumber > 0 &&
    passwordNumber < 51 &&
    userPassword.value === 'travel'
  ) {
    username.value = null;
    userPassword.value = null;
    startApp();
  } else {
    userPassword.value = null;
    show(loginErrorMessage);
    setTimeout(function () {
      hide(loginErrorMessage);
    }, 4000);
  }
}

const startApp = () => {
  fetchAllData()
    .then((data) => {
      let travelerData = data[0];
      tripsData = data[1].trips;
      destinationsData = data[2].destinations;
      getTrips(tripsData, travelerData, destinationsData);
      getTraveler(travelerData, trips);
      console.log('in fetch data');
    })
    .then(displayDashboard);
};

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
};

const displayDashboard = (dateToday) => {
  hide(loginPage);
  show(travelerDashboard);
  updateClassProperties(dateToday);
  currentTraveler.getSpendingYTD(dateToday);
  displayTravelerDashBoard();
};

const logoutOfApp = () => {
  show(loginPage);
  hide(travelerDashboard);
};

// event listeners 👇

tripsButtons.addEventListener('click', renderTripsGrid);
mainDisplay.addEventListener('click', displayBookTripPage);
bookTripBtn.addEventListener('click', renderDestinationsGrid);
loginBtn.addEventListener('click', validatePassword);
logoutBtn.addEventListener('click', logoutOfApp);
