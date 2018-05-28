import {Component, Injectable} from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'

import { ParticipantAuditorService } from './ParticipantAuditor/ParticipantAuditor.service';
import { ParticipantCivilianService } from './ParticipantCivilian/ParticipantCivilian.service';

@Injectable()
export class SharedService {

    constructor(private serviceCivilian:ParticipantCivilianService, 
                private serviceAuditor:ParticipantAuditorService){
        console.log('Shared service started'); 

        // this.getLoggedInUser();
    }

    private userSource = new BehaviorSubject<String>("unknown user");
    currentUser = this.userSource.asObservable();

    //** Observable functions */
    civilianLogin(name:String){
        console.log('Civilian Login:', name); 
        this.userSource.next('civ#'+name);
    }

    auditorLogin(name:String){
        console.log('Auditor Login:', name); 
        this.userSource.next('auditor#'+name);
    }

    /** Service functions */
    getLoggedInUser(): void {
        this.getCivilianParticipant();
    }

    getCivilianParticipant(): Promise<any> {
    return this.serviceCivilian.getAll()
    .toPromise()
    .then((result) => {
        console.log(result);

        if (result.length >= 1){
        this.civilianLogin(result[0].civilian_id);
        } else {
        return this.getAuditorParticipant();
        }

    }).catch((error) => {
        if(error == 'Server error'){
        console.log("Could not connect to REST server. Please check your configuration details");
        }
        else if(error == '404 - Not Found'){
        console.log("404 - Not allowed");
        }
        else{
        console.log("Some other error when retrieving user", error);
        }
    });
    }

    getAuditorParticipant(): Promise<any> {
    return this.serviceAuditor.getAll()
    .toPromise()
    .then((result) => {
        if (result.length >= 1){
        this.auditorLogin(result[0].auditor_id);
        } else {
        console.log("Someone weird logged in");
        }

    }).catch((error) => {
        if(error == 'Server error'){
        console.log("Could not connect to REST server. Please check your configuration details");
        }
        else if(error == '404 - Not Found'){
        console.log("404 - Not allowed");
        }
        else{
        console.log("Some other error when retrieving user", error);
        }
    });
    }

} 