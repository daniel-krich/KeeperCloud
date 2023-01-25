import { RepoFileInterface } from "src/app/shared/interfaces/repo-file.interface";
import { RepoInterface } from "src/app/shared/interfaces/repo.interface";
import { BaseStateInterface } from "./base-state.interface";
import { RepositoryFilesStateInterface } from "./repository-files-state.interface";


export interface RepositoryStateInterface extends BaseStateInterface {
    repositories: RepoInterface[];
    loadedIndividuallyCount: number;
    batchRemainder: number;
    disableAdditionalBatchLoading: boolean;
}