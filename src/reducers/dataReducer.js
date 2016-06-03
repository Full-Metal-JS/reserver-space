import * as actions from './../actions/actionConstants';

/*
  in our initial state, our data is nested: locations is a map containing every 
  location with numbered keys as its id, and each location is an object with a rooms
  property which is a map, which has numbered keys as its id and each room is an object with a reservations property which is a map. 
*/
const initialLocationState = {
  
};

const locations = (state = initialLocationState, action) => {
  switch(action.type) {
    case actions.GET_USERS_LOCATIONS:
     return {
       ...state
     };
  }
};

// const initialRoomState = {
  
// }

// const rooms = (state = initialRoomState, action) => {
  
// };

// const initialReservationState = {
  
// };

// const reservations = (state = initialReservationState, action) => {
  
// };

const initialState = {
  isFetching: false,
  error: '',
  lastUpdated: '',
  locations: new Map()
};

export default (state = initialState, action) => {
  switch(action.type) {
    case actions.FETCHING_DATA:
      return {
        ...state,
        isFetching: true
      }
    
    case actions.FETCHING_DATA_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.error
      }
      
    case actions.FETCHING_DATA_SUCCESS:
      return {
        ...state,
        locations
      }
  }
}