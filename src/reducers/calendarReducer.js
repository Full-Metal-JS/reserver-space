import * as actions from './../actions/actionConstants';

const initialState = {
  isFetching: false,
  error: '',
  reservations: null,
  lastUpdated: Date.now()
};

export default const calendarReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.GET_ALL_RESERVATIONS:
      return {
        ...state,
        isFetching: true
      }
      
    case actions.GET_ALL_RESERVATIONS_SUCCESS:
     return {
       ...state,
       isFetching: false,
       reservations: action.reservations,
       lastUpdate: Date.now()
     }
     
    case actions.GET_ALL_RESERVATIONS_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.error
      }
      
    default:
      return state;
  }
};
