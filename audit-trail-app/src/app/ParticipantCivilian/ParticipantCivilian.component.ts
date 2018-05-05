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
import { ParticipantCivilianService } from './ParticipantCivilian.service';
import 'rxjs/add/operator/toPromise';
@Component({
	selector: 'app-ParticipantCivilian',
	templateUrl: './ParticipantCivilian.component.html',
	styleUrls: ['./ParticipantCivilian.component.css'],
  providers: [ParticipantCivilianService]
})
export class ParticipantCivilianComponent implements OnInit {

  myForm: FormGroup;

  private allParticipants;
  private participant;
  private currentId;
	private errorMessage;

  
      
          civilian_id = new FormControl("", Validators.required);
        
  
      
          first_name = new FormControl("", Validators.required);
        
  
      
          last_name = new FormControl("", Validators.required);
        
  
      
          salted_hash_rijksregisternummer = new FormControl("", Validators.required);
        
  


  constructor(private serviceParticipantCivilian:ParticipantCivilianService, fb: FormBuilder) {
    this.myForm = fb.group({
    
        
          civilian_id:this.civilian_id,
        
    
        
          first_name:this.first_name,
        
    
        
          last_name:this.last_name,
        
    
        
          salted_hash_rijksregisternummer:this.salted_hash_rijksregisternummer
        
    
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    let tempList = [];
    return this.serviceParticipantCivilian.getAll()
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      result.forEach(participant => {
        tempList.push(participant);
      });
      this.allParticipants = tempList;
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
   * @param {String} name - the name of the participant field to update
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
   * only). This is used for checkboxes in the participant updateDialog.
   * @param {String} name - the name of the participant field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified participant field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addParticipant(form: any): Promise<any> {
    this.participant = {
      $class: "be.vlaanderen.audittrail.ParticipantCivilian",
      
        
          "civilian_id":this.civilian_id.value,
        
      
        
          "first_name":this.first_name.value,
        
      
        
          "last_name":this.last_name.value,
        
      
        
          "salted_hash_rijksregisternummer":this.salted_hash_rijksregisternummer.value
        
      
    };

    this.myForm.setValue({
      
        
          "civilian_id":null,
        
      
        
          "first_name":null,
        
      
        
          "last_name":null,
        
      
        
          "salted_hash_rijksregisternummer":null
        
      
    });

    return this.serviceParticipantCivilian.addParticipant(this.participant)
    .toPromise()
    .then(() => {
			this.errorMessage = null;
      this.myForm.setValue({
      
        
          "civilian_id":null,
        
      
        
          "first_name":null,
        
      
        
          "last_name":null,
        
      
        
          "salted_hash_rijksregisternummer":null 
        
      
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


   updateParticipant(form: any): Promise<any> {
    this.participant = {
      $class: "be.vlaanderen.audittrail.ParticipantCivilian",
      
        
          
        
    
        
          
            "first_name":this.first_name.value,
          
        
    
        
          
            "last_name":this.last_name.value,
          
        
    
        
          
            "salted_hash_rijksregisternummer":this.salted_hash_rijksregisternummer.value
          
        
    
    };

    return this.serviceParticipantCivilian.updateParticipant(form.get("civilian_id").value,this.participant)
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


  deleteParticipant(): Promise<any> {

    return this.serviceParticipantCivilian.deleteParticipant(this.currentId)
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

    return this.serviceParticipantCivilian.getparticipant(id)
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      let formObject = {
        
          
            "civilian_id":null,
          
        
          
            "first_name":null,
          
        
          
            "last_name":null,
          
        
          
            "salted_hash_rijksregisternummer":null 
          
        
      };



      
        if(result.civilian_id){
          
            formObject.civilian_id = result.civilian_id;
          
        }else{
          formObject.civilian_id = null;
        }
      
        if(result.first_name){
          
            formObject.first_name = result.first_name;
          
        }else{
          formObject.first_name = null;
        }
      
        if(result.last_name){
          
            formObject.last_name = result.last_name;
          
        }else{
          formObject.last_name = null;
        }
      
        if(result.salted_hash_rijksregisternummer){
          
            formObject.salted_hash_rijksregisternummer = result.salted_hash_rijksregisternummer;
          
        }else{
          formObject.salted_hash_rijksregisternummer = null;
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
      
        
          "civilian_id":null,
        
      
        
          "first_name":null,
        
      
        
          "last_name":null,
        
      
        
          "salted_hash_rijksregisternummer":null 
        
      
      });
  }

}
