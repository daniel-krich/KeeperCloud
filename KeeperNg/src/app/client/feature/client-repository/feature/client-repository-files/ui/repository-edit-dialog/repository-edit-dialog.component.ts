import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RepoInterface } from 'src/app/shared/interfaces/repo.interface';
import { RepositoryModel } from '../../model/repository.model';

@Component({
    selector: 'app-repository-edit-dialog',
    template: `
        <form class="d-flex flex-column p-2" #editRepoForm="ngForm" (ngSubmit)="onSave()">
            <div class="form-row">
                <mat-form-field floatLabel="always" class="form-group col-12 p-2">
                    <mat-label>Repository name</mat-label>
                    <input matInput type="text" name="repository_name" [(ngModel)]="repositoryModel.name" maxlength="60" #repositoryNameField="ngModel" required />
                    <mat-error *ngIf="repositoryNameField.invalid">Please enter a valid repository name.</mat-error>
                </mat-form-field>
            </div>

            <div class="form-row">
                <mat-form-field floatLabel="always" class="form-group col-12 p-2">
                    <mat-label>Repository description</mat-label>
                    <textarea matInput placeholder="Repository description"
                                type="text" name="repository_description"
                                
                                [(ngModel)]="repositoryModel.description" maxlength="256" #repositoryDescriptionField="ngModel" required></textarea>
                    <mat-error *ngIf="repositoryDescriptionField.invalid">Please enter a valid repository description.</mat-error>
                </mat-form-field>
            </div>

            <div class="d-flex justify-content-around">
                <button mat-flat-button type="button" (click)="onCancel()">
                    Cancel
                </button>

                <button mat-raised-button color="primary" type="submit" [disabled]="!editRepoForm.valid">
                    Save
                </button>
            </div>
            
        </form>
  `
})
export class RepositoryEditDialogComponent {

    constructor(public dialogRef: MatDialogRef<RepositoryEditDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public repositoryModel: RepositoryModel) { }

    onSave(): void {
        this.dialogRef.close(true);
    }

    onCancel(): void {
        this.dialogRef.close(false);
    }

}
