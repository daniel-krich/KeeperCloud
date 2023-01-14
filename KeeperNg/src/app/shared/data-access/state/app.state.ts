import { AuthenticationStateInterface } from "./interfaces/authentication-state.interface";
import { FileTransferStateInterface } from "./interfaces/file-transfer-state.interface";
import { RepositoriesFilesStateInterface } from "./interfaces/repository-files-state.interface";
import { RepositoryStateInterface } from "./interfaces/repository-state.interface";

export interface AppStateInterface {
    authentication: AuthenticationStateInterface,
    repositories: RepositoryStateInterface,
    repositoriesFiles: RepositoriesFilesStateInterface,
    fileTransfer: FileTransferStateInterface
}