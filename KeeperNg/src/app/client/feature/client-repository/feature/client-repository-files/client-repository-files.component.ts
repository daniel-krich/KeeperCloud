import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, Subscription } from 'rxjs';
import { RepositoryDataService } from 'src/app/client/data-access/repository-data.service';

@Component({
  selector: 'app-client-repository-files',
  templateUrl: './client-repository-files.component.html',
  styleUrls: ['./client-repository-files.component.scss']
})
export class ClientRepositoryFilesComponent implements OnDestroy {

    public repoId$: Observable<string | null> = this.route.paramMap.pipe(
        map(x => x.get('repositoryId'))
    );

    private routerParamsSubscribe: Subscription;

    constructor(private route: ActivatedRoute, private repoService: RepositoryDataService) {
        this.routerParamsSubscribe = this.repoId$.subscribe(repoId => this.onRepoIdChanges(repoId));
    }

    
    onRepoIdChanges(repoId: string | null): void {
        if(repoId)
            this.repoService.loadRepository(repoId).subscribe(x => console.log(x));
    }
    

    ngOnDestroy(): void {
        this.routerParamsSubscribe.unsubscribe();
    }
}