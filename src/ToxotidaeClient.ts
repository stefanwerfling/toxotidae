import got, {Got} from 'got';

/**
 * Toxotidae Client
 */
export class ToxotidaeClient {

    /**
     * Base Url to device
     * @protected
     */
    protected _baseUrl: string;

    /**
     * Username
     * @protected
     */
    protected _username: string;

    /**
     * Password
     * @protected
     */
    protected _password: string;

    /**
     * ubus session
     * @protected
     */
    protected _ubusSession: string|null = null;

    /**
     * Got Client
     * @private
     */
    private _client: Got;

    /**
     * Constructor
     * @param {string} baseUrl
     * @param {string} username
     * @param {string} password
     */
    public constructor(baseUrl: string, username: string, password: string) {
        this._baseUrl = baseUrl;
        this._username = username;
        this._password = password;

        this._client = got.extend({
            prefixUrl: this._baseUrl,
            responseType: "json",
            https: { rejectUnauthorized: false }, // falls Self-signed
        });
    }


    /**
     * Login
     * @throws {Error}
     */
    public async login(): Promise<void> {
        const response = await this._client.post("api/login", {
            json: {
                username: this._username,
                password: this._password,
            },
        });

        const body = response.body as any;

        if (!body.success || !body.ubus_rpc_session) {
            throw new Error("Login error");
        }

        this._ubusSession = body.ubus_rpc_session;
    }

    /**
     * Is login (has an activ session)
     * @return {boolean}
     */
    public isLogin(): boolean {
        return this._ubusSession !== null;
    }

    /**
     * Send a sms to phone number
     * @param {string} phone
     * @param {string} message
     * @throws {Error}
     * @return {boolean}
     */
    public async sendSMS(phone: string, message: string): Promise<boolean> {
        if (!this._ubusSession) {
            throw new Error('Not logged in');
        }

        const response = await this._client.post("api/mobile_utilities/sms_messages/send/actions/send", {
            headers: {
                Authorization: `Bearer ${this._ubusSession}`,
                Accept: "application/json",
            },
            json: {
                data: {
                    modem: '3-1',
                    number: phone,
                    message: message,
                },
            },
        });

        const body = response.body as any;

        return !body.success;
    }

    /**
     * Logout
     * @throws {Error}
     */
    public async logout(): Promise<void> {
        if (!this._ubusSession) {
            return;
        }

        const response = await this._client.post('api/logout', {
            headers: {
                Authorization: `Bearer ${this._ubusSession}`,
                Accept: "application/json",
            },
            json: {}
        });

        const body = response.body as any;

        if (!body.success) {
            throw new Error("Logout error");
        }

        this._ubusSession = null;
    }
}