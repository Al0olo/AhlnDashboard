import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import config from "config";

const { api } = config;

const AxiosInstance = axios.create({
  baseURL: api.API_URL, // project server-url
  headers: {
    "Accept-Language": "en",
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Set the baseURL and content type headers
AxiosInstance.defaults.baseURL = api.API_URL;
AxiosInstance.defaults.headers.post["Content-Type"] = "application/json";

// Request interceptor to include the token
AxiosInstance.interceptors.request.use(
  (config: any) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Enhanced response interceptor to handle errors
AxiosInstance.interceptors.response.use(
  (response) => response.data,
  (error: any) => {
    if (!error.response) {
      // Network error or no response
      console.error("Network error or no response:", error);
      return Promise.reject("Network error or server is not responding.");
    }

    let message;
    switch (error.response.status) {
      case 500:
        message = "Internal Server Error";
        break;
      case 400:
        message = error.response?.data?.message;
        break;
      case 404:
        message = "Sorry! The data you are looking for could not be found";
        break;
      default:
        message = error.message || "An error occurred";
    }
    return Promise.reject(message);
  }
);

/**
 * Sets the default authorization
 * @param token - JWT token
 */
const setAuthorization = (token: string) => {
  if (token) {
    // sessionStorage.setItem("token", token);
    AxiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete AxiosInstance.defaults.headers.common["Authorization"];
    sessionStorage.removeItem("authUser");
  }
};

/**
 * Removes the authorization header and token from storage
 */
const removeAuthorization = () => {
  delete AxiosInstance.defaults.headers.common["Authorization"];
  sessionStorage.removeItem("authUser");
};

class APIClient {
  get = (url: string, params?: any): Promise<AxiosResponse> => {
    const paramKeys: string[] = params
      ? Object.keys(params).map((key) => `${key}=${params[key]}`)
      : [];

    const queryString = paramKeys.length ? `?${paramKeys.join("&")}` : "";
    return AxiosInstance.get(`${url}${queryString}`);
  };

  create = (url: string, data: any) => {
    return AxiosInstance.post(url, data);
  };

  update = (url: string, data: any) => {
    return AxiosInstance.put(url, data);
  };

  put = (url: string, data: any) => {
    return AxiosInstance.put(url, data);
  };

  delete = (
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse> => {
    return AxiosInstance.delete(url, { ...config });
  };
}

const getLoggedinUser = () => {
  const user = sessionStorage.getItem("authUser");
  return user ? JSON.parse(user) : null;
};

export { APIClient, getLoggedinUser, removeAuthorization, setAuthorization };
