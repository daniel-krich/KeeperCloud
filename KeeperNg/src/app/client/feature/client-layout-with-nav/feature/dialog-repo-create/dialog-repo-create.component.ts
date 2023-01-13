import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreateRepositoryModel } from '../../models/create-repository.model';

@Component({
  template: `

        <div mat-dialog-content>
        <p>Repository creation</p>
        <mat-form-field appearance="fill">
            <mat-label>Repository name</mat-label>
            <input matInput name="name" [(ngModel)]="repoModel.name">
        </mat-form-field>
        <mat-form-field appearance="fill">
            <mat-label>Repository description</mat-label>
            <textarea matInput name="desc" [(ngModel)]="repoModel.description"></textarea>
        </mat-form-field>
        </div>
        <div mat-dialog-actions class="d-flex justify-content-center">
            <button mat-button (click)="closeDialog()">Cancel</button>
            <button mat-button [mat-dialog-close]="repoModel" cdkFocusInitial>Ok</button>
        </div>

  `
})
export class DialogRepoCreateComponent {
    
    constructor(public dialogRef: MatDialogRef<DialogRepoCreateComponent>,
                @Inject(MAT_DIALOG_DATA) public repoModel: CreateRepositoryModel) {}

    closeDialog() {
        this.dialogRef.close();
    }

}