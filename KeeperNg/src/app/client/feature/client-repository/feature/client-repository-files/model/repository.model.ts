import { RepoInterface } from "src/app/shared/interfaces/repo.interface";

export class RepositoryModel implements RepoInterface {
    id: string;
    name: string;
    description: string;
    createdDate: string;

    constructor(repo: RepoInterface) {
        this.id = repo.id;
        this.name = repo.name;
        this.description = repo.description;
        this.createdDate = repo.createdDate;
    }
}