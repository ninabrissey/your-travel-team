// scripts 👇
// Examples of what this should look like
// import { Chart, registerables } from 'chart.js';
// Chart.register(...registerables);
// import {
//   makeWeeklyHydrationChart,
//   makeDailyHydrationChart,
//   makeNightsSleepChart,
//   makeNightsQualityChart,
//   makeWeeksSleepChart,
// } from './chartDisplays';
import * as dayjs from 'dayjs';

// global variables 👇
import {
  dateToday,
  currentTraveler,
  trips,
  destinationsData,
  mainDisplay,

  // cardsGrid,
} from './scripts';

// query selectors 👇
let destinationSelected;

// const totalSpentYTD = document.getElementById('totalSpentYTD');
const cardsGrid = document.getElementById('cardsGrid');
const mainHeader = document.getElementById('mainHeader');
const currentTripCard = document.getElementById('currentTrip');
// const bookTripBtn = document.getElementById('bookNow');
const logoutBtn = document.getElementById('logout');
const totalSpentYTD = document.getElementById('totalSpentYTD');
// const upComingTripBtn = document.getElementById('upcomingTrips');
// const pendingTripBtn = document.getElementById('pendingTrips');
// const pastTripBtn = document.getElementById('pastTrips');
// export let tripsButtons = document.getElementById('aside');

// display on load 👇

// display upon user log on 👇
const displayTravelerDashBoard = (traveler, trips) => {};

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

// display upon user input once logged in 👇
// export const makeTripCostString = () => {
//   let ytdSpent = `$${currentTraveler.getSpendingYTD(dateToday)}`;

//   console.log(ytdSpent);

///finish this function and commit

// return [
//   tripCost.slice(0, tripCost.length - 6),
//   ',',
//   tripCost.slice(tripCost.length - 6),
// ].join('');
// };

export const renderTripsGrid = (e) => {
  cardsGrid.classList.add('cards-grid');
  console.log(currentTraveler);
  mainDisplay.removeEventListener('click', displayBookTripPage);
  // dont need this trip type variable if you are not using it
  let tripType = e.target.id;
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

export const renderCurrentTrip = () => {
  currentTraveler.currentTrip = currentTraveler.upcomingTrips[0];
  let startDate = dayjs(currentTraveler.currentTrip.date).format('MM/DD/YYYY');
  let endDate = dayjs(startDate)
    .add(currentTraveler.currentTrip.duration, 'day')
    .format('MM/DD/YYYY');
  currentTripCard.innerHTML += `
    <h3>Your current trip: <h3>
    <section class="card">
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

export const displayBookTripPage = (e) => {
  if (typeof eval(e.target.id) === 'number') {
    const destinationID = parseInt(e.target.id);
    destinationSelected = destinationsData.find(
      (destinationData) => destinationData.id === destinationID
    );
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
      <section class="trip-form">
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

const getTripEstimate = () => {
  // e.preventDefault();
  const startDate = document.getElementById('start').value;
  const formattedStartDate = dayjs(startDate).format('YYYY/MM/DD');
  console.log('startDate:', formattedStartDate);
  const duration = document.getElementById('duration').value;
  console.log('duration:', duration);
  const numOfTravelers = document.getElementById('travelers').value;
  console.log('numOfTraveler:', numOfTravelers);

  if (formattedStartDate || !duration || !numOfTravelers) {
    cardsGrid.innerHTML += `
      <br>
      <p>PLEASE FILL OUT ALL FORM DATA BEFORE SUBMISSION</p>
    `;
    return;
  } else {
  }

  const createPostObject = (destinationID) => {
    let tripRequest = {
      id: Date.now(),
      userID: currentTraveler.id,
      destinationID: destinationID,
      travelers: travelersInput.value,
      date: dateInput.value,
      duration: durationInput.value,
      status: 'pending',
      suggestedActivities: [],
    };
    postData(tripRequest);
  };

  /*use to get destination and run other functions*/

  // const startDate = document.getElementById('start').value;
  // console.log('startDate:', startDate);
  // const duration = document.getElementById('duration').value;
  // console.log('endDate:', duration);
  // const numOfTravelers = document.getElementById('travelers').value;
  // console.log('numOfTravelers:', numOfTravelers);

  destinationSelected.id; /*use to get destination and run other functions*/
  console.log('destinationSelected.id:', destinationSelected.id);

  //need to capture the data
  //make a post object
  //post it
  //get response
  //error - handle
};

const requestTrip = () => {};

const logOut = () => {
  // cardsGrid.removeEventListener('click', displayBookTripPage);
};

//

const showErrorMessage = () => {
  //error.status
  //error.message
  //properties on the dom
};

const createPostObject = (destinationID) => {
  let tripRequest = {
    id: Date.now(),
    userID: currentTraveler.id,
    destinationID: destinationID,
    travelers: travelersInput.value,
    date: dateInput.value,
    duration: durationInput.value,
    status: 'pending',
    suggestedActivities: [],
  };
  postData(tripRequest);
};

//This should maybe go into API calls
// Example from Alex
// const postData = (postObject) => {
//   postApiData(postObject)
//     .then((response) => checkForError(response, 'pending'))
//     .catch((error) => {
//       domUpdates.showMsg(
//         customerBookingsSection,
//         currentCustomer,
//         lookingForDate,
//         'fail',
//         error
//       );
//       timeout(updateCustomerBookings);
//     });
// };

// export default { renderDestinationsGrid, renderTripsGrid };
