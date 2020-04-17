import { Platform } from "react-native";
import { APP_VERSION } from "./constants";

const ApiHelperGET = (url, data = {}) => {
  return fetch(url, {
    method: 'GET',
    headers: {
      "device": Platform.OS === 'android' ? 'ANDROID' : 'IPHONE',
      "version": APP_VERSION
    }
  })
    .then((res) => res.json())
    .then(
      (result) => {
        return result;
      },
      (error) => {
        error = error;
      }
    );
};

const ApiHelperPOST = async (url = "", data = {}) => {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      "device": Platform.OS === 'android' ? 'ANDROID' : 'IPHONE',
      "version": APP_VERSION
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *client
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  return await response.json(); // parses JSON response into native JavaScript objects
};

const ApiHelperPUT = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "PUT",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      "device": Platform.OS === 'android' ? 'ANDROID' : 'IPHONE',
      "version": APP_VERSION
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(data),
  });
  return await response.json();
}

export { ApiHelperGET, ApiHelperPOST, ApiHelperPUT };
