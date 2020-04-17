import { createBrowserHistory } from "history";
import { applyMiddleware, compose, createStore } from "redux";
import { routerMiddleware } from "connected-react-router";
import createRootReducer from "./reducers/reducer";
import thunk from "redux-thunk";
import createMiddleware from "./middleware/clientMiddleware";
import api from "./ApiClient";

export const history = createBrowserHistory();

export default function configureStore(preloadedState) {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const middleware = [thunk, routerMiddleware(history), createMiddleware(api)];
  const enhancer = composeEnhancers(applyMiddleware(...middleware));

  const rootReducer = createRootReducer(history);

  const store = createStore(
    rootReducer, // root reducer with router state
    preloadedState,
    enhancer
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept("./reducers/reducer", () => {
      store.replaceReducer(createRootReducer(history));
    });
  }

  return { store, history };
}
