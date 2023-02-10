export interface RepoInterface {
    id: string;
    name: string;
    description: string;
    createdDate: string;
    allowAnonymousFileRead: boolean;
    overallFileCount: number;
    overallRepositorySize: number;
}