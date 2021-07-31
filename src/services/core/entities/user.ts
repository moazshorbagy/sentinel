export class User {
    constructor(
        public token: string,
        public loginTimestamp: Date
    ) {}
}