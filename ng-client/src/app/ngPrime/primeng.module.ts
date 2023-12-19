import { NgModule } from "@angular/core";

import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@NgModule({
    declarations: [],
    imports: [ButtonModule, CalendarModule, BrowserAnimationsModule, ConfirmPopupModule, ProgressSpinnerModule],
    exports: [ButtonModule, CalendarModule, BrowserAnimationsModule, ConfirmPopupModule, ProgressSpinnerModule],
    providers: []
})
export class ngPrimeModule {}