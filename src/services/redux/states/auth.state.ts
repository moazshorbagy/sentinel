export interface IAuthState {
    // null token means that the user is not authenticated
    token: string;
    loginTimestamp: Date;
}