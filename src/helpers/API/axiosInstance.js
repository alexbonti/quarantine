import axios from 'axios';

const baseURL = process.env.REACT_APP_BASE_URL + '/api/';
const newsUrl = process.env.REACT_APP_NEWS_URL + "/api/";
const statsURL = process.env.REACT_APP_STATS_URL +"/api/"


export const axiosInstance = axios.create({
  baseURL: baseURL,
});
export const axiosInstanceNews = axios.create({
  baseURL: newsUrl,
});

export const axiosInstanceStats= axios.create({
  baseURL: statsURL,
});