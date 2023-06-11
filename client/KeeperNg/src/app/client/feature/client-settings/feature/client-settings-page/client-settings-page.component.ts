import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, delay, map, take } from 'rxjs';
import { AccountNamesInterface } from '../../interfaces/account-names.interface';
import { selectUserNames } from 'src/app/shared/data-access/state/authentication/authentication.selectors';
import { AppStateInterface } from 'src/app/shared/data-access/state/app.state';
import { UpdateAccountNamesModel } from '../../models/update-account-names.model';
import { updateNamesFinish } from 'src/app/shared/data-access/state/authentication/authentication.actions';

@Component({
  selector: 'app-client-settings-page',
  templateUrl: './client-settings-page.component.html',
  styleUrls: ['./client-settings-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientSettingsPageComponent {

    public usernamesModel$: Observable<UpdateAccountNamesModel> = this.store.select(selectUserNames).pipe(
        take(1),
        delay(1000),
        map(userNames => new UpdateAccountNamesModel(userNames))
    );

    constructor(private store: Store<AppStateInterface>) {
    }

    onUpdateAccountNamesSubmit(accountNamesInterface: AccountNamesInterface) {
        // api call
        console.log(accountNamesInterface);
        this.store.dispatch(updateNamesFinish({ firstname: accountNamesInterface.firstname ?? '', lastname: accountNamesInterface.lastname ?? '' }));
    }

}