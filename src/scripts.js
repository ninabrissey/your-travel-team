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
} from './domUpdates';

// styling 👇
import './css/base.scss';
import './css/_reset.scss';
import './css/_variables.scss';

// query selectors 👇
const tripsButtons = document.getElementById('aside');
export const mainDisplay = document.getElementById('main');
const bookTripBtn = document.getElementById('bookNow');
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
  updateClassProperties(dateToday);
  currentTraveler.getSpendingYTD(dateToday);
  displayTravelerDashBoard();
};

// .catch((error) => showErrorMessage(error));
// .then((data) => console.log(data));

// when do you I need to error handle???

// event listeners 👇
window.addEventListener('load', startApp);
tripsButtons.addEventListener('click', renderTripsGrid);
mainDisplay.addEventListener('click', displayBookTripPage);
bookTripBtn.addEventListener('click', renderDestinationsGrid);

// getEstimateBtn.addEventListener('click', getTripEstimate);
