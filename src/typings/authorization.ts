export interface IVKAuthApplication {
    appId: number;
    secret: string;
    title: string;
}

// TODO: move to @apidog/typings
export interface IVKAuthSuccess {
    access_token: string;
    expire_in: number;
    user_id: number;
}

export interface IVKAuthError {
    error: string;
    error_message: string;
    captcha_url?: string;
}
