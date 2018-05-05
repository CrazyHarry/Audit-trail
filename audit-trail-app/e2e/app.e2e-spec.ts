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

import { AngularTestPage } from './app.po';
import { ExpectedConditions, browser, element, by } from 'protractor';
import {} from 'jasmine';


describe('Starting tests for audit-trail-app', function() {
  let page: AngularTestPage;

  beforeEach(() => {
    page = new AngularTestPage();
  });

  it('website title should be audit-trail-app', () => {
    page.navigateTo('/');
    return browser.getTitle().then((result)=>{
      expect(result).toBe('audit-trail-app');
    })
  });

  it('network-name should be audit-trail-network@0.0.3',() => {
    element(by.css('.network-name')).getWebElement()
    .then((webElement) => {
      return webElement.getText();
    })
    .then((txt) => {
      expect(txt).toBe('audit-trail-network@0.0.3.bna');
    });
  });

  it('navbar-brand should be audit-trail-app',() => {
    element(by.css('.navbar-brand')).getWebElement()
    .then((webElement) => {
      return webElement.getText();
    })
    .then((txt) => {
      expect(txt).toBe('audit-trail-app');
    });
  });

  
    it('AuditRequest component should be loadable',() => {
      page.navigateTo('/AuditRequest');
      browser.findElement(by.id('assetName'))
      .then((assetName) => {
        return assetName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('AuditRequest');
      });
    });

    it('AuditRequest table should have 7 columns',() => {
      page.navigateTo('/AuditRequest');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(7); // Addition of 1 for 'Action' column
      });
    });
  
    it('LogEntry component should be loadable',() => {
      page.navigateTo('/LogEntry');
      browser.findElement(by.id('assetName'))
      .then((assetName) => {
        return assetName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('LogEntry');
      });
    });

    it('LogEntry table should have 9 columns',() => {
      page.navigateTo('/LogEntry');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(9); // Addition of 1 for 'Action' column
      });
    });
  

  
    it('ParticipantAuditor component should be loadable',() => {
      page.navigateTo('/ParticipantAuditor');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('ParticipantAuditor');
      });
    });

    it('ParticipantAuditor table should have 2 columns',() => {
      page.navigateTo('/ParticipantAuditor');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(2); // Addition of 1 for 'Action' column
      });
    });
  
    it('ParticipantPublicServant component should be loadable',() => {
      page.navigateTo('/ParticipantPublicServant');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('ParticipantPublicServant');
      });
    });

    it('ParticipantPublicServant table should have 3 columns',() => {
      page.navigateTo('/ParticipantPublicServant');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(3); // Addition of 1 for 'Action' column
      });
    });
  
    it('ParticipantCivilian component should be loadable',() => {
      page.navigateTo('/ParticipantCivilian');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('ParticipantCivilian');
      });
    });

    it('ParticipantCivilian table should have 5 columns',() => {
      page.navigateTo('/ParticipantCivilian');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(5); // Addition of 1 for 'Action' column
      });
    });
  

  
    it('NewLogEntry component should be loadable',() => {
      page.navigateTo('/NewLogEntry');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('NewLogEntry');
      });
    });
  
    it('NewAuditRequest component should be loadable',() => {
      page.navigateTo('/NewAuditRequest');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('NewAuditRequest');
      });
    });
  
    it('ChangeAuditRequestState component should be loadable',() => {
      page.navigateTo('/ChangeAuditRequestState');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('ChangeAuditRequestState');
      });
    });
  

});