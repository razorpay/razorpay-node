declare module "razorpay" {

    type RazorPayError = {
        code: string,
        description: string,
        source: string,
        step: string,
        reason: string,
        metadata: {},
        field: string
    }

    type OrderOptions = {
        amount: number,
        receipt: string,
        currency?: "INR",
        payment_capture?: boolean,
        notes?: {
            [notes_key: string]: string
        }
    }

    type CreateOrderResult = {
        id: string,
        entity: "order",
        amount: number,
        amount_paid: number,
        amount_due: number,
        currency: "INR",
        receipt: string,
        offer_id: null,
        status: "created",
        attempts: number,
        notes?: {
            [notes_key: string]: string
        } | any[],
        created_at: number
    }


    type AllQueryOptions = {
        from: number, to: number, count: number, skip: number, authorized: boolean, receipt?: string
    }

    interface OrdersModule {
        create(
            orderOptions: OrderOptions,
            callBackFunction: (err?: RazorPayError, order?: CreateOrderResult) => void
        )
    }


    class RazorPay {
        constructor(args: { key_id: string, key_secret: string });
        orders: OrdersModule
    }

    export = RazorPay;
}
