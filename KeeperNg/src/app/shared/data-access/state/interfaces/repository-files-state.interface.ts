import { RepoFileInterface } from "src/app/shared/interfaces/repo-file.interface";
import { BaseStateInterface } from "./base-state.interface";


export interface RepositoryFilesStateInterface extends BaseStateInterface {
    files: RepoFileInterface[];
    disableAdditionalBatchLoading: boolean;
}

export interface RepositoriesFilesStateInterface extends BaseStateInterface {
    filesByRepositoryKeys: { [repositoryId: string]: RepositoryFilesStateInterface }
}