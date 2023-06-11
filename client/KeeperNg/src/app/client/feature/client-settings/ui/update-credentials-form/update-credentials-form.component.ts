import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { UpdateAccountNamesModel } from '../../models/update-account-names.model';
import { Observable } from 'rxjs';
import { AccountNamesInterface } from '../../interfaces/account-names.interface';

@Component({
  selector: 'app-update-credentials-form',
  templateUrl: './update-credentials-form.component.html',
  styleUrls: ['./update-credentials-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UpdateCredentialsFormComponent {
    @Input() public updateAccountNamesModel: UpdateAccountNamesModel | null = null;

    @Output() public updateAccountNamesSubmit: EventEmitter<AccountNamesInterface> = new EventEmitter<AccountNamesInterface>();

    onUpdateAccountNamesSubmit() {
        if(this.updateAccountNamesModel) {
            this.updateAccountNamesSubmit.emit({ firstname: this.updateAccountNamesModel.firstname, lastname: this.updateAccountNamesModel.lastname });
        }
    }
}