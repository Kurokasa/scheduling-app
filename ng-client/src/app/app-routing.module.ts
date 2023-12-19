import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DateListComponent } from './date-list/date-list.component';
import { CalendarComponent } from './calendar/calendar.component';
import { GroupsComponent } from './groups/groups.component';
import { ProfilComponent } from './profil/profil.component';
import { GroupEditComponent } from './groups/group-edit/group-edit.component';
import { ReScheduleComponent } from './date-list/re-schedule/re-schedule.component';
import { LoginComponent } from './login/login.component';
import { GroupJoinComponent } from './groups/group-join/group-join.component';

const routes: Routes = [
  {path: '', component: DateListComponent},
  {path: 'list', component: DateListComponent},
  {path: 'calendar', component: CalendarComponent},
  {path: 'groups', component: GroupsComponent},
  {path: 'profil', component: ProfilComponent},
  {path: 'group/:grp', component: GroupEditComponent},
  {path: 'group/join/:grp', component: GroupJoinComponent},
  {path: 'reschedule/:id', component: ReScheduleComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
