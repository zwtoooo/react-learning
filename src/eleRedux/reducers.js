
import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';

const isEmptyObj = (obj) => {
  for(let i in obj) {
    return false;
  }
  return true;
}

const foods = (state = [], action) => {
  switch (action.type) {
    case 'ADD_FOOD':
      var ishave = state.some(f => f.addtional === action.addtional);
      if (ishave) {
        return state.map(f => {
          if (f.addtional === action.addtional) {
            return {
              ...f,
              count: f['count'] + action.count
            }
          }
          return f;
        })
      }
      return [
        ...state,
        {
          name: action.name,
          price: action.price,
          original_price: action.original_price,
          count: action.count,
          addtional: action.addtional,
          image_hash: action.image_hash
        }
      ];
    case 'REDUCE_COUNT':
      return state.map(f => {
        if (f.addtional === action.addtional) {
          if (f.count > 1) {
            return {...f, count: f.count - 1};
          }
          return false;
        }
        return f;
      }).filter(f => f);
    default:
      return state;
  }
}
const foodsMap = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_FOOD':
      if (state[action.id]) {
        return {
          ...state,
          [action.id]: foods(state[action.id], action)
        };
      }
      return {
        ...state,
        [action.id]: [{
          name: action.name,
          price: action.price,
          original_price: action.original_price,          
          count: action.count,
          addtional: action.addtional,
          image_hash: action.image_hash
        }]
      }
    case 'REDUCE_COUNT':
      if (foods(state[action.id], action).length > 0) {
        return {
          ...state,
          [action.id]: foods(state[action.id], action)
        }
      }
      delete state[action.id];
      return { ...state };
    default:
      return state;
  }
}

const shopsMap = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_FOOD':
      if (state[action.pid]) {
        return {
          ...state,
          [action.pid]: foodsMap(state[action.pid], action)
        }
      }
      return {
        ...state,
        [action.pid]: {
          [action.id]: [{
            name: action.name,
            price: action.price,
            original_price: action.original_price,            
            count: action.count,
            addtional: action.addtional,
            image_hash: action.image_hash
          }]
        }
      }
    case 'REDUCE_COUNT':
      if (isEmptyObj(foodsMap(state[action.pid], action))) {
        delete state[action.pid];
        return { ...state };
      }
      return {
        ...state,
        [action.pid]: foodsMap(state[action.pid], action)
      }
    case 'REMOVE_ALL':
      delete state[action.pid];
      return {
        ...state
      };
    default:
     return state;
  }
}

const shopCart = combineReducers({
  shopsMap
});

export default createStore(shopCart, applyMiddleware(logger));





