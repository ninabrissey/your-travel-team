// api endpoints

// to get all travelers
// type = 'travelers'

// to get a single traveler
// http://localhost:3001/api/v1/travelers/<id>
// type = `travelers/${id}`

// to get all trips and post a trips:
// type = 'trips'
// const tripsPostObject = {
//   id: 4,
//   userID: 4,
//   destinationID: 543,
//   travelers: 5,
//   date: 'YYYY/MM/DD',
//   duration: 12,
//   status: 'approved' /*or 'pending' */,
//   suggestedActivities: ['<array of strings>'],
// };

// to get all destinations and post destinations // POST MAY BE EXTENSION
// type = 'destinations'
// const destinationsPostObject = {
//   id: 2,
//   destination: 'Tahiti',
//   estimatedLodgingCostPerDay: 200,
//   estimatedFlightCostPerPerson: 400,
//   image: '<string>',
//   alt: '<string>',
// };

// to modify a single trip (post) // MAY BE EXTENSION
// type = 'updateTrip'
// const postUpdateObject = {
//   id: '<number>',
//   status: '<String of "approved" or "pending">',
//   suggestedActivities: '<Array of strings>',
// };

// DELETE TRIP IS AN EXTENSION - LOOK AT API DOCUMENTATION IF INTERESTED

// import currentTraveler from './scripts';

// fetch get 👇
const fetchData = (type) => {
  return fetch(`http://localhost:3001/api/v1/${type}`)
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      } else {
        return response;
      }
    })
    .then((response) => response.json());
};

// traveler number will be captured on login and interpolated in. For now, I have hardcoded in a traveler
const fetchAllData = () => {
  return Promise.all([
    fetchData(
      `travelers/${3}`
    ) /* would use currentUser from scripts here instead of 5*/,
    fetchData('trips'),
    fetchData('destinations'),
  ]);
};

// fetch post 👇
const postData = (postObject, type) => {
  fetch(`http://localhost:3001/api/v1/${type}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(postObject),
  });
};

export default fetchAllData;
