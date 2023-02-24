import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BehaviorSubject, map, Subject } from 'rxjs';
import { RepositoryModel } from '../../../../model/repository.model';
import { RepositoryPermissionFlags } from '../../interfaces/repository-member.interface';
import { RepositoryMemberModel } from '../../models/repository-member.model';
import { MemberHolderDialogModel } from './member-holder-dialog.model';

type permissionWithName = {
    action: string,
    flag: RepositoryPermissionFlags
};

@Component({
    selector: 'app-member-add-dialog',
    templateUrl: './member-holder-dialog.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MemberHolderDialogComponent {

    public stringPermissions: permissionWithName[] = [
        { action: 'Read', flag: RepositoryPermissionFlags.CanRead },
        { action: 'Write', flag: RepositoryPermissionFlags.CanWrite },
        { action: 'Update', flag: RepositoryPermissionFlags.CanUpdate },
        { action: 'Delete', flag: RepositoryPermissionFlags.CanDelete },
    ];

    constructor(public dialogRef: MatDialogRef<MemberHolderDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public memberHolderDialog: MemberHolderDialogModel) { }


    public get stringPermissionsSelected(): permissionWithName[] {
        return this.stringPermissions.filter((permission) =>
            !!(this.memberHolderDialog.repositoryMember.permissionFlags & permission.flag)
        );
    }

    remove(permission: RepositoryPermissionFlags): void {
        this.memberHolderDialog.repositoryMember.permissionFlags &= ~permission;
    }

    selected(event: MatAutocompleteSelectedEvent): void {
        const flagSelected: RepositoryPermissionFlags = event.option.value;
        this.memberHolderDialog.repositoryMember.permissionFlags |= flagSelected;
    }

    onSave(): void {
        this.dialogRef.close(true);
    }

    onCancel(): void {
        this.dialogRef.close(false);
    }

}
