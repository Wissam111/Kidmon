import AsyncStorage from "@react-native-async-storage/async-storage";
export const BASE_URL = "http://192.168.68.108:4000/api/v1/"; //use you pc ip address
export const IMG_URL = "http://192.168.68.108:4000/api/imgs/";
// export const BASE_URL = "http://192.168.68.117:4000/api/v1/"; //use you pc ip address
// export const IMG_URL = "http://192.168.68.117:4000/api/imgs/";

const serialize = function (obj) {
  var str = [];
  for (var p in obj)
    if (obj[p] && obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  return "?" + str.join("&");
};

// gets the access token from the cache
const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem("token");
    if (token == null) return null;
    return JSON.parse(token);
  } catch (e) {
    console.log("getToken:", e);
  }
};

export const getUserId = async () => {
  try {
    const userJson = await AsyncStorage.getItem("user");
    if (userJson == null) return null;

    const user = JSON.parse(userJson);
    return user._id;
  } catch (e) {
    console.log("getUserId:", e);
  }
};

/**
 *  this is a global HTTP api call
 *
 * @param {*} url
 * @param {*} method  GET / POST / DELETE / PATCH
 * @param {*} body
 * @param {*} queryParams
 * @param {*} contentType
 * @returns the server response as json
 */
export const apiCall = async (
  url,
  method = "GET",
  body,
  queryParams,
  contentType = "application/json",
  tries = 1
) => {
  // console.log('apiCall' , url);
  // const customURL = queryParams
  //   ? BASE_URL_DEV + url + serialize(queryParams)
  //   : BASE_URL_DEV + url;

  const customURL = BASE_URL + url;
  let bbody;
  if (body) {
    if (contentType === "multipart/form-data") {
      bbody = body;
    } else {
      bbody = JSON.stringify(body);
    }
  } else {
    bbody = null;
  }

  const result = await fetch(customURL, {
    headers: {
      "Content-Type": contentType,
      Authorization: `Bearer ${await getToken()}`,
    },
    method: method,
    body: bbody,
  });

  const json = await result.json();
  if (!result.ok) {
    throw {
      status: result.status,
      ...json,
    };
  }
  return json;
};
