import { INormalizeError } from "./api";
import * as fs from "fs"

export declare namespace Documents {

 interface FileCreateParams {
    file: {
        value: fs.ReadStream;
        options?: {
            filename?: string;
            contentType?: string | null;
        };
    };
    purpose: string;
 }
 
 interface RazorpayDocument {
    /**
     * The unique identifier of the document.
     */ 
    id: string
    /**
     * Indicates the type of entity. 
     */
    entity: string
    /**
     * The reason you are uploading this document. possible value is `dispute_evidence`.
     */
    purpose: string
    name: string
    /**
     * Indicates the nature and format in which the document is uploaded.
     * possible value is `image/jpg`, `image/jpeg`, `image/png`, `application/pdf`
     * 
     */
    mime_type: string
    /**
     * Indicates the size of the document in bytes.
     */
    size: number
    /**
     * Unix timestamp at which the document was uploaded.
     */
    created_at: number
 }
 
}

declare function documents(api: any): {
    /**
     * Create a Document
     * 
     * @param params - Check [doc](https://razorpay.com/docs/api/documents/create/) for required params
     * 
     */
     create(params: Documents.FileCreateParams): Promise<Documents.RazorpayDocument>
     create(params: Documents.FileCreateParams, callback: (err: INormalizeError | null, data: Documents.RazorpayDocument) => void): void;
     /**
     * Fetch document by id
     *
     * @param documentId - The unique identifier of the document  
     *
     */
     fetch(documentId: string): Promise<Documents.RazorpayDocument>
}

export default documents