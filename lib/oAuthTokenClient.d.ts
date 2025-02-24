import API, { INormalizeError } from "./types/api"

declare namespace OAuthTokenClient {

    interface OAuthTokenBaseRequestBody {
        /**
         * Unique client identifier.
         */
        client_id: string;
        /**
         * Client secret string.
         */
        client_secret: string;
    }

    interface InitiateAuthorisationRequest extends Pick<OAuthTokenBaseRequestBody, 'client_id'>{
        /**
         * Specifies that the application is requesting an 
         * authorisation code grant. possible value is `code`.
         */
        response_type: string;
        /**
         * Callback URL used by Razorpay to redirect after the user approves or denies the authorisation request. 
         * The client should whitelist the `redirect_uri`.
         */
        redirect_uri: string;
        /**
         * Defines what access your application is requesting from the user. You can request multiple scopes 
         * by separating with a space.
         * possible values is `read_only` or `read_write`.
         */
        scope: string | string[];
        /**
         * Check [doc](https://razorpay.com/docs/partners/technology-partners/onboard-businesses/integrate-oauth/integration-steps/#query-parameters) for required params
         */
        state: string;
        onboarding_signature?: string;
    }

    interface OAuthTokenRequest extends OAuthTokenBaseRequestBody {
        /**
         * Defines the grant type for the request. possible value is `authorization_code` or `refresh_token`
         */
        grant_type?: "authorization_code" | "refresh_token";
        /**
         * Specifies the same `redirect_uri` used in the authorisation request.
         */
        redirect_uri?: string;
        /**
         * Decoded authorisation code received in the last step.
         */
        code?: string;
        /**
         * The type of mode. possible values is `test` or `live`.
         */
        mode?: "test" | "live";
        /**
         * Used to refresh the access token when it expires.
         */
        refresh_token?: string;
        /**
         * The type of token for the request. possible value is `access_token` or `refresh_token`.
         */
        token_type_hint?: "access_token" | "refresh_token";
        /**
         * The token whose access should be revoked.
         */
        token?: string;
    }

    interface OAuthTokenTokenResponse {
        /**
         * A public key is used only for public routes such as Checkout or Payments.
         */
        public_token: string;
        /**
         * Defines the type of access token. possible value is `Bearer`
         */
        token_type: string;
        /**
         * Integer representing the TTL of the access token in seconds.
         */
        expires_in: number;
        /**
         * A private key used to access sub-merchant resources on Razorpay. 
         * used for server-to-server calls only.
         */
        access_token: string;
        /**
         * Used to refresh the access token when it expires.
         */
        refresh_token:string;
        /**
         * Identifies the sub-merchant ID who granted the authorisation.
         */
        razorpay_account_id: string;
    }
}

declare class OAuthTokenClient extends API{
    constructor()

    getEntityUrl(): string;
    /**
     * Initiate Authorisation Using URL
     * @param param - Check [doc](https://razorpay.com/docs/partners/technology-partners/onboard-businesses/integrate-oauth/integration-steps/#query-parameters) for required params
     */
    generateAuthUrl(param: OAuthTokenClient.InitiateAuthorisationRequest): string;

    /**
     * Get access token
     * @param param - Check [doc](https://razorpay.com/docs/partners/technology-partners/onboard-businesses/integrate-oauth/integration-steps/#request-parameters) for required params
     */
    getAccessToken(param: OAuthTokenClient.OAuthTokenRequest): Promise<OAuthTokenClient.OAuthTokenTokenResponse>;
    getAccessToken(param: OAuthTokenClient.OAuthTokenRequest, callback: (err: INormalizeError | null, data: OAuthTokenClient.OAuthTokenTokenResponse) => void): void

    /**
     * Get refresh token
     * @param param - Check [doc](https://razorpay.com/docs/partners/technology-partners/onboard-businesses/integrate-oauth/integration-steps/#refresh-token-api) for required params
     */    
    refreshToken(param: OAuthTokenClient.OAuthTokenRequest): Promise<OAuthTokenClient.OAuthTokenTokenResponse>;
    refreshToken(param: OAuthTokenClient.OAuthTokenRequest, callback: (err: INormalizeError | null, data: OAuthTokenClient.OAuthTokenTokenResponse) => void): void

    /**
     * Revoke token
     * @param param - Check [doc](https://razorpay.com/docs/partners/technology-partners/onboard-businesses/integrate-oauth/integration-steps/#revoke-token-api) for required params
     */
    revokeToken(param: OAuthTokenClient.OAuthTokenRequest): Promise<{ message: string;}>;
    revokeToken(param: OAuthTokenClient.OAuthTokenRequest, callback: (err: INormalizeError | null, data: { message: string;}) => void): void
}

export = OAuthTokenClient
