interface IOption<T> {
    [key: string]: T
}

interface IPayload {
    url: string,
    params: IOption<any>
}

export interface IRazorpayHeaders {
    'X-Razorpay-Account'?: string,
    'Content-Type'?: string
}

/**
 * Key-value pairs 
 */
export interface IMap<T> {
    [key: string]: T | null;
}

export interface IRazorpayQuery {
    from?: number;
    to?: number;
    count?: number;
    skip?: number;
}

declare class API {
    constructor(options: IOption<any>)
    get(params: IPayload): Promise<any>
    post(params: IPayload): Promise<any>
    put(params: IPayload): Promise<any>
    patch(params: IPayload): Promise<any>
    delete(params: IPayload): Promise<any>
    private allowedHeaders;
    private normalizeError;
    private getValidHeaders;
}

export default API