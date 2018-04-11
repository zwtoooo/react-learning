
import { Map, List } from 'immutable';

const foods = (state = List.of(), action) => {
  switch (action.type) {
    case 'ADD_FOOD':
      var ishave = state.some(f => f.get('addtional') === action.addtional);
      if (ishave) {
        return state.map(f => {
          if (f.get('addtional') === action.addtional) {
            return f.set('count', f.get('count') + action.count);
          }
          return f;
        })
      }
      return  state.push(
                Map({
                  name: action.name,
                  price: action.price,
                  original_price: action.original_price,
                  count: action.count,
                  addtional: action.addtional,
                  image_hash: action.image_hash
                })
              );
    case 'REDUCE_COUNT':
      return state.map(f => {
        if (f.get('addtional') === action.addtional) {
          if (f.get('count') > 1) {
            return f.set('count', f.get('count') - action.count);
          }
          return false;
        }
        return f;
      }).filter(f => f);
    default:
      return state;
  }
}
const foodsMap = (state = Map({}), action) => {
  switch (action.type) {
    case 'ADD_FOOD':
      if (state.get(action.id)) {
        return state.set(action.id, foods(state.get(action.id), action));
      }
      return state.set(action.id, List.of(Map({
              name: action.name,
              price: action.price,
              original_price: action.original_price,          
              count: action.count,
              addtional: action.addtional,
              image_hash: action.image_hash
            })));
    case 'REDUCE_COUNT':
      if (foods(state.get(action.id), action).isEmpty()) {
        return state.delete(action.id);
      }
      return state.set(
        action.id,
        foods(
          state.get(action.id),
          action
        )
      );
    default:
      return state;
  }
}

const shopsMap = (state = Map({}), action) => {
  switch (action.type) {
    case 'ADD_FOOD':
      if (state.get(action.pid)) {
        return state.set(
          action.pid,
          foodsMap(
            state.get(action.pid),
            action
          )
        );
      }
      return state.setIn(
        [action.pid, action.id],
        List.of(Map({
          name: action.name,
          price: action.price,
          original_price: action.original_price,            
          count: action.count,
          addtional: action.addtional,
        }))
      );
    case 'REDUCE_COUNT':
      if (foodsMap(state.get(action.pid), action).isEmpty()) {
        return state.delete(action.pid);
      }
      return state.set(
        action.pid,
        foodsMap(
          state.get(action.pid), 
          action
        )
      );
    case 'REMOVE_ALL':
      return state.delete(action.pid);
    default:
     return state;
  }
}

export default shopsMap;
