import { AuthenticationStateInterface } from "./interfaces/authentication-state.interface";
import { RepositoryStateInterface } from "./interfaces/repository-state.interface";

export interface AppStateInterface {
    authentication: AuthenticationStateInterface,
    repository: RepositoryStateInterface
}