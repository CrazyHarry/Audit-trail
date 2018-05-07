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

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { DataService }     from './data.service';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
// import { TransactionComponent } from './Transaction/Transaction.component'

import { AuditRequestComponent } from './AuditRequest/AuditRequest.component';
import { LogEntryComponent } from './LogEntry/LogEntry.component';


  import { ParticipantAuditorComponent } from './ParticipantAuditor/ParticipantAuditor.component';
  import { ParticipantPublicServantComponent } from './ParticipantPublicServant/ParticipantPublicServant.component';
  import { ParticipantCivilianComponent } from './ParticipantCivilian/ParticipantCivilian.component';


  import { NewLogEntryComponent } from './NewLogEntry/NewLogEntry.component';
  import { NewAuditRequestComponent } from './NewAuditRequest/NewAuditRequest.component';
  import { ChangeAuditRequestStateComponent } from './ChangeAuditRequestState/ChangeAuditRequestState.component';
@NgModule({
  declarations: [
    AppComponent,
		HomeComponent,
    // TransactionComponent,
    AuditRequestComponent,
    LogEntryComponent,

    ParticipantAuditorComponent,
    ParticipantPublicServantComponent,
    ParticipantCivilianComponent,

    NewLogEntryComponent,
    NewAuditRequestComponent,
    ChangeAuditRequestStateComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
