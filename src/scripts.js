// scripts 👇
import { fetchAllData, postData, fetchData } from './apiCalls';
import * as dayjs from 'dayjs';
import Trip from './Trip';
import Traveler from './Traveler';
import {
  renderDestinationsGrid,
  renderTripsGrid,
  displayBookTripPage,
  displayTravelerDashBoard,
  displayEstimatedTripCost,
  displayFormNotFilledError,
  destinationSelected,
  hide,
  show,
  displaySuccessfulTripRequest,
} from './domUpdates';

// export let getEstimateBtn;

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

// global variables 👇
let currentUserID;
export let dateToday = dayjs().format('YYYY/MM/DD');
export let currentTraveler;
export let trips;
export let destinationsData;
export let tripsData;
// export let estimate;
let tripDetails;

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
    currentUserID = passwordNumber;
    getAllData();
  } else {
    username.value = null;
    userPassword.value = null;
    show(loginErrorMessage);
    setTimeout(function () {
      hide(loginErrorMessage);
    }, 4000);
  }
}

const getAllData = () => {
  fetchAllData(currentUserID)
    .then((data) => {
      let travelerData = data[0];
      tripsData = data[1].trips;
      destinationsData = data[2].destinations;
      getTrips(tripsData, travelerData, destinationsData);
      getTraveler(travelerData, trips);
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
  console.log(trips);
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

  console.log(' currentTraveler.spendingYTD:', currentTraveler);
};

export const getTripEstimate = () => {
  let tripForm = document.getElementById('tripForm');
  let tripDate = document.getElementById('start').value;
  let formattedStartDate = dayjs(tripDate).format('YYYY/MM/DD');
  let duration = document.getElementById('duration').value;
  let numOfTravelers = document.getElementById('travelers').value;

  if (formattedStartDate === '' || !duration || !numOfTravelers) {
    displayFormNotFilledError(tripDate, duration, numOfTravelers);
    return;
  }
  if (!formattedStartDate || duration || numOfTravelers) {
    hide(tripForm);

    tripDetails = {
      id: Date.now(),
      userID: currentTraveler.id,
      destinationID: destinationSelected.id,
      travelers: parseInt(numOfTravelers),
      date: dayjs(tripDate).format('YYYY/MM/DD'),
      duration: parseInt(duration),
      status: 'pending',
      suggestedActivities: [],
      tripsDestination: destinationSelected,
    };

    currentTraveler.stagedTrip = new Trip(tripDetails, destinationsData);
    currentTraveler.stagedTrip.updateTripProperties();
    let tripEstimate = currentTraveler.stagedTrip.cost;
    console.log(tripEstimate);
    displayEstimatedTripCost(duration, tripEstimate, numOfTravelers);

    document
      .getElementById('confirmTripBtn')
      .addEventListener('click', postUserTrip);
  }
};

export const postUserTrip = () => {
  const tripRequestObject = {
    id: tripDetails.id,
    userID: tripDetails.userID,
    destinationID: tripDetails.destinationID,
    travelers: tripDetails.travelers,
    date: tripDetails.date,
    duration: tripDetails.duration,
    status: tripDetails.status,
    suggestedActivities: [],
  };
  postData(tripRequestObject, 'trips').then(() => {
    displaySuccessfulTripRequest();
    getAllData();
  });
  // setTimeout(renderDestinationsGrid, 10000);
};

// const timeout = () => {
//   setTimeout(renderDestinationsGrid, 6000);
// };

// let newApprovedTrip = new Trip(data.newTrip);
// newApprovedTrip.updateTripProperties();
// currentTraveler.pendingTrips.unshift(newApprovedTrip);
// getSpendingYTD(dateToday);

// const addToPendingTrips = (data) => {
//   let newApprovedTrip = new Trip(data.newTrip);
//   newApprovedTrip.updateTripProperties();
//   currentTraveler.pendingTrips.unshift(newApprovedTrip);
//   getSpendingYTD(dateToday);
//   setTimeout(function () {
//     renderDestinationsGrid();
//   }, 6000);
// };

const logoutOfApp = () => {
  show(loginPage);
  hide(travelerDashboard);
};

// for dynamically adding querySelectors
export const querySelectAndAddListener = (id, eve, func) => {
  document.getElementById(`${id}`).addEventListener(`${eve}`, func);
};

// event listeners 👇
tripsButtons.addEventListener('click', renderTripsGrid);
mainDisplay.addEventListener('click', displayBookTripPage);
bookTripBtn.addEventListener('click', renderDestinationsGrid);
loginBtn.addEventListener('click', validatePassword);
logoutBtn.addEventListener('click', logoutOfApp);
