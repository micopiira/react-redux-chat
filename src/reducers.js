import {types} from './actions';

export const messages = (state = [], action) => {
  switch (action.type) {
      case types.MESSAGE_RECEIVED:
          return state.concat(action.payload);
      case types.MESSAGES_RECEIVED:
          return action.payload;
      default:
          return state;
  }
};

export const isFetching = (state = false, action) => {
  switch (action.type) {
      case types.ADD_MESSAGE:
      case types.FETCH_MESSAGES:
          return true;
      case types.MESSAGES_RECEIVED:
      case types.MESSAGE_SENT:
          return false;
      default:
          return state;
  }
};

export const user = (state = null, action) => {
    switch (action.type) {
        // case types.CONNECTED:
        //     return action.payload;
        default:
            return state;
    }
};

export const clients = (state = [], action) => {
    switch (action.type) {
        case 'CLIENT_CONNECTED':
            return state.concat(action.payload);
        case 'CLIENT_DISCONNECTED':
            return state.filter(client => client !== action.payload);
        default:
            return state;
    }
};