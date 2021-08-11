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
  }).then((response) => checkForError(response));
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
