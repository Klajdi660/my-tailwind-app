export interface UserParams {
    email: string;
    username: string;
    firstName: string;
    lastName: string;
    password: string;
    passwordConfirm: string;
    agreedToTerms?: boolean;
    isSubscribed?: boolean;
    otpCode?: string;
    expiredCodeAt?: any;
};
