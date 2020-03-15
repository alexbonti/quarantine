import { AccessToken, logout } from "contexts/helpers";
import { notify } from "components";
import { axiosInstance, axiosInstanceNews, axiosInstanceStats} from "../index";
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


registerUser = async (data) =>{
  return await axiosInstance
  .post("user/register", data)
  .then(response => response.data.data)
  .catch(error=>errorHelper(error))
}

verifyOTP = async (data, accessToken) =>{
  return await axiosInstance
  .put("user/verifyOTP", data,{
    headers: {
      authorization: `Bearer ${accessToken}`
    }
  })
  .then(response => response.data.data)
  .catch(error=>errorHelper(error))
}

  getProfile= async () => {
    return await axiosInstance
    .get(
        "/user/getProfile",
        {
          headers: {
            authorization: `Bearer ${AccessToken}`
          }
        }
      )
      .then(response => response.data.data.customerData)
      .catch(error => errorHelper(error));
  };




  getUserList= async () => {
    return await axiosInstance
    .get(
        "contracts/getUser",
        {
          headers: {
            authorization: `Bearer ${AccessToken}`
          }
        }
      )
      .then(response => response.data.data.data)
      .catch(error => errorHelper(error));
  };

  getNews = async data => {
    return await axiosInstanceNews
      .post("/news/getNews", data)
      .then(response => {
        return { "response": response };
      })
      .catch(error => {
        return errorHelper(error);
      });
  };

  getStats = async () => {
    return await axiosInstanceStats
      .get("/quarantine/data")
      .then(response => {
        return { "response": response };
      })
      .catch(error => {
        return errorHelper(error);
      });
  };
}


const instance = new API();
export default instance;
