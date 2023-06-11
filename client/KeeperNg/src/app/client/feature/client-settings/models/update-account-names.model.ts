import { AccountNamesInterface } from "../interfaces/account-names.interface";

export class UpdateAccountNamesModel implements AccountNamesInterface {

    firstname: string;
    lastname: string;

    constructor(accountNames?: AccountNamesInterface) {
        this.firstname = accountNames?.firstname ?? '';
        this.lastname = accountNames?.lastname ?? '';
    }
    
}