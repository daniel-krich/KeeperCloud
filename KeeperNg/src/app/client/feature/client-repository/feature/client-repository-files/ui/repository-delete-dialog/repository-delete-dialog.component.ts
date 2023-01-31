import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { RepoInterface } from 'src/app/shared/interfaces/repo.interface';
import { RepositoryModel } from '../../model/repository.model';

@Component({
    selector: 'app-repository-delete-dialog',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <h1 mat-dialog-title>Confirm repository deletion</h1>
        <div mat-dialog-content>
            <p>Please enter "<b>{{repositoryNameValidation}}</b>" to confirm the repository deletion.</p>
            <p>Keep in mind that repository deletion will result in also all the files associated with the repository in permanent deletion.</p>
        </div>
        <form class="d-flex flex-column p-2" #deleteRepoForm="ngForm" (ngSubmit)="onDelete()">

            <div class="form-row">
                <mat-form-field floatLabel="always" class="form-group col-12 p-2">
                    <mat-label>Repository name confirm</mat-label>
                    <input matInput type="text" name="repository_name" [(ngModel)]="repositoryName" #repositoryNameField="ngModel" required />
                    <mat-error *ngIf="repositoryNameField.invalid">Please enter <b>"{{repositoryNameValidation}}"</b>.</mat-error>
                </mat-form-field>
            </div>

            <mat-error class="mb-3 text-center" *ngIf="errorMessage$ | async as errorMessage">{{errorMessage}}</mat-error>

            <div class="d-flex justify-content-around">
                <button mat-flat-button type="button" (click)="onCancel()">
                    Cancel
                </button>

                <button mat-raised-button color="accent" type="submit" [disabled]="!deleteRepoForm.valid">
                    Delete
                </button>
            </div>
            
        </form>
  `
})
export class RepositoryDeleteDialogComponent {

    repositoryName: string = '';

    errorMessage$: Subject<string> = new Subject<string>();

    constructor(public dialogRef: MatDialogRef<RepositoryDeleteDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public repositoryNameValidation: string) { }

    onDelete(): void {
        if(this.repositoryName === this.repositoryNameValidation) {
            this.dialogRef.close(true);
        }
        else {
            this.errorMessage$.next("Repository names doesn't match");
        }
    }

    onCancel(): void {
        this.dialogRef.close(false);
    }

}
