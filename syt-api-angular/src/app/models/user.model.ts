export class User {
    id:number;
    firstname:any;
    lastname:any;
    birthday:Date;
    email:any;
    role_id: number;

    constructor(id:number, firstname:any, lastname:any, birthday:Date, email:any, role_id: number) {
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.birthday = birthday;
        this.email = email;
        this.role_id = role_id;
    }

    static parse(data:any) {
        return new User(data.id, data.firstname, data.lastname, data.birthday, data.email, data.role_id);
    }


}
