import { RepositoryMemberModel } from "../../models/repository-member.model";

export class MemberHolderDialogModel {

    constructor(public buttonSubmitText: string, public repositoryMember: RepositoryMemberModel = new RepositoryMemberModel()) {

    }
    
}