declare type FenchOptions = RequestInit & {
    parseErr?: Error;
    headers?: object;
    baseURI?: string;
    raw?: boolean;
    arrayFormat?: string;
    auth?: object;
    timeout?: number;
    body?: object;
    signal?: object;
};
declare class Fench {
    interceptor: object;
    timeout: number;
    parseErr?: Error;
    private opts;
    private headers;
    private raw;
    private arrayFormat;
    constructor(opts?: FenchOptions);
    private setup;
}
export default Fench;
