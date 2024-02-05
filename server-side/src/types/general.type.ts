// server
export interface AppParams {
    port?: number;
    prefix?: string;
    client_url?: string;
}

// clients db && redis
export interface MysqlParams {
    host: string;
    user: string;
    password: string;
    database: string;
}

export interface RedisParams {
    host: string;
    port: number;
}

// utils mailer
export interface SmtpEmailTypesParams {
    service: string;
    host: string;
    port: number;
    secure: boolean;
    email: string;
    password: string;
};

// utils jwt && cookiOpts
export interface JWTParams {
    access_token_secret?: string;
    access_token_expires?: number | any;
    refresh_token_expires?: number | any;
    jwt_cookie_expires?: string;
}

// OTP 
interface OtpConfig {
    lowerCaseAlphabets: boolean;
    upperCaseAlphabets: boolean;
    specialChars: boolean;
};

export interface OtpSettings {
    otpLength: number;
    otpConfig: OtpConfig;
};

// config
export interface GoogleAuthParams {
    id: string;
    displayName: string;
    name: {
        familyName: string;
        givenName: string;
    };
    email: {
        value: string;
        verified: boolean;
    }[];
    photos: {
        value: string;
    }[];
    provider: string;
    _row: string;
    _json: {
        sub: string;
        name: string;
        given_name: string;
        family_name: string;
        picture: string;
        email: string;
        email_verified: boolean;
        locale: string;
    };
};