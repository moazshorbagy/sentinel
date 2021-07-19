import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';

declare module 'axios' {
    interface AxiosResponse<T = any> extends Promise<T> { }
}

export abstract class WebClient {

    private _baseURL = process.env.REACT_APP_API_SERVER || 'http://localhost:1337';
    protected instance: AxiosInstance;

    constructor() {
        this.instance = axios.create({
            baseURL: this._baseURL
        });
        this._initializeResponseInterceptor();
    }

    // Http Interceptors: can be improved later..
    private _initializeResponseInterceptor = () => {
        this.instance.interceptors.response.use(
            this._handleResponse,
            this._handleError
        );
    }

    private _handleResponse = ({ data }: AxiosResponse) => data;

    // Can provide here http auth interceptors for usage timeout 
    private _handleError = (error: AxiosError) => Promise.reject(error);
}