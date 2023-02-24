import { Inject, Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';
import { APP_NAME } from 'src/app/app.module';

@Injectable()
export class PageTitleStrategy extends TitleStrategy {

    constructor(private readonly title: Title, @Inject(APP_NAME) private readonly appName: string) {
        super();
    }

    override updateTitle(routerState: RouterStateSnapshot) {
        const title = this.buildTitle(routerState);
        if (title !== undefined) {
            this.title.setTitle(`${this.appName} / ${title}`);
        }
        else {
            this.title.setTitle(this.appName);
        }
    }
    
}