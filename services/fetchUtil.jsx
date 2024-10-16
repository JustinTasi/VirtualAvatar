const BASE_URL = 'http://127.0.0.1:8000/';
const GET = "GET";
const POST = "POST";
const DELETE = "DELETE";
const PATCH = "PATCH";
const APPLICATION_JSON = "application/json";
const MULTIPLEFILE = "multipart/form-data";

export default class FetchUtil {
  static async getPromise(url, requestOptions, data = null) {
    if (data && typeof data === "object") {
      url += `?${this.objectToRequestParams(data)}`;
    }
    return fetch(`${BASE_URL}${url}`, requestOptions)
      .then(this.responseToJSON)
      .then(this.handleResponse);
  }

  static async getAPI(url, data) {
    const requestOptions = {
      method: GET,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    return this.getPromise(url, requestOptions, data);
  }

  static async postAPI(url, data) {
    const requestOptions = {
      method: POST,
      headers: {
        "Content-Type": APPLICATION_JSON,
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(this.clearObject(data)),
    };
    return this.getPromise(url, requestOptions);
  }

  static responseToJSON(response) {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  }

  static clearObject(object) {
    Object.keys(object).forEach(key => {
      if (object[key] === undefined || object[key] === null || object[key] === '') {
        delete object[key];
      }
    });
    return object;
  }
  static objectToRequestParams(object) {
    var paramsStringArray = [];
    for (var key in object) {
      if (object.hasOwnProperty(key)) {
        paramsStringArray.push(
          encodeURIComponent(key) + "=" + encodeURIComponent(object[key])
        );
      }
    }
    return paramsStringArray.join("&");
  }

  static arrayObjectToRequestParams(object) {
    var paramsStringArray = [];
    for (var index in object) {
      if (object.hasOwnProperty(index)) {
        for (var key in object[index]) {
          if (object[index].hasOwnProperty(key)) {
            paramsStringArray.push(
              encodeURIComponent(key) +
                "=" +
                encodeURIComponent(object[index][key])
            );
          }
        }
      }
    }
    return paramsStringArray.join("&");
  }
}
