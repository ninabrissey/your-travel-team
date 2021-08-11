// fetch get 👇
export const fetchData = (type) => {
  return fetch(`http://localhost:3001/api/v1/${type}`)
    .then((response) => checkForError(response))
    .catch((error) => displayErrorMsg(error));
};

export const fetchAllData = (travelerID) => {
  return Promise.all([
    fetchData(`travelers/${travelerID}`),
    fetchData('trips'),
    fetchData('destinations'),
  ]);
};

// fetch post 👇
export const postData = (postObject, type) => {
  console.log('postObject:', postObject);
  console.log('type:', type);

  return fetch(`http://localhost:3001/api/v1/${type}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(postObject),
  })
    .then((response) => checkForError(response))
    .then((error) => console.log(error));
};

// error handling 👇
export const checkForError = (response) => {
  if (!response.ok) {
    //return new error
    throw new Error('Something went wrong, please try again.');
  } else {
    return response.json();
  }
};
