import got from 'got';
export class ToxotidaeClient {
    _baseUrl;
    _username;
    _password;
    _ubusSession = null;
    _client;
    constructor(baseUrl, username, password) {
        this._baseUrl = baseUrl;
        this._username = username;
        this._password = password;
        this._client = got.extend({
            prefixUrl: this._baseUrl,
            responseType: "json",
            https: { rejectUnauthorized: false },
        });
    }
    async login() {
        const response = await this._client.post("api/login", {
            json: {
                username: this._username,
                password: this._password,
            },
        });
        const body = response.body;
        if (!body.success || !body.ubus_rpc_session) {
            throw new Error("Login error");
        }
        this._ubusSession = body.ubus_rpc_session;
    }
    isLogin() {
        return this._ubusSession !== null;
    }
    async sendSMS(phone, message) {
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
        const body = response.body;
        return !body.success;
    }
    async logout() {
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
        const body = response.body;
        if (!body.success) {
            throw new Error("Logout error");
        }
        this._ubusSession = null;
    }
}
//# sourceMappingURL=ToxotidaeClient.js.map