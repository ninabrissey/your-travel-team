// scripts 👇
import * as dayjs from 'dayjs';
// import { postData, createPostObject } from './apiCalls';
import { postData } from './apiCalls';

// global variables 👇
import Trip from './Trip';
import {
  dateToday,
  currentTraveler,
  trips,
  destinationsData,
  mainDisplay,
  tripsData,
} from './scripts';
let destinationSelected;
export let tripRequest;
let tripDetails;

// query selectors 👇
const cardsGrid = document.getElementById('cardsGrid');
const mainHeader = document.getElementById('mainHeader');
const currentTripCard = document.getElementById('currentTrip');
const logoutBtn = document.getElementById('logout');
const totalSpentYTD = document.getElementById('totalSpentYTD');

// display upon user log on 👇
export const displayTravelerDashBoard = (traveler, trips) => {
  displayYearToDateSpent();
  renderDestinationsGrid();
  renderCurrentTrip();
};

export const displayYearToDateSpent = () => {
  console.log(currentTraveler);
  totalSpentYTD.innerText = `Total spent traveling with us this year: $${currentTraveler.spendingYTD}`;
};

export const renderDestinationsGrid = () => {
  cardsGrid.classList.add('cards-grid');
  mainDisplay.addEventListener('click', displayBookTripPage);
  mainHeader.innerText = 'Choose Destination';
  cardsGrid.innerHTML = '';
  destinationsData.forEach((destination) => {
    cardsGrid.innerHTML += `
    <section class="card" id=${destination.id}>
      <div class="destination-card">
        <img class="destination-image grow" id=${destination.id} name="${destination.destination}" src="${destination.image}" alt="${destination.alt}">
        <div class="destination-details">
          <h4 class="city">${destination.destination}</h4>
          <p class="lodging-cost">Estimated lodging: $${destination.estimatedLodgingCostPerDay} / night</p>
          <p class="flight-cost">Estimated roundtrip flight: $${destination.estimatedFlightCostPerPerson}</p>
        </div>
      </div>
    </section>
    `;
  });
};

export const renderCurrentTrip = () => {
  currentTraveler.currentTrip = currentTraveler.upcomingTrips[0];
  let startDate = dayjs(currentTraveler.currentTrip.date).format('MM/DD/YYYY');
  let endDate = dayjs(startDate)
    .add(currentTraveler.currentTrip.duration, 'day')
    .format('MM/DD/YYYY');
  currentTripCard.innerHTML += `
    <h3>Your current trip: <h3>
    <section class="card current">
    <div class="destination-card">
      <img class="destination-image" src="${currentTraveler.currentTrip.tripsDestination.image}" alt="${currentTraveler.currentTrip.tripsDestination.alt}">
      <div class="destination-details">
        <h4 class="city">${currentTraveler.currentTrip.tripsDestination.destination}</h4>
        <p class="lodging-cost">Number of travelers: ${currentTraveler.currentTrip.travelers}</p>
        <p class="lodging-cost">Travel dates: ${startDate} - ${endDate}</p>
        <p class="flight-cost">Trip cost: $${currentTraveler.currentTrip.cost}</p>
      </div>
    </div>
  `;
};

// event handlers and functions dependent user interation👇
export const renderTripsGrid = (e) => {
  cardsGrid.classList.add('cards-grid');
  console.log(currentTraveler);
  mainDisplay.removeEventListener('click', displayBookTripPage);
  const tripType = e.target.id;
  if (
    e.target.id === 'upcomingTrips' ||
    e.target.id === 'pastTrips' ||
    e.target.id === 'pendingTrips'
  ) {
    let headerDisplay = e.target.innerText;
    mainHeader.innerText = `${headerDisplay}`;
    cardsGrid.innerHTML = '';
    currentTraveler[tripType].forEach((trip) => {
      let startDate = dayjs(trip.date).format('MM/DD/YYYY');
      let endDate = dayjs(startDate)
        .add(trip.duration, 'day')
        .format('MM/DD/YYYY');
      cardsGrid.innerHTML += `
      <section class="card">
      <div class="destination-card">
        <img class="destination-image" src="${trip.tripsDestination.image}" alt="${trip.tripsDestination.alt}">
        <div class="destination-details">
          <h4 class="city">${trip.tripsDestination.destination}</h4>
          <p class="lodging-cost">Number of travelers: ${trip.travelers}</p>
          <p class="lodging-cost">Travel dates: ${startDate} - ${endDate}</p>
          <p class="flight-cost">Trip cost: ${trip.cost}</p>
        </div>
      </div>
      `;
    });
  }
};

