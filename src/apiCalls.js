//imports 👇
import { displaySuccessfulTripRequest } from './domUpdates';
import Trip from './Trip';

// fetch get 👇
const fetchData = (type) => {
  return fetch(`http://localhost:3001/api/v1/${type}`)
    .then((response) => checkForError(response))
    .catch((error) => displayErrorMsg(error));
};

// traveler number will be captured on login and interpolated in. For now, I have hardcoded in a traveler
export const fetchAllData = (travelerID) => {
  return Promise.all([
    fetchData(
      `travelers/${3}`
    ) /* would use currentUser from scripts here instead of 5*/,
    fetchData('trips'),
    fetchData('destinations'),
  ]);
};

// fetch post 👇
export const postData = (postObject, type) => {
  console.log('postObject:', postObject);
  console.log('type:', type);

  fetch(`http://localhost:3001/api/v1/${type}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(postObject),
  })
    .then((response) => checkForError(response))
    .catch((error) => console.log(error));
};

// possible error handling - pick this or try catch
const checkForError = (response) => {
  if (!response.ok) {
    //return new error
    throw new Error('Something went wrong, please try again.');
  } else {
    return response.json();
  }
};
