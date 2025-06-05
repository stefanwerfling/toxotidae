export declare class ToxotidaeClient {
    protected _baseUrl: string;
    protected _username: string;
    protected _password: string;
    protected _ubusSession: string | null;
    private _client;
    constructor(baseUrl: string, username: string, password: string);
    login(): Promise<void>;
    isLogin(): boolean;
    sendSMS(phone: string, message: string): Promise<boolean>;
    logout(): Promise<void>;
}