export const displayBookTripPage = (e) => {
  if (typeof eval(e.target.id) === 'number') {
    const destinationID = parseInt(e.target.id);
    destinationSelected = destinationsData.find(
      (destinationData) => destinationData.id === destinationID
    );
    console.log(destinationSelected);
    mainDisplay.removeEventListener('click', displayBookTripPage);

    mainHeader.innerText = 'Plan Your Trip';
    cardsGrid.innerHTML = '';
    cardsGrid.classList.remove('cards-grid');
    cardsGrid.innerHTML += `
    <div class="form-and-destination"
      <section class="selected-destination-card" id=${destinationSelected.id}>
        <div class="destination-card">
          <img class="destination-image" id=${destinationSelected.id} name="${
      destinationSelected.destination
    }" src="${destinationSelected.image}" alt="${destinationSelected.alt}">
          <div class="destination-details">
            <h4 class="city">${destinationSelected.destination}</h4>
            <p class="lodging-cost">Estimated lodging: $${
              destinationSelected.estimatedLodgingCostPerDay
            } / night</p>
            <p class="flight-cost">Estimated roundtrip flight: $${
              destinationSelected.estimatedFlightCostPerPerson
            }</p>
          </div>
        </div>
      </section>
      <section class="trip-form" id="tripForm">
        <label>Departure:
          <input type="date" id="start" name="trip"
          placeholder="${dayjs().format('YYYY-MM-DD')}"
          min="${dayjs().format('YYYY-MM-DD')}" max="${dayjs()
      .add(1, 'year')
      .format('YYYY-MM-DD')}" required>
        </label>
        <br>
        <label>Return:
          <input type="number" id="duration" name="trip" placeholder="1" min="1" required>
          </label>
        <br>
        <label>Number of travelers:
          <input type="number" id="travelers" name="trip" placeholder="1" min="1" required>
        </label>
        <br>
        <button class= "submit-button" id="getEstimate">Get trip estimate</button>
      </section>
    </div>
    `;
    document
      .getElementById('getEstimate')
      .addEventListener('click', getTripEstimate);
  }
};

// ________________NEED TO MOVE TO SCRIPTS and Pull OUT DOM UPDATE INFO TO KEEP IN DOM

export const getTripEstimate = () => {
  const tripForm = document.getElementById('tripForm');
  const tripDate = document.getElementById('start').value;
  const formattedStartDate = dayjs(tripDate).format('YYYY/MM/DD');
  const duration = document.getElementById('duration').value;
  const numOfTravelers = document.getElementById('travelers').value;

  if (formattedStartDate === '' || !duration || !numOfTravelers) {
    cardsGrid.innerHTML += `
      <div id="errorAdjacentElement">
        <br>
        <p class="error" id="formError">PLEASE FILL OUT ALL FORM DATA BEFORE SUBMISSION</p>
      <div>  
    `;

    setTimeout(function () {
      const errorMessage = document.getElementById('formError');
      errorMessage.remove(0);
    }, 5000);

    document
      .getElementById('getEstimate')
      .addEventListener('click', getTripEstimate);
    return;
  }

  if (!formattedStartDate || duration || numOfTravelers) {
    hide(tripForm);

    tripDetails = {
      id: tripsData.length + 1,
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
    const estimate = currentTraveler.stagedTrip.cost;

    cardsGrid.innerHTML += `
    <div>
      <p>You're estimated cost is ${estimate} for ${numOfTravelers} travelers for a duration of ${duration} days.</p>
      <button class= "submit-button" id="confirmTripBtn">Confirm Trip</button>
    </div>

    `;
    document
      .getElementById('confirmTripBtn')
      .addEventListener('click', postUserTrip);
  }
};

const postUserTrip = () => {
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
  try {
    postData(tripRequestObject, 'trips');
  } catch (exception_var) {
    console.log('xception_var:', exception_var);
  }
};

const hide = (element) => {
  element.classList.add('hidden');
};

const show = (element) => {
  element.classList.remove('hidden');
};

/*use to get destination and run other functions*/

const logOut = () => {
  cardsGrid.removeEventListener('click', displayBookTripPage);
  displayLogin();
};

const displayLogin = () => {};

const showErrorMessage = () => {};
