import { RepoInterface } from "src/app/shared/interfaces/repo.interface";
import { UserInterface } from "src/app/shared/interfaces/user.interface";
import { BaseStateInterface } from "./base-state.interface";

export interface RepositoryStateInterface extends BaseStateInterface {
    repositories: RepoInterface[];
    disableAdditionalBatchLoading: boolean;
}