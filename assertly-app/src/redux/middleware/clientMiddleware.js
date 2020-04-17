// import {logout} from '../actions/auth';

export default function clientMiddleware(client) {
  return ({ dispatch, getState }) => next => action => {
    if (typeof action === "function") {
      return action(dispatch, getState);
    }

    const { promise, types, ...rest } = action; // eslint-disable-line no-redeclare

    if (!promise) {
      return next(action);
    }

    const [REQUEST, SUCCESS, FAILURE] = types;

    next({ ...rest, type: REQUEST });

    const actionPromise = promise(client);

    // actionPromise is a 'then'-able promise
    actionPromise
    .then(
      body => {
        next({ ...rest, payload: body, type: SUCCESS });
      },
      error => {
        next({ ...rest, error, type: FAILURE });
      }
    )
      .catch(error => {
        next({ ...rest, error, type: FAILURE });
      });

    return actionPromise;
  };
}
