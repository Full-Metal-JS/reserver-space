// json is life
const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
};

// get requests for data
export const fetchUsersReservations = (userId) =>
  fetch(`/api/reservations?userID=${userId}`, {
    method: 'get',
    headers
  })
  .then(response => response.json());
  
export const fetchUsersLocations = (userId) => 
  fetch(`/api/location/${userId}?type=locations`, {
    method: 'get',
    headers
  })
  .then(response => response.json());
  
export const fetchLocationsUsers = (locationId) => 
  fetch(`/api/location/${locationId}?type=locations`, {
    method: 'get',
    headers
  })
  .then(response => response.json());

// post requests for data
export const postLocation = (userId, location) => 
  fetch(`/api/location/${userId}`, {
    method: 'post',
    headers,
    body: JSON.stringify(location)
  })
  .then(response => response.json());
  
// creates a room at a location pass location id and room name
export const postRoom = (locationId, roomName) => 
  fetch(`/api/room/${locationId}?roomName=${roomName}`, {
    method: 'post',
    headers
  })
  .then(response => response.json());
  
// creates a reservation given all the details
export const postReservation = reservation => 
  fetch('api/reservation', {
    method: 'post',
    headers,
    body: JSON.stringify(reservation)
  })
  .then(response => response.json());

// put requests for data

// putLocation adds a user to a location
export const putLocation = (locationId, userId) => 
  fetch(`/api/location/${locationId}/${userId}`, {
    method: 'put',
    headers
  })
  .then(response => response.json());
  
// put room updates the name of a room
export const putRoom = (roomId, newName) => 
  fetch(`/api/room/${roomId}?newName=${newName}`, {
    method: 'put',
    headers
  })
  .then(response => response.json());
  
// update a reservation with all the fields you want to update
export const putReservation = (reservationId, updateInfo) => 
  fetch(`/api/reservation/${reservationId}`, {
    method: 'put',
    headers,
    body: JSON.stringify(updateInfo)
  })
  .then(response => response.json());

// delete requests for data
export const deleteLocation = (locationId) => 
  fetch(`/api/location/${locationId}`, {
    method: 'delete',
    headers
  })
  .then(response => response.json());
  
// delete request for rooms
export const deleteRoom = roomId =>
  fetch(`/api/room/${roomId}`, {
    method: 'delete',
    headers
  })
  .then(response => response.json());

// dldete a reservation
export const deleteReservation = reservationId => 
  fetch(`/api/reservation/${reservationId}`, {
    method: 'delete',
    headers
  })
  .then(response => response.json());

// auth api routes
export const login = user => 
  fetch('/auth/login', {
    method: 'post',
    headers,
    body: JSON.stringify(user)
  })
  .then(response => response.json());

export const signup = user =>
  fetch('/auth/signup', {
    method: 'post',
    headers,
    body: JSON.stringify(user)
  })
  .then(response => response.json());

