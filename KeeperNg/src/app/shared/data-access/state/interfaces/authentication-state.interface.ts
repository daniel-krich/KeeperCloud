import { UserInterface } from "src/app/shared/interfaces/user.interface";
import { BaseStateInterface } from "./base-state.interface";

export interface AuthenticationStateInterface extends BaseStateInterface {
    user: UserInterface | null;
    isUserLoggedIn: boolean;
}