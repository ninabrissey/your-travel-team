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
const cardsGrid = document.getElementById('cardsGrid');
const mainHeader = document.getElementById('mainHeader');
const currentTripCard = document.getElementById('currentTrip');

// const upComingTripBtn = document.getElementById('upcomingTrips');
// const pendingTripBtn = document.getElementById('pendingTrips');
// const pastTripBtn = document.getElementById('pastTrips');
// export let tripsButtons = document.getElementById('aside');

// display on load 👇

// display upon user log on 👇
const displayTravelerDashBoard = (traveler, trips) => {};

export const renderDestinationsGrid = () => {
  mainDisplay.addEventListener('click', displayBookTripPage);
  mainHeader.innerText = 'Choose Destination';
  cardsGrid.innerHTML = '';
  destinationsData.forEach((destination) => {
    cardsGrid.innerHTML += `
    <section class="card" id=${destination.id}>
      <div class="destination-card">
        <img class="destination-image grow" id=${destination.id} name=${destination.destination} src="${destination.image}" alt="${destination.alt}">
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
const makeTripCostString = (trip) => {
  return `$${trip.cost}`;
  // let tripCost = `$${trip.cost}`;

  // console.log(tripCost);

  // return [
  //   tripCost.slice(0, tripCost.length - 6),
  //   ',',
  //   tripCost.slice(tripCost.length - 6),
  // ].join('');
};

export const renderTripsGrid = (e) => {
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
        <img class="destination-image" src="${
          trip.tripsDestination.image
        }" alt="${trip.tripsDestination.alt}">
        <div class="destination-details">
          <h4 class="city">${trip.tripsDestination.destination}</h4>
          <p class="lodging-cost">Number of travelers: ${trip.travelers}</p>
          <p class="lodging-cost">Travel dates: ${startDate} - ${endDate}</p>
          <p class="flight-cost">Trip cost: ${makeTripCostString(trip)}</p>
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
      <img class="destination-image" src="${
        currentTraveler.currentTrip.tripsDestination.image
      }" alt="${currentTraveler.currentTrip.tripsDestination.alt}">
      <div class="destination-details">
        <h4 class="city">${
          currentTraveler.currentTrip.tripsDestination.destination
        }</h4>
        <p class="lodging-cost">Number of travelers: ${
          currentTraveler.currentTrip.travelers
        }</p>
        <p class="lodging-cost">Travel dates: ${startDate} - ${endDate}</p>
        <p class="flight-cost">Trip cost: ${makeTripCostString(
          currentTraveler.currentTrip
        )}</p>
      </div>
    </div>
  `;
};

export const displayBookTripPage = (e) => {
  mainDisplay.removeEventListener('click', displayBookTripPage);
  console.log(e.target);
  let destinationID = e.target.id;
  let destinationCard = e.target.innerHTML;
  console.log(destinationID);

  if (typeof destinationID === 'number' || destinationID !== 'main') {
    console.log(destinationCard, 'in displayBookTripPage function');
    mainHeader.innerText = 'Plan Your Trip';
    cardsGrid.innerHTML = '';
    cardsGrid.innerHTML = `
      ${destinationCard}
      `;
    // cardsGrid.innerHTML = `
    // <section class="card" id=${destination.id}>
    //   <div class="destination-card">
    //     <img class="destination-image" src="${destination.image}" alt="${destination.alt}">
    //     <div class="destination-details">
    //       <h4 class="city">${destination.destination}</h4>
    //       <p class="lodging-cost">Estimated lodging: $${destination.estimatedLodgingCostPerDay} / night</p>
    //       <p class="flight-cost">Estimated roundtrip flight: $${destination.estimatedFlightCostPerPerson}</p>
    //     </div>
    //   </div>
    // </section>
    // `;
  }

  const submitTrip = () => {
    // cardsGrid.addEventListener('click', displayBookTripPage);
  };

  const logOut = () => {
    // cardsGrid.removeEventListener('click', displayBookTripPage);
  };

  //   <main id='main'>
  //   <h2 class="main-header" id='mainHeader'>Choose Destination</h2>
  //     <div class="cards-grid" id='cardsGrid'>
  //       <!-- destination or categorized trip cards append here -->
  //     </div>
  // </main>
};

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
