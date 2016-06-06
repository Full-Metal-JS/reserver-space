const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
};

export const fetchUsersReservations = (userId) =>
  fetch(`/api/reservations?userID=${userId}`, {
    method: 'get',
    headers
  })
  .then(response => response.json());
  
export const fetchUsersLocations = (userId) => 
  fetch(`/api/locations/${userId}?type=locations`, {
    method: 'get',
    headers
  })
  .then(response => response.json());
  
export const fetchLocationsUsers = (locationId) => 
  fetch(`/api/locations/${locationId}?type=locations`, {
    method: 'get',
    headers
  })
  .then(response => response.json());

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

