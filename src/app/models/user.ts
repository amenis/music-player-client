 export class User {
    constructor(
        public _id: string,
        public name: string,
        public surnama: string,
        public email: string,
        public password: string,
        public role: string,
        public image: string
    ) {}
 }
