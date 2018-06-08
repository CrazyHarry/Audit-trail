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

import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { LogEntryService } from './LogEntry.service';
import { NewAuditRequestService } from '../NewAuditRequest/NewAuditRequest.service';
import { SharedService } from '../shared.service';

import 'rxjs/add/operator/toPromise';
@Component({
	selector: 'app-LogEntry',
	templateUrl: './LogEntry.component.html',
	styleUrls: ['./LogEntry.component.css'],
  providers: [LogEntryService, NewAuditRequestService, SharedService]
})
export class LogEntryComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
	private errorMessage;

  log_id = new FormControl("", Validators.required);
  timestamp = new FormControl("", Validators.required);
  carbon_hash = new FormControl("", Validators.required);
  accessed_by = new FormControl("", Validators.required);
  data_owner = new FormControl("", Validators.required);
  context = new FormControl("", Validators.required);
  department_name = new FormControl("", Validators.required);
  document = new FormControl("", Validators.required);

  issue_context: String;
  contact_email: String;

  constructor(private serviceLogEntry:LogEntryService, 
              private serviceNewAuditRequest:NewAuditRequestService,
              private ss:SharedService, 
              fb: FormBuilder) {
    this.myForm = fb.group({
          log_id:this.log_id,
          timestamp:this.timestamp,
          carbon_hash:this.carbon_hash,
          accessed_by:this.accessed_by,
          data_owner:this.data_owner,
          department_name:this.department_name,
          context:this.context,
          document:this.document
    });
  };

  setAsset(asset: any): void{
    this.asset = asset;
  }

  loggedInUser: String;

  ngOnInit(): void {
    // subscribe component to currently logged in user variable
    this.ss.currentUser.subscribe(value => this.loggedInUser = value);

    // determine logged in user
    this.ss.getLoggedInUser();

    // load all log entries
    this.loadAll();
  }

  // returns true is the current logged in user is an auditor
  civilianView(): boolean {
    if (this.loggedInUser.split('#')[0] == 'burger'){
      return true;
    } else {
      return false;
    }
  }

  /**
   * submits a new audit request based on the current component's details
   */
  submitAuditRequest(contact_email, issue_text): Promise<any> {

    let auditRequestTransaction = {
      $class: "be.vlaanderen.audittrail.NewAuditRequest",
      "sender": this.asset.data_owner,
      "auditor": "be.vlaanderen.audittrail.ParticipantAuditor#auditor1",
      "log_to_review": "be.vlaanderen.audittrail.LogEntry#"+this.currentId,
      "issue_context": issue_text,
      "contact_email": contact_email
    };

    return this.serviceNewAuditRequest.addTransaction(auditRequestTransaction)
    .toPromise()
    .then(() => {
      alert("Succesfully added new audit request!");
    })
    .catch((error) => {
        if(error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else{
            this.errorMessage = error;
        }
    });
  }

  loadAll(): Promise<any> {
    let tempList = [];
    return this.serviceLogEntry.getAll()
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      result.forEach(asset => {
        tempList.push(asset);
      });

      // used to sort output
      function compare(a,b) {
        var aa = new Date(a.timestamp);
        var bb = new Date(b.timestamp);

        if (aa < bb)
          return 1;
        if (aa > bb)
          return -1;
        return 0;
      }

      // set allAssets to sorted
      this.allAssets = tempList.sort(compare);
    })
    .catch((error) => {
        if(error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
        }
        else{
            this.errorMessage = error;
        }
    });
  }

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the asset field to update
   * @param {any} value - the enumeration value for which to toggle the checked state
   */
  changeArrayValue(name: string, value: any): void {
    const index = this[name].value.indexOf(value);
    if (index === -1) {
      this[name].value.push(value);
    } else {
      this[name].value.splice(index, 1);
    }
  }

	/**
	 * Checkbox helper, determining whether an enumeration value should be selected or not (for array enumeration values
   * only). This is used for checkboxes in the asset updateDialog.
   * @param {String} name - the name of the asset field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified asset field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addAsset(form: any): Promise<any> {
    this.asset = {
      $class: "be.vlaanderen.audittrail.LogEntry",
          "log_id":this.log_id.value,
          "timestamp":this.timestamp.value,
          "carbon_hash":this.carbon_hash.value,
          "accessed_by":this.accessed_by.value,
          "data_owner":this.data_owner.value,
          "category":this.department_name.value,
          "context":this.context.value,
          "document":this.document.value
    };

    this.myForm.setValue({
          "log_id":null,
          "timestamp":null,
          "carbon_hash":null,
          "accessed_by":null,
          "data_owner":null,
          "category":null,
          "context":null,
          "document":null
    });

    return this.serviceLogEntry.addAsset(this.asset)
    .toPromise()
    .then(() => {
			this.errorMessage = null;
      this.myForm.setValue({
          "log_id":null,
          "timestamp":null,
          "carbon_hash":null,
          "accessed_by":null,
          "data_owner":null,
          "category":null,
          "context":null,
          "document":null 
      });
    })
    .catch((error) => {
        if(error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else{
            this.errorMessage = error;
        }
    });
  }


   updateAsset(form: any): Promise<any> {
    this.asset = {
      $class: "be.vlaanderen.audittrail.LogEntry",
            "timestamp":this.timestamp.value,
            "carbon_hash":this.carbon_hash.value,
            "accessed_by":this.accessed_by.value,
            "data_owner":this.data_owner.value,
            "category":this.department_name.value,
            "context":this.context.value,
            "document":this.document.value
    };

    return this.serviceLogEntry.updateAsset(form.get("log_id").value,this.asset)
		.toPromise()
		.then(() => {
			this.errorMessage = null;
		})
		.catch((error) => {
            if(error == 'Server error'){
				this.errorMessage = "Could not connect to REST server. Please check your configuration details";
			}
            else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
			}
			else{
				this.errorMessage = error;
			}
    });
  }


  deleteAsset(): Promise<any> {

    return this.serviceLogEntry.deleteAsset(this.currentId)
		.toPromise()
		.then(() => {
			this.errorMessage = null;
		})
		.catch((error) => {
            if(error == 'Server error'){
				this.errorMessage = "Could not connect to REST server. Please check your configuration details";
			}
			else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
			}
			else{
				this.errorMessage = error;
			}
    });
  }

  setId(id: any): void{
    this.currentId = id;
  }

  getForm(id: any): Promise<any>{

    return this.serviceLogEntry.getAsset(id)
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      let formObject = {
            "log_id":null,
            "timestamp":null,
            "carbon_hash":null,
            "accessed_by":null,
            "data_owner":null,
            "category":null,
            "context":null,
            "document":null 
      };



      
        if(result.log_id){
          
            formObject.log_id = result.log_id;
          
        }else{
          formObject.log_id = null;
        }
      
        if(result.timestamp){
          
            formObject.timestamp = result.timestamp;
          
        }else{
          formObject.timestamp = null;
        }
      
        if(result.carbon_hash){
          
            formObject.carbon_hash = result.carbon_hash;
          
        }else{
          formObject.carbon_hash = null;
        }
      
        if(result.accessed_by){
          
            formObject.accessed_by = result.accessed_by;
          
        }else{
          formObject.accessed_by = null;
        }
      
        if(result.data_owner){
          
            formObject.data_owner = result.data_owner;
          
        }else{
          formObject.data_owner = null;
        }
      
        if(result.department_name){
          
            formObject.category = result.department_name;
          
        }else{
          formObject.category = null;
        }
      
        if(result.context){
          
            formObject.context = result.context;
          
        }else{
          formObject.context = null;
        }
      
        if(result.document){
          
            formObject.document = result.document;
          
        }else{
          formObject.document = null;
        }
      

      this.myForm.setValue(formObject);

    })
    .catch((error) => {
        if(error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
        }
        else{
            this.errorMessage = error;
        }
    });

  }

  resetForm(): void{
    this.myForm.setValue({
          "log_id":null,
          "timestamp":null,
          "carbon_hash":null,
          "accessed_by":null,
          "data_owner":null,
          "category":null,
          "context":null,
          "document":null 
      });
  }

}
