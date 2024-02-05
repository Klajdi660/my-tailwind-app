export interface UserParams {
    accountType?: string;
    email: string;
    username: string;
    firstName: string;
    lastName: string;
    password: string;
    passwordConfirm: string;
    agreedToTerms?: boolean;
    otpCode?: string;
    expiredCodeAt?: any;
};
