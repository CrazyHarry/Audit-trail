/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { TransactionComponent } from './Transaction/Transaction.component'
import { HomeComponent } from './home/home.component';

import { AuditRequestComponent } from './AuditRequest/AuditRequest.component';
import { LogEntryComponent } from './LogEntry/LogEntry.component';


  import { ParticipantAuditorComponent } from './ParticipantAuditor/ParticipantAuditor.component';
  import { ParticipantPublicServantComponent } from './ParticipantPublicServant/ParticipantPublicServant.component';
  import { ParticipantCivilianComponent } from './ParticipantCivilian/ParticipantCivilian.component';


  import { NewLogEntryComponent } from './NewLogEntry/NewLogEntry.component';
  import { NewAuditRequestComponent } from './NewAuditRequest/NewAuditRequest.component';
  import { ChangeAuditRequestStateComponent } from './ChangeAuditRequestState/ChangeAuditRequestState.component';  
const routes: Routes = [
     //{ path: 'transaction', component: TransactionComponent },
    {path: '', component: HomeComponent},
		{ path: 'AuditRequest', component: AuditRequestComponent},
		{ path: 'LogEntry', component: LogEntryComponent},
    
    { path: 'ParticipantAuditor', component: ParticipantAuditorComponent},
    { path: 'ParticipantPublicServant', component: ParticipantPublicServantComponent},
    { path: 'ParticipantCivilian', component: ParticipantCivilianComponent},
        
    { path: 'NewLogEntry', component: NewLogEntryComponent},  
    { path: 'NewAuditRequest', component: NewAuditRequestComponent},
    { path: 'ChangeAuditRequestState', component: ChangeAuditRequestStateComponent},
        
		{path: '**', redirectTo:''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
