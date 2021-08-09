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

// global variables 👇
import { dateToday, currentTraveler, trips, destinationsData } from './scripts';

// query selectors 👇
const cardsGrid = document.getElementById('cardsGrid');
const mainHeader = document.getElementById('mainHeader');

// display on load 👇

// display upon user log on 👇
const displayTravelerDashBoard = (traveler, trips) => {};

const renderDestinationsGrid = () => {
  mainHeader.innerText = 'Choose Destination';
  cardsGrid.innerHTML = '';
  destinationsData.forEach((destination) => {
    cardsGrid.innerHTML += `
    <section class="card">
    <div class="destination-card">
      <img class="destination-image" src="${destination.image}" alt="${destination.alt}">
      <div class="destination-details">
        <h4 class="city">${destination.destination}</h4>
        <p class="lodging-cost">Estimated lodging: $${destination.estimatedLodgingCostPerDay} / night</p>
        <p class="flight-cost">Estimated roundtrip flight: $${destination.estimatedFlightCostPerPerson}</p>
      </div>
    </div>
    `;
  });
};

// display upon user input once logged in 👇

function renderTripsGrid(type, headerDisplay) {
  mainHeader.innerHTML = `${headerDisplay} Trips`;
  tripsGrid.innerHTML = '';
  traveler[type].forEach((destination) => {
    cardsGrid.innerHTML += `
    <section class="card">
    <div class="destination-card">
      <img class="destination-image" src="${destination.image}" alt="${destination.alt}">
      <div class="destination-details">
        <h4 class="city">${destination.destination}</h4>
        <p class="lodging-cost">Estimated lodging: $${destination.estimatedLodgingCostPerDay} / night</p>
        <p class="flight-cost">Estimated roundtrip flight: $${destination.estimatedFlightCostPerPerson}</p>
      </div>
    </div>
    `;
  });
}

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

export default renderDestinationsGrid;
