import nodeify from '../utils/nodeify'


interface IOption  {
  key_id?: string;
  key_secret?: string;
  headers?: RazorpayHeaders;
  oauthToken?: string;
  hostUrl: string;
  ua: string;
}

interface IPayload<T> {
    url: string;
    data?: T;
    formData?: T;
    qs?: T;
    form?: T;
    body?: T;
}

export type INotify = 'email' | 'sms'

export interface RazorpayHeaders {
    'X-Razorpay-Account'?: string;
    'Content-Type'?: string;
}

/**
 * Key-value pairs 
 */
export interface IMap<T> {
    [key: string]: T | null;
}

export type PartialOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

export interface RazorpayPaginationOptions {
    /**
     * The Unix timestamp from when data are to be fetched
     */
    from?: number;
    /**
     * The Unix timestamp till when data are to be fetched.
     */
    to?: number;
    /**
     * The number of data to be fetched. Default value is `10`. Maximum value is `100`.
     * This can be used for pagination, in combination with skip.
     */
    count?: number;
    /**
     * The number of data to be skipped. Default value is `0`. 
     * This can be used for pagination, in combination with count.
     */
    skip?: number;
}

export interface INormalizeError {
    statusCode: string | number;
    error: {
        code: string;
        description: string;
        field?: any;
        source?: string;
        step?: string;
        reason?: string;
        metadata?: { [key: string]: string };
    }
}

declare class API {
    constructor(options: IOption)
    get<T, V>(params: IPayload<T>): Promise<V>
    get<T, V>(params: IPayload<T>, callback: (err: INormalizeError, data: V) => void): void

    post<T, V>(params: IPayload<T>): Promise<V>
    post<T, V>(params: IPayload<T>, callback: (err: INormalizeError, data: V) => void): void

    put<T, V>(params: IPayload<T>): Promise<V>
    put<T, V>(params: IPayload<T>, callback: (err: INormalizeError, data: V) => void): void

    patch<T, V>(params: IPayload<T>): Promise<V>
    patch<T, V>(params: IPayload<T>, callback: (err: INormalizeError, data: V) => void): void

    postFormData<T, V>(params: IPayload<T>): Promise<V>
    postFormData<T, V>(params: IPayload<T>, callback: (err: INormalizeError, data: V) => void): void

    delete<T, V>(params: IPayload<T>): Promise<V>
    delete<T, V>(params: IPayload<T>, callback: (err: INormalizeError, data: V) => void): void
}

export default API