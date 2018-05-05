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
import { NewLogEntryService } from './NewLogEntry.service';
import 'rxjs/add/operator/toPromise';
@Component({
	selector: 'app-NewLogEntry',
	templateUrl: './NewLogEntry.component.html',
	styleUrls: ['./NewLogEntry.component.css'],
  providers: [NewLogEntryService]
})
export class NewLogEntryComponent implements OnInit {

  myForm: FormGroup;

  private allTransactions;
  private Transaction;
  private currentId;
	private errorMessage;

  
      
          carbon_hash = new FormControl("", Validators.required);
        
  
      
          accessed_by = new FormControl("", Validators.required);
        
  
      
          data_owner = new FormControl("", Validators.required);
        
  
      
          category = new FormControl("", Validators.required);
        
  
      
          context = new FormControl("", Validators.required);
        
  
      
          document = new FormControl("", Validators.required);
        
  
      
          transactionId = new FormControl("", Validators.required);
        
  
      
          timestamp = new FormControl("", Validators.required);
        
  


  constructor(private serviceNewLogEntry:NewLogEntryService, fb: FormBuilder) {
    this.myForm = fb.group({
    
        
          carbon_hash:this.carbon_hash,
        
    
        
          accessed_by:this.accessed_by,
        
    
        
          data_owner:this.data_owner,
        
    
        
          category:this.category,
        
    
        
          context:this.context,
        
    
        
          document:this.document,
        
    
        
          transactionId:this.transactionId,
        
    
        
          timestamp:this.timestamp
        
    
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    let tempList = [];
    return this.serviceNewLogEntry.getAll()
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      result.forEach(transaction => {
        tempList.push(transaction);
      });
      this.allTransactions = tempList;
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
   * @param {String} name - the name of the transaction field to update
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
   * only). This is used for checkboxes in the transaction updateDialog.
   * @param {String} name - the name of the transaction field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified transaction field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addTransaction(form: any): Promise<any> {
    this.Transaction = {
      $class: "be.vlaanderen.audittrail.NewLogEntry",
      
        
          "carbon_hash":this.carbon_hash.value,
        
      
        
          "accessed_by":this.accessed_by.value,
        
      
        
          "data_owner":this.data_owner.value,
        
      
        
          "category":this.category.value,
        
      
        
          "context":this.context.value,
        
      
        
          "document":this.document.value,
        
      
        
          "transactionId":this.transactionId.value,
        
      
        
          "timestamp":this.timestamp.value
        
      
    };

    this.myForm.setValue({
      
        
          "carbon_hash":null,
        
      
        
          "accessed_by":null,
        
      
        
          "data_owner":null,
        
      
        
          "category":null,
        
      
        
          "context":null,
        
      
        
          "document":null,
        
      
        
          "transactionId":null,
        
      
        
          "timestamp":null
        
      
    });

    return this.serviceNewLogEntry.addTransaction(this.Transaction)
    .toPromise()
    .then(() => {
			this.errorMessage = null;
      this.myForm.setValue({
      
        
          "carbon_hash":null,
        
      
        
          "accessed_by":null,
        
      
        
          "data_owner":null,
        
      
        
          "category":null,
        
      
        
          "context":null,
        
      
        
          "document":null,
        
      
        
          "transactionId":null,
        
      
        
          "timestamp":null 
        
      
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


   updateTransaction(form: any): Promise<any> {
    this.Transaction = {
      $class: "be.vlaanderen.audittrail.NewLogEntry",
      
        
          
            "carbon_hash":this.carbon_hash.value,
          
        
    
        
          
            "accessed_by":this.accessed_by.value,
          
        
    
        
          
            "data_owner":this.data_owner.value,
          
        
    
        
          
            "category":this.category.value,
          
        
    
        
          
            "context":this.context.value,
          
        
    
        
          
            "document":this.document.value,
          
        
    
        
          
        
    
        
          
            "timestamp":this.timestamp.value
          
        
    
    };

    return this.serviceNewLogEntry.updateTransaction(form.get("transactionId").value,this.Transaction)
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


  deleteTransaction(): Promise<any> {

    return this.serviceNewLogEntry.deleteTransaction(this.currentId)
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

    return this.serviceNewLogEntry.getTransaction(id)
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      let formObject = {
        
          
            "carbon_hash":null,
          
        
          
            "accessed_by":null,
          
        
          
            "data_owner":null,
          
        
          
            "category":null,
          
        
          
            "context":null,
          
        
          
            "document":null,
          
        
          
            "transactionId":null,
          
        
          
            "timestamp":null 
          
        
      };



      
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
      
        if(result.category){
          
            formObject.category = result.category;
          
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
      
        if(result.transactionId){
          
            formObject.transactionId = result.transactionId;
          
        }else{
          formObject.transactionId = null;
        }
      
        if(result.timestamp){
          
            formObject.timestamp = result.timestamp;
          
        }else{
          formObject.timestamp = null;
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
      
        
          "carbon_hash":null,
        
      
        
          "accessed_by":null,
        
      
        
          "data_owner":null,
        
      
        
          "category":null,
        
      
        
          "context":null,
        
      
        
          "document":null,
        
      
        
          "transactionId":null,
        
      
        
          "timestamp":null 
        
      
      });
  }

}

