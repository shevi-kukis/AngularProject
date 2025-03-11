export class User {
    constructor(
        public email: string,
        public password: string,
        public name?: string,
        public role?: Role
    ) { }
}

export enum Role {
    Admin = 'admin',
    Teacher = 'teacher',
    Student = 'student'
}