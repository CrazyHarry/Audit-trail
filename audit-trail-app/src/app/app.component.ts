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

import { Component,  OnInit, Input } from '@angular/core';
import { ParticipantAuditorService } from './ParticipantAuditor/ParticipantAuditor.service';
import { ParticipantCivilianService } from './ParticipantCivilian/ParticipantCivilian.service';
import { SharedService } from './shared.service';
import $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ParticipantAuditorService, ParticipantCivilianService, SharedService]
})
export class AppComponent implements OnInit {
  title = 'app works!';

  loggedInUser:String;

  constructor(private ss: SharedService) {
    this.loggedInUser = 'burger Adam';
  }

  active:String;

  toggle(page:String): void {
    this.active = page;
    console.log(page);
  }

  ngOnInit(): void {
    // subscribe component to currently logged in user variable
    this.ss.currentUser.subscribe(value => this.loggedInUser = value);

    // determine logged in user
    this.ss.getLoggedInUser();
  }

  getLoggedInUser(): String {
    return this.loggedInUser.replace('#', ' ');
  }

  ngAfterViewInit() {
    $('.nav a').on('click', function(){
      $(".nav").find(".active").removeClass("active");
      $(this).parent().addClass("active");
    });

    $('.dropdown').on('show.bs.dropdown', function(e){
      $(this).find('.dropdown-menu').first().stop(true, true).slideDown(300);
    });
    
    $('.dropdown').on('hide.bs.dropdown', function(e){
      $(this).find('.dropdown-menu').first().stop(true, true).slideUp(200);
    });

    $('.dropdown-menu li').on('click', function(){
      $(this).parent().parent().addClass('active');
    });
  }

}