import { outputAst } from '@angular/compiler';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-context-menu',
    templateUrl: './context-menu.component.html',
    styleUrls: ['./context-menu.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContextMenuComponent {
    @Input() public itemList: string[] = [];
    @Input() public position: { x: number, y: number } = { x: 0, y: 0 };
    @Input() public visible: boolean = false;
    @Output() public itemClick: EventEmitter<string> = new EventEmitter<string>();

    public onClick(item: string): void {
        this.itemClick.emit(item);
    }
}