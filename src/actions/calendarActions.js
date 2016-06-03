import * as actions from './actionConstants';
import {
  getUsersReservations
} from './../helpers/api'

export const getAllReservations = (userId) => {
  return {
    type: actions.GET_ALL_RESERVATIONS,
    userId
  }
}; 

export const getAllReservationsSuccess = reservations => {
  return {
    type: actions.GET_ALL_RESERVATIONS_SUCCESS,
    reservations
  }
};

export const getAllReservationsError = error => {
  return {
    type: actions.GET_ALL_RESERVATIONS_ERROR,
    error
  }
}

export const getCalendarData = userId => (dispatch, getState) => {
  dispatch(getAllReservations(userId));
  getUsersReservations(userId, getAllReservationsSuccess, getAllReservationsError); 
};