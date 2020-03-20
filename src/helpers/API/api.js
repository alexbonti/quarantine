import axios from "axios";
import { AccessToken, logout } from "contexts/helpers";
import { notify } from "components";
import { axiosInstance, axiosInstanceNews, axiosInstanceStats } from "../index";
/**
 *  @errorHelper :  Function to return error StatusText.
 */
const errorHelper = (error, variant) => {
  if (error.response === undefined) {
    notify("Network Error");
    return false;
  }
  if (error.response.statusCode === 401) {
    if (variant === "login") return notify("Invalid Credentials");
    notify("You may have been logged out");
    logout();
    return false;
  }
  if (error.response.data.statusCode === 401) {
    if (variant === "login") return notify("Invalid Credentials");
    notify("You may have been logged out");
    logout();
    return false;
  }
  if (error.response.status === 401) {
    if (variant === "login") return notify("Invalid Credentials");
    notify("You may have been logged out");
    logout();
    return false;
  }
  if (error.response.data.message !== "") {
    notify(error.response.data.message);
    return false;
  }
  if (error.response.statusText !== "") {
    notify(error.response.statusText);
    return false;
  }
};

const performCallback = (callback, data) => {
  if (callback instanceof Function) {
    if (data !== undefined) return callback(data);
    callback();
  }
};

class API {
  displayAccessToken = () => {
    console.log(AccessToken);
  };

  login = (data, callback) => {
    axiosInstance
      .post("user/login", data)
      .then(response => {
        return performCallback(callback, response.data.data.accessToken);
      })
      .catch(error => {
        errorHelper(error, "login");
      });
  };

  accessTokenLogin = callback => {
    axiosInstance
      .post(
        "user/accessTokenLogin",
        {},
        {
          headers: {
            authorization: "Bearer " + AccessToken
          }
        }
      )
      .then(response => performCallback(callback, AccessToken))
      .catch(error => errorHelper(error));
  };

  logoutUser = callback => {
    logout();
    performCallback(callback);
  };

  registerUser = async data => {
    return await axiosInstance
      .post("user/register", data)
      .then(response => response.data.data)
      .catch(error => errorHelper(error));
  };

  verifyOTP = async (data, accessToken) => {
    return await axiosInstance
      .put("user/verifyOTP", data, {
        headers: {
          authorization: `Bearer ${accessToken}`
        }
      })
      .then(response => response.data.data)
      .catch(error => errorHelper(error));
  };

  getAds = async (data, callback) => {
    return await axiosInstance
      .post("/listing/getListings", data, {
        // headers: {
        //   authorization: `Bearer ${AccessToken}`
        // }
      })
      .then(response => {
        performCallback(callback, response.data.data.data);
      })
      .catch(err => {
        errorHelper(err);
      });
  };

  
  searchByKeyword = async (data, callback) => {
    return await axiosInstance
      .post("/listing/searchByKeyword", data, {
        headers: {
          authorization: `Bearer ${AccessToken}`
        }
      })
      .then(response => {
        performCallback(callback, response.data.data.data);
      })
      .catch(err => {
        errorHelper(err);
      });
  };

  getCategories = async callback => {
    return await axiosInstance
      .get("/listing/getCategories", {
        // headers: {
        //   authorization: `Bearer ${AccessToken}`
        // }
      })
      .then(response => {
        console.log(response.data.data.data);
        performCallback(callback, response.data.data.data);
      })
      .catch(err => {
        errorHelper(err);
      });
  };

  

  uploadImages = async file => {
    return await axiosInstance
      .post("/upload/uploadImage", file, {
        headers: {
          authorization: "Bearer " + AccessToken,
          "Content-Type": "multipart/form-data; boundary='boundary'"
        }
      })
      .then(response => {
        // console.log(JSON.parse(response.request.response).data.documentFileUrl.original);
        return JSON.parse(response.request.response).data.imageFileURL;
      })
      .catch(error => {
        errorHelper(error);
        return false;
      });
  };


