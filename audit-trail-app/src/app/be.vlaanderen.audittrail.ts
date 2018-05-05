import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace be.vlaanderen.audittrail{
   export class ParticipantAuditor extends Participant {
      auditor_id: string;
   }
   export class ParticipantPublicServant extends Participant {
      public_servant_id: string;
      department: string;
   }
   export class ParticipantCivilian extends Participant {
      civilian_id: string;
      first_name: string;
      last_name: string;
      salted_hash_rijksregisternummer: string;
   }
   export class AuditRequest extends Asset {
      audit_id: string;
      timestamp: string;
      request_state: AuditRequesState;
      sender: ParticipantCivilian;
      auditor: ParticipantAuditor;
      log_to_review: LogEntry;
   }
   export enum AuditRequesState {
      REQUESTED,
      REVISED,
      DONE,
   }
   export class LogEntry extends Asset {
      log_id: string;
      timestamp: string;
      carbon_hash: string;
      accessed_by: ParticipantPublicServant;
      data_owner: ParticipantCivilian;
      category: LogCategory;
      context: string;
      document: string;
   }
   export enum LogCategory {
      BOUWVERGUNNING,
      RIJKSREGISTERNUMMER,
   }
   export class NewLogEntry extends Transaction {
      carbon_hash: string;
      accessed_by: ParticipantPublicServant;
      data_owner: ParticipantCivilian;
      category: LogCategory;
      context: string;
      document: string;
   }
   export class NewAuditRequest extends Transaction {
      sender: ParticipantCivilian;
      auditor: ParticipantAuditor;
      log_to_review: LogEntry;
   }
   export class ChangeAuditRequestState extends Transaction {
      audit_id: string;
      new_state: AuditRequesState;
   }
   export class LogEntryAdded extends Event {
      log_id: string;
   }
   export class AuditRequestAdded extends Event {
      audit_id: string;
   }
   export class AuditRequestUpdated extends Event {
      audit_id: string;
   }
// }
