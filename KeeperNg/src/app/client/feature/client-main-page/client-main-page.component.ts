import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppStateInterface } from 'src/app/shared/data-access/state/app.state';
import { selectAuthUser } from 'src/app/shared/data-access/state/authentication/authentication.selectors';
import { selectRepos } from 'src/app/shared/data-access/state/repository/repository.selectors';
import { RepositoryDataService } from '../../data-access/repository-data.service';

@Component({
  selector: 'app-client-main-page',
  templateUrl: './client-main-page.component.html',
  styleUrls: ['./client-main-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientMainPageComponent {
    
    datasets = [
        {
            data: [20, 50, 30],
            type: 'bar',
            label: 'File Operations',
            color: '#fff',
            backgroundColor: '#007bff',
        }
    ];

    labels = ['Access', 'Download', 'Upload'];
    options = { };
    legend = true;
    height = 200;
    width = 300;

    public user$ = this.store.select(selectAuthUser);

    constructor(private store: Store<AppStateInterface>) { }

}
