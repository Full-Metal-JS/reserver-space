import * as actions from './actionConstants';

export const getUsersLocations = userId => (
  {
    type: actions.GET_USERS_LOCATIONS,
    userId
  }
);

export const getUsersLocationsSuccess = locations => (
  {
    type: actions.GET_USERS_LOCATIONS_SUCCESS,
    locations
  }
);

export const getUsersLocationsError = error => (
  {
    type: actions.GET_USERS_LOCATIONS_ERROR,
    error
  }
);

export const getLocationsUsers = locationId => (
  {
    type: actions.GET_LOCATIONS_USERS,
    locationId
  }
);

export const getLocationsUsersSuccess = users => (
  {
    type: actions.GET_LOCATIONS_USERS_SUCCESS,
    users
  }
);