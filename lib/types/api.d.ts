interface IOption<T> {
    [key: string]: T
}

interface IPayload {
    url: string,
    params: IOption<any>
}

export interface IRazorpayHeaders {
    'X-Razorpay-Account': string,
    'Content-Type': string
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