import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreateRepositoryModel } from '../../models/create-repository.model';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <form class="d-flex flex-column p-2" #editRepoForm="ngForm" (ngSubmit)="onSave()">
            <div class="form-row">
                <mat-form-field floatLabel="always" class="form-group col-12 p-2">
                    <mat-label>Repository name</mat-label>
                    <input matInput type="text" name="repository_name" [(ngModel)]="repoModel.name" maxlength="60" #repositoryNameField="ngModel" required />
                    <mat-error *ngIf="repositoryNameField.invalid">Please enter a valid repository name.</mat-error>
                </mat-form-field>
            </div>

            <div class="form-row">
                <mat-form-field floatLabel="always" class="form-group col-12 p-2">
                    <mat-label>Repository description</mat-label>
                    <textarea matInput placeholder="Repository description"
                                type="text" name="repository_description"
                                
                                [(ngModel)]="repoModel.description" maxlength="256" #repositoryDescriptionField="ngModel" required></textarea>
                    <mat-error *ngIf="repositoryDescriptionField.invalid">Please enter a valid repository description.</mat-error>
                </mat-form-field>
            </div>

            <div class="d-flex justify-content-around">
                <button mat-flat-button type="button" (click)="onCancel()">
                    Cancel
                </button>

                <button mat-raised-button color="primary" type="submit" [disabled]="!editRepoForm.valid">
                    Create
                </button>
            </div>
            
        </form>

  `
})
export class DialogRepoCreateComponent {

    constructor(public dialogRef: MatDialogRef<DialogRepoCreateComponent>,
        @Inject(MAT_DIALOG_DATA) public repoModel: CreateRepositoryModel) { }

    onSave(): void {
        this.dialogRef.close(true);
    }

    onCancel(): void {
        this.dialogRef.close(false);
    }

}