import { IMap, RazorpayPaginationOptions, INormalizeError } from "./api"
import { Payments } from "./payments"

export declare namespace QrCode {

    interface RazorpayTaxInvoice {
        /**
         * This is the invoice number against which the payment is collected. 
         * If not provided, the transaction will default to non-GST compliant UPI flow.
         */
        number?: string;
        /**
         * Unix Timestamp that indicates the issue date of the invoice.
         * If not provided, it will default to the current date.
         */
        date?: number;
        /**
         * Customer name on the invoice. If not provided, the transaction 
         * will default to non-GST compliant UPI flow.
         */
        customer_name?: string;
        /**
         * The GSTIN mentioned on the invoice.
         */
        business_gstin?: string;
        /**
         * GST amount on the invoice in paise. If not provided, the transaction 
         * will default to the non-GST compliant UPI flow.
         */
        gst_amount?: number;
        /**
         * CESS Amount on the invoice in paise. If not provided, the transaction 
         * will default to the non-GST compliant UPI flow.
         */
        cess_amount?: number;
        /**
         * Indicates whether the transaction is interstate or intrastate. Possible values:
         * 
         * `interstate` or `intrastate` If not provided, the transaction will default to the non-GST compliant UPI flow.
         */
        supply_type?: 'interstate' | 'intrastate';
    }

    interface RazorpayQrCodeBaseRequestBody {
        /**
         * The type of the QR Code. Possible values:
         * 
         * `upi_qr`: Create a QR Code that accepts only UPI payments.
         * 
         * `bharat_qr`: Create a QR Code that accepts UPI and card payments.
         */
        type: 'upi_qr' | 'bharat_qr';
        /**
         * Label entered to identify the QR Code. For example, `Store Front Display`.
         */
        name?: string;
        /**
         * Indicates if the QR Code should be allowed to accept single payment or 
         * multiple payments. Possible values:
         * 
         * `single_use`: QR Code will accept only one payment and then close automatically.
         * 
         * `multiple_use` (default): QR Code will accept multiple payments.
         */
        usage: string;
        /**
         * Indicates if the QR Code should accept payments of specific amounts or any amount.
         * 
         * `true`: QR Code accepts only a specific amount.
         * 
         * `false` (default): QR code accepts any amount.
         */
        fixed_amount?: boolean;
        /**
         * The amount allowed for a transaction. If this is specified, 
         * then any transaction of an amount less than or more than this 
         * value is not allowed. For example, if this amount is set as `500000`, 
         * the customer cannot pay an amount less than or more than ₹5000. 
         * `(if fixed_amount=true)`
         */
        payment_amount?: number;
        /**
         * A brief description about the QR Code.
         */
        description?: string;
        /**
         * The unique identifier of the customer the QR Code is linked with.
         */
        customer_id?: string;
        /**
         * Unix timestamp at which the QR Code is scheduled to be automatically closed. 
         * The time must be at least 15 minutes after the current time. 
         */
        close_by?: number;
        /**
         * Key-value pair that can be used to store additional information about the QR Code.
         */
        notes?: IMap<string | number>;

    }

    interface RazorpayQrCodeCreateRequestBody extends RazorpayQrCodeBaseRequestBody { }

    interface RazorpayQrCodeGstCreateRequestBody extends RazorpayQrCodeBaseRequestBody {
        /**
         * This block contains information about the invoices.
         */
        tax_invoice?: RazorpayTaxInvoice;
    }

    interface RazorpayQrCode extends RazorpayQrCodeBaseRequestBody, RazorpayQrCodeGstCreateRequestBody {
        /**
         * The unique identifier of the QR Code.
         */
        id: string,
        /**
         * Indicates the type of entity.
         */
        entity: string,
        /**
         * The unix timestamp at which the QR Code was created.
         */
        created_at: number,
        /**
         * The URL of the QR Code. A sample short URL looks like 
         * this `http://rzp.io/l6MS`. Click the link to download the code.
         */
        image_url: string,
        /**
         * Indicates the status of the QR Code. 
         */
        status: 'active' | 'closed',
        /**
         * The total amount received on the QR Code. All captured payments are considered.
         */
        payments_amount_received: number,
        /**
         * The total number of payments received on the QR Code. All captured 
         * payments are considered.
         */
        payments_count_received: number,
        /**
         * The unix timestamp at which the QR Code is automatically closed.
         */
        closed_at: number,
        /**
         * The reason for the closure of the QR Code. Possible values:
         * 
         * `on_demand`: When you close the QR Code using the APIs or the Razorpay Dashboard.
         * 
         * `paid`: If the QR Code is created with the usage=single_payment parameter, 
         * the QR Code closes automatically once the customer makes the payment, 
         * with the reason marked as paid.
         * 
         * `null`: The QR Code has not been closed yet.
         */
        close_reason?: 'on_demand' | 'paid' | null
    }

    interface RazorpayQrCodeQuery extends RazorpayPaginationOptions {
        customer_id?: string;
        payment_id?: string;
    }
}


declare function qrCode(api: any): {
    /**
     * Creates a qrcode
     * 
     * @param params - Check [doc](https://razorpay.com/docs/api/qr-codes/gst/#create-a-qr-code) for required params
     * 
     */
    create(params: QrCode.RazorpayQrCodeCreateRequestBody | QrCode.RazorpayQrCodeGstCreateRequestBody): Promise<QrCode.RazorpayQrCode>
    create(params: QrCode.RazorpayQrCodeCreateRequestBody | QrCode.RazorpayQrCodeGstCreateRequestBody, callback: (err: INormalizeError | null, data: QrCode.RazorpayQrCode) => void): void;
    /**
    * Get all qrcodes
    *
    * @param params - Check [doc](https://razorpay.com/docs/api/qr-codes/gst/#fetch-multiple-qr-codes) for required params
    *
    */
    all(params?: QrCode.RazorpayQrCodeQuery): Promise<{
        entity: string;
        count: number;
        items: Array<QrCode.RazorpayQrCode>;
    }>
    all(params: QrCode.RazorpayQrCodeQuery, callback: (err: INormalizeError | null, data: {
        entity: string,
        count: number,
        items: Array<QrCode.RazorpayQrCode>
    }) => void): void
    /**
    * Fetches a qrode given QrCode ID
    *
    * @param qrCodeId - The unique identifier of the QR Code.
    *
    */
    fetch(qrCodeId: string): Promise<QrCode.RazorpayQrCode>
    fetch(qrCodeId: string, callback: (err: INormalizeError | null, data: QrCode.RazorpayQrCode) => void): void;
    /**
    * Fetch Payments for a QR Code
    *
    * @param qrCodeId - The unique identifier of the QR Code.
    * @param params - Check [doc](https://razorpay.com/docs/api/qr-codes/gst/#fetch-payments-for-a-qr-code) for required params
    * 
    */
    fetchAllPayments(qrCodeId: string, params?: RazorpayPaginationOptions): Promise<{
        entity: string;
        count: number;
        items: Array<Payments.RazorpayPayment>;
    }>
    fetchAllPayments(qrCodeId: string, params: RazorpayPaginationOptions, callback: (err: INormalizeError | null, data: {
        entity: string,
        count: number,
        items: Array<Payments.RazorpayPayment>
    }) => void): void
    /**
    * Close a QR Code
    *
    * @param qrCodeId - The unique identifier of the QR Code.
    *  
    */
    close(qrCodeId: string): Promise<QrCode.RazorpayQrCode>
    close(qrCodeId: string, callback: (err: INormalizeError | null, data: QrCode.RazorpayQrCode) => void): void;
}

export default qrCode