  // --------LISTING API ----------------------
  createListing = async (data, callback) => {
    return await axiosInstance
      .post("/listing/createListing", data, {
        headers: {
          authorization: `Bearer ${AccessToken}`
        }
      })
      .then(response => {
        performCallback(callback);
      })
      .catch(err => {
        errorHelper(err);
      });
  };


  getPersonalAds = async () => {
    return await axiosInstance
      .get("/listing/getPersonalListings", {
        headers: {
          authorization: `Bearer ${AccessToken}`
        }
      })
      .then(response => response.data.data.data)
      .catch(error => errorHelper(error));
  };

  deleteListing = async (data) => {
    return await axiosInstance
      .put("/listing/deleteListing", data, {
        headers: {
          authorization: `Bearer ${AccessToken}`
        }
      })
      .then(response => response)
      .catch(err => {
        errorHelper(err);
      });
  };

  completeListing = async data => {
    return await axiosInstance
      .put("/listing/completeListing", data, {
        headers: {
          authorization: `Bearer ${AccessToken}`
        }
      })
      .then(response => response)
      .catch(err => {
        errorHelper(err);
      });
  };
  confirmInterest = async data => {
    return await axiosInstance
      .put("/listing/confirmInterest", data, {
        headers: {
          authorization: `Bearer ${AccessToken}`
        }
      })
      .then(response => response)
      .catch(err => {
        errorHelper(err);
      });
  };

  updateListing = async data => {
    return await axiosInstance
      .put("/listing/updateListing", data, {
        headers: {
          authorization: `Bearer ${AccessToken}`
        }
      })
      .then(response => response)
      .catch(err => {
        errorHelper(err);
      });
  };

  contactInNeed = async data => {
    return await axiosInstance
      .put("/listing/contactInNeed", data, {
        headers: {
          authorization: `Bearer ${AccessToken}`
        }
      })
      .then(response => response)
      .catch(err => {
        errorHelper(err);
      });
  };
//-----------------------------------------------------------
  getProfile = async () => {
    return await axiosInstance
      .get("/user/getProfile", {
        headers: {
          authorization: `Bearer ${AccessToken}`
        }
      })
      .then(response => response.data.data.customerData)
      .catch(error => errorHelper(error));
  };

  resendOTP = async data => {
    return await axiosInstance
      .put(
        "/user/resendOTP",
        {},
        {
          headers: {
            authorization: `Bearer ${data}`
          }
        }
      )
      .then(response => response)
      .catch(error => errorHelper(error));
  };

  getAddress = async input => {
    const app_id = "TUbNW3GcKxN51q3zZJB0";
    const app_code = "SOaMBDA1FYyc8mAtg7STgg";
    return axios({
      method: "get",
      url: ` http://autocomplete.geocoder.api.here.com/6.2/suggest.json?app_id=${app_id}&app_code=${app_code}&query=${input}&country=AUS`
    })
      .then(response => response.data)
      .catch(error => errorHelper(error));
  };

  getLatLong = async input => {
    const app_id = "TUbNW3GcKxN51q3zZJB0";
    const app_code = "SOaMBDA1FYyc8mAtg7STgg";
    return await axios({
      method: "get",
      url: ` http://geocoder.api.here.com/6.2/geocode.json?locationid=${input}&jsonattributes=1&gen=9&app_id=${app_id}&app_code=${app_code}`
    })
      .then(response => {
        return {
          response:
            response.data.response.view[0].result[0].location.displayPosition
        };
      })
      .catch(error => errorHelper(error));
  };

  getNews = async data => {
    return await axiosInstanceNews
      .post("/news/getNews", data)
      .then(response => {
        return { response: response };
      })
      .catch(error => {
        return errorHelper(error);
      });
  };

  getStats = async () => {
    return await axiosInstanceStats
      .get("/getdata")
      .then(response => {
        return response.data;
      })
      .catch(error => {
        return errorHelper(error);
      });
  };
}

const instance = new API();
export default instance;
