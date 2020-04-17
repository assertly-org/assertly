/* eslint-disable */
import config from "../config";

function formatUrl(path) {
  if (path.match(/https?|localhost/)) return path;
  const adjustedPath = path[0] !== "/" ? `/${path}` : path;

  return `${config.apiHost}${adjustedPath}`;
}

export const isEmpty = obj => {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
};

const queryString = params =>
  params && !isEmpty(params)
    ? "?" +
      Object.keys(params)
        .map(key => key + "=" + params[key])
        .join("&")
    : "";

// Custom API error to throw
export function ApiError(message, data, status) {
  let response = null;
  let isObject = false;

  // We are trying to parse response
  try {
    response = JSON.parse(data);
    isObject = true;
  } catch (e) {
    response = data;
  }

  this.response = response;
  this.message = message;
  this.status = status;
  this.toString = function() {
    return `${this.message}\nResponse:\n${
      isObject ? JSON.stringify(this.response, null, 2) : this.response
    }`;
  };
}

// API wrapper function
const fetchResource = (path, userOptions = {}) => {
  // Define default options
  const defaultOptions = {
    mode: "cors", // no-cors, cors, *same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "omit", // include, same-origin, *omit
    redirect: "follow", // manual, *follow, error
    referrer: "no-referrer" // no-referrer, *client
  };
  // Define default headers
  let defaultHeaders = {
    "Content-Type": "application/json; charset=utf-8"
  };

  const token = localStorage.getItem("token");

  if (token && token !== "null") {
    defaultHeaders = {
      ...defaultHeaders,
      authorization: "Token " + token
    };
  }

  const options = {
    // Merge options
    ...defaultOptions,
    ...userOptions,
    // Merge headers
    headers: {
      ...defaultHeaders,
      ...userOptions.headers
    }
  };

  // Build Url
  const query =
    userOptions && userOptions.query ? queryString(userOptions.query) : "";

  const url = `${formatUrl(path)}${query}`;
  // const url = `${ API_URL }${ path }${ query }`;

  // Detect is we are uploading a file
  const isFile = options.body instanceof File;

  // Stringify JSON data
  // If body is not a file
  if (options.body && typeof options.body === "object" && !isFile) {
    options.body = JSON.stringify(options.body);
  }

  // Variable which will be used for storing response
  let response = null;

  return (
    fetch(url, options)
      .then(responseObject => {
        // Saving response for later use in lower scopes
        response = responseObject;

        // HTTP unauthorized
        if (response.status === 401) {
          // Handle unauthorized requests
          // Maybe redirect to login page?
        }

        // Check for error HTTP error codes
        if (response.status < 200 || response.status >= 300) {
          // Get response as text
          return response.text();
        }

        if (response.status === 204) {
          return null;
        }

        // Get response as json
        return response.json();
      })
      // "parsedResponse" will be either text or javascript object depending if
      // "response.text()" or "response.json()" got called in the upper scope
      .then(parsedResponse => {
        // Check for HTTP error codes
        if (response.status < 200 || response.status >= 300) {
          // Throw error
          throw parsedResponse;
        }

        // Request succeeded
        return parsedResponse;
      })
      .catch(error => {
        // Throw custom API error
        // If response exists it means HTTP error occured
        if (response) {
          throw new ApiError(
            `Request failed with status ${response.status}.`,
            error,
            response.status
          );
        } else {
          throw new ApiError(error.toString(), null, "REQUEST_FAILED");
        }
      })
  );
};

export default fetchResource;
