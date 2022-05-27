import { createStore, combineReducers, compose, applyMiddleware } from "redux";

import userReducer,{restoreSessionAction} from "./userDuck";
import cityReducer from "./cityDuck"

import thunk from "redux-thunk";

/**
 * Reducers
 */

 let rootReducer = combineReducers({
    user: userReducer,
    cities: cityReducer
  });

  /**
 * Devtools
 */

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

/**
 * Store
 */

 export default function generateStore() {
    let store = createStore(
      rootReducer,
      composeEnhancers(applyMiddleware(thunk))
    );
    restoreSessionAction()(store.dispatch)
    return store;
  }
  