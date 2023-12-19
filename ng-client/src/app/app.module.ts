import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ngPrimeModule } from './ngPrime/primeng.module';
import { FooterComponent } from './footer/footer.component';
import { DateListComponent } from './date-list/date-list.component';
import { DateComponent } from './date-list/date/date.component';
import { CalendarComponent } from './calendar/calendar.component';
import { FormsModule } from '@angular/forms';
import { GroupsComponent } from './groups/groups.component';
import { ProfilComponent } from './profil/profil.component';
import { GroupComponent } from './groups/group/group.component';
import { GroupEditComponent } from './groups/group-edit/group-edit.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReScheduleComponent } from './date-list/re-schedule/re-schedule.component';
import { MsgBoxComponent } from './msg-box/msg-box.component';
import localeDe from '@angular/common/locales/de';
import { registerLocaleData } from '@angular/common';
import { jwtInterceptor } from './shared/jwt-Intercepter';
import { LoginComponent } from './login/login.component';
import { GroupJoinComponent } from './groups/group-join/group-join.component';
registerLocaleData(localeDe, 'de');

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    DateListComponent,
    DateComponent,
    CalendarComponent,
    GroupsComponent,
    ProfilComponent,
    GroupComponent,
    GroupEditComponent,
    ReScheduleComponent,
    MsgBoxComponent,
    LoginComponent,
    GroupJoinComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ngPrimeModule,
    HttpClientModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: "de-De"},
    { provide: HTTP_INTERCEPTORS,
      useClass: jwtInterceptor,
      multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
