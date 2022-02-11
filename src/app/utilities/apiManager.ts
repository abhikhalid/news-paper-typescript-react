import axios, { AxiosResponse } from "axios";
import News from "../models/News";
import { NewsApiResponse } from '../models/NewsApiResponse';

axios.defaults.baseURL = process.env.REACT_APP_NEWS_API_URL;

const responseBody = <T> ( response : AxiosResponse<T>) => response.data;

const requests = {
    get: <T> (url: string) => axios.get<T>(url).then(responseBody),
    post: <T> (url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    delete: <T> (url: string) => axios.post<T>(url).then(responseBody)
}


const NewsService = {
    GetNews: () => requests.get<NewsApiResponse>('top-headlines?country=us&apiKey=b972218951264bc78d6a4b217d61843d')
}

const ApiManager = {
    NewsService
}

export default ApiManager;