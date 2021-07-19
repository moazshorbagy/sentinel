export class User {
    constructor(
        public token: string,
        public loginTimeStamp: Date
    ) {}
}