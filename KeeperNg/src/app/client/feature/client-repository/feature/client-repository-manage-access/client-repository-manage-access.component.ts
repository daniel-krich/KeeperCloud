import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, first, map, Observable, switchMap } from 'rxjs';
import { AppStateInterface } from 'src/app/shared/data-access/state/app.state';
import { selectRepoById } from 'src/app/shared/data-access/state/repository/repository.selectors';
import { MemberManageApiService } from './data-access/member-manage-api.service';
import { RepositoryMemberInterface } from './interfaces/repository-member.interface';

@Component({
  selector: 'app-client-repository-manage-access',
  templateUrl: './client-repository-manage-access.component.html',
  styleUrls: ['./client-repository-manage-access.component.scss'],
  host: { 'class': 'flex-spacer' },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientRepositoryManageAccessComponent {
    
    public repoId$: Observable<string | null> = this.route.parent!.parent!.paramMap.pipe(
        map(x => x.get('repositoryId'))
    );

    public repository$ = this.repoId$.pipe(
        switchMap(repoId =>
            this.store.select(selectRepoById(repoId)).pipe(
                filter(x => x !== null)
            )
        )
    );

    public repositoryApiMembers$: Observable<RepositoryMemberInterface[]> = this.repository$.pipe(
        switchMap(x => this.memberManageApi.fetchAllMembers(x?.id!))
    );

    public onClickApiToken(token: string): void {
        
    }

    constructor(private route: ActivatedRoute,
                private store: Store<AppStateInterface>,
                private memberManageApi: MemberManageApiService) { }
}