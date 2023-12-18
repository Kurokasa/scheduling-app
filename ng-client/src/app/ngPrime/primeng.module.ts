import { NgModule } from "@angular/core";

import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmPopupModule } from 'primeng/confirmpopup';

@NgModule({
    declarations: [],
    imports: [ButtonModule, CalendarModule, BrowserAnimationsModule, ConfirmPopupModule],
    exports: [ButtonModule, CalendarModule, BrowserAnimationsModule, ConfirmPopupModule],
    providers: []
})
export class ngPrimeModule {}