import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavRepositoriesComponent } from './sidenav-repositories.component';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { RouterModule } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AsyncButtonModule } from 'src/app/shared/directives/async-button/async-button.module';



@NgModule({
    declarations: [
        SidenavRepositoriesComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        MatButtonModule,
        MatTooltipModule,
        MatIconModule,
        NgxSkeletonLoaderModule,
        AsyncButtonModule,
        MatListModule
    ],
    exports: [
        SidenavRepositoriesComponent
    ]
})
export class SidenavRepositoriesModule { }
