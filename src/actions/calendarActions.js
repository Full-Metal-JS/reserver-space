import * as actions from './actionConstants';
import {
  getUsersReservations
} from './../helpers/api';

export const getAllReservations = (userId) => ({
  type: actions.GET_ALL_RESERVATIONS,
  userId
}); 

export const getAllReservationsSuccess = reservations => ({
  type: actions.GET_ALL_RESERVATIONS_SUCCESS,
  reservations
});

export const getAllReservationsError = error => ({
  type: actions.GET_ALL_RESERVATIONS_ERROR,
  error
});

export const getCalendarData = userId => (dispatch) => {
  dispatch(getAllReservations(userId));
  getUsersReservations(userId, getAllReservationsSuccess, getAllReservationsError); 
};