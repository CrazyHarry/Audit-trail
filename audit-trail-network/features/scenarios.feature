#
# Flemish Government - Vlaamse Overheid
# Author: Adam 'Blvck' Blazejczak
# smartie.be
#
# TODO: Document what is being accessed
#

Feature: Scenarios

    Background:
        Given I have deployed the business network definition ..
        And I have added the following participants of type be.vlaanderen.audittrail.Entity
            | entity_id     | entity_name            |
            | AIV           | Informatie Vlaanderen  |
            | OMGEVING      | Departement Omgeving   |
        And I have added the following participants of type be.vlaanderen.audittrail.ParticipantCivilian
            | civilian_id       | first_name| last_name |
            | adam@email.com    | Adam      | B         |
            | dieter@email.com  | Dieter    | V         |
            | tien@email.com    | Tien      | T         |
        And I have added the following participants of type be.vlaanderen.audittrail.ParticipantPublicServant
            | public_servant_id   | entity            | 
            | daniel@email.com    | AIV  |
            | pascal@email.com    | OMGEVING   |
        And I have added the following participants of type be.vlaanderen.audittrail.ParticipantAuditor
            | auditor_id        | entity |
            | aiv@email.com | AIV |
            | omgeving@email.com | OMGEVING |
        And I have added the following assets of type be.vlaanderen.audittrail.LogEntry
            | log_id | timestamp | carbon_hash | accessed_by    | data_owner       | department_name        | context |
            | log1 | 22-01-2018  | qgfv34afa | daniel@email.com | adam@email.com   | Informatie Vlaanderen  |  BOUWVERGUNNING |
            | log2 | 23-02-2018  | fafvawqfu | pascal@email.com | adam@email.com   | Departement Omgeving   |  SUBSIDIE |
            | log3 | 24-03-2018  | wawew2eaa | daniel@email.com | dieter@email.com | Informatie Vlaanderen  |  HUWELIJK |
            | log4 | 25-04-2018  | 7a2razw2e | pascal@email.com | dieter@email.com | Departement Omgeving   |  SOCIALEWONING |
            | log5 | 26-03-2018  | utpoaojks | daniel@email.com | tien@email.com   | Informatie Vlaanderen  |  HUWELIJK |
            | log6 | 27-04-2018  | 86jd9xjas | pascal@email.com | tien@email.com   | Departement Omgeving   |  SOCIALEWONING |
        And I have added the following assets of type be.vlaanderen.audittrail.AuditRequest
            | audit_id | issue_context | contact_email | contact_channel | sender | auditor | log_to_review | timestamp | request_state |
            | audit1 | free text | contact_email | contact_channel | adam@email.com | auditor1@email.com | log2 | 24-03-2018 | REQUESTED |
            | audit2 | free text 2 | contact_email | contact_channel | dieter@email.com | auditor2@email.com | log3 | 25-03-2018 | REQUESTED |

        # entities / departments
        And I have issued the participant be.vlaanderen.audittrail.Entity#AIV with the identity entiteit_aiv
        And I have issued the participant be.vlaanderen.audittrail.Entity#OMGEVING with the identity eniteit_do

        # particpants
        And I have issued the participant be.vlaanderen.audittrail.ParticipantCivilian#adam@email.com with the identity adam1
        And I have issued the participant be.vlaanderen.audittrail.ParticipantCivilian#dieter@email.com with the identity dieter1
        And I have issued the participant be.vlaanderen.audittrail.ParticipantCivilian#tien@email.com with the identity tien1

        # public servants
        And I have issued the participant be.vlaanderen.audittrail.ParticipantPublicServant#daniel@email.com with the identity daniel1
        And I have issued the participant be.vlaanderen.audittrail.ParticipantPublicServant#pascal@email.com with the identity pascal1

        # DPO / Auditors (per department)
        And I have issued the participant be.vlaanderen.audittrail.ParticipantAuditor#aiv@email.com with the identity auditor_aiv
        And I have issued the participant be.vlaanderen.audittrail.ParticipantAuditor#omgeving@email.com with the identity auditor_omgeving

    #####
    # Civilian Log Access
    # Cilians: Adam, Dieter, Tien
    #####
    Scenario: Adam can view his own Participant Profile
        When I use the identity adam1
        Then I should have the following participant of type be.vlaanderen.audittrail.ParticipantCivilian
            | civilian_id       | first_name| last_name |
            | adam@email.com    | Adam      | B         |
        And I should not have the following participant of type be.vlaanderen.audittrail.ParticipantCivilian
            | civilian_id       | first_name| last_name |
            | dieter@email.com  | Dieter    | V         |
            | tien@email.com    | Tien      | T         |

    Scenario: Adam can read his own logs, no one else's
        When I use the identity adam1 
        Then I should have the following assets of type be.vlaanderen.audittrail.LogEntry
            | log_id | timestamp | carbon_hash | accessed_by    | data_owner       | department_name        | context |
            | log1 | 22-01-2018  | qgfv34afa | daniel@email.com | adam@email.com   | Informatie Vlaanderen  |  BOUWVERGUNNING |
            | log2 | 23-02-2018  | fafvawqfu | pascal@email.com | adam@email.com   | Departement Omgeving   |  SUBSIDIE |
        And I should not have the following assets of type be.vlaanderen.audittrail.LogEntry
            | log_id | timestamp | carbon_hash | accessed_by    | data_owner       | department_name        | context |
            | log3 | 24-03-2018  | wawew2eaa | daniel@email.com | dieter@email.com | Informatie Vlaanderen  |  HUWELIJK |
            | log4 | 25-04-2018  | 7a2razw2e | pascal@email.com | dieter@email.com | Departement Omgeving   |  SOCIALEWONING |
            | log5 | 26-03-2018  | utpoaojks | daniel@email.com | tien@email.com   | Informatie Vlaanderen  |  HUWELIJK |
            | log6 | 27-04-2018  | 86jd9xjas | pascal@email.com | tien@email.com   | Departement Omgeving   |  SOCIALEWONING |

    Scenario: Dieter can read his own logs, no one else's
        When I use the identity dieter1 
        Then I should have the following assets of type be.vlaanderen.audittrail.LogEntry
            | log_id | timestamp | carbon_hash | accessed_by    | data_owner       | department_name        | context |
            | log3 | 24-03-2018  | wawew2eaa | daniel@email.com | dieter@email.com | Informatie Vlaanderen  |  HUWELIJK |
            | log4 | 25-04-2018  | 7a2razw2e | pascal@email.com | dieter@email.com | Departement Omgeving   |  SOCIALEWONING |
            
        And I should not have the following assets of type be.vlaanderen.audittrail.LogEntry
            | log_id | timestamp | carbon_hash | accessed_by    | data_owner       | department_name        | context |
            | log1 | 22-01-2018  | qgfv34afa | daniel@email.com | adam@email.com   | Informatie Vlaanderen  |  BOUWVERGUNNING |
            | log2 | 23-02-2018  | fafvawqfu | pascal@email.com | adam@email.com   | Departement Omgeving   |  SUBSIDIE |
            | log5 | 26-03-2018  | utpoaojks | daniel@email.com | tien@email.com   | Informatie Vlaanderen  |  HUWELIJK |
            | log6 | 27-04-2018  | 86jd9xjas | pascal@email.com | tien@email.com   | Departement Omgeving   |  SOCIALEWONING |

    Scenario: Tien can read his own logs, no one else's
        When I use the identity tien1 
        Then I should have the following assets of type be.vlaanderen.audittrail.LogEntry
            | log_id | timestamp | carbon_hash | accessed_by    | data_owner       | department_name        | context |
            | log5 | 26-03-2018  | utpoaojks | daniel@email.com | tien@email.com   | Informatie Vlaanderen  |  HUWELIJK |
            | log6 | 27-04-2018  | 86jd9xjas | pascal@email.com | tien@email.com   | Departement Omgeving   |  SOCIALEWONING |
        And I should not have the following assets of type be.vlaanderen.audittrail.LogEntry
            | log_id | timestamp | carbon_hash | accessed_by    | data_owner       | department_name        | context |
            | log1 | 22-01-2018  | qgfv34afa | daniel@email.com | adam@email.com   | Informatie Vlaanderen  |  BOUWVERGUNNING |
            | log2 | 23-02-2018  | fafvawqfu | pascal@email.com | adam@email.com   | Departement Omgeving   |  SUBSIDIE |
            | log3 | 24-03-2018  | wawew2eaa | daniel@email.com | dieter@email.com | Informatie Vlaanderen  |  HUWELIJK |
            | log4 | 25-04-2018  | 7a2razw2e | pascal@email.com | dieter@email.com | Departement Omgeving   |  SOCIALEWONING |

    #####
    # Department Log Access
    # Public Servants: daniel1, pascal1
    #####
    Scenario: Daniel cannot read any logs
        When I use the identity daniel1
        Then I should not have the following assets of type be.vlaanderen.audittrail.LogEntry
            | log_id | timestamp | carbon_hash | accessed_by    | data_owner       | department_name        | context |
            | log1 | 22-01-2018  | qgfv34afa | daniel@email.com | adam@email.com   | Informatie Vlaanderen  |  BOUWVERGUNNING |
            | log2 | 23-02-2018  | fafvawqfu | pascal@email.com | adam@email.com   | Departement Omgeving   |  SUBSIDIE |
            | log3 | 24-03-2018  | wawew2eaa | daniel@email.com | dieter@email.com | Informatie Vlaanderen  |  HUWELIJK |
            | log4 | 25-04-2018  | 7a2razw2e | pascal@email.com | dieter@email.com | Departement Omgeving   |  SOCIALEWONING |
            | log5 | 26-03-2018  | utpoaojks | daniel@email.com | tien@email.com   | Informatie Vlaanderen  |  HUWELIJK |
            | log6 | 27-04-2018  | 86jd9xjas | pascal@email.com | tien@email.com   | Departement Omgeving   |  SOCIALEWONING |

    Scenario: Pascal cannot read any logs
        When I use the identity pascal1
        Then I should not have the following assets of type be.vlaanderen.audittrail.LogEntry
            | log_id | timestamp | carbon_hash | accessed_by    | data_owner       | department_name        | context |
            | log1 | 22-01-2018  | qgfv34afa | daniel@email.com | adam@email.com   | Informatie Vlaanderen  |  BOUWVERGUNNING |
            | log2 | 23-02-2018  | fafvawqfu | pascal@email.com | adam@email.com   | Departement Omgeving   |  SUBSIDIE |
            | log3 | 24-03-2018  | wawew2eaa | daniel@email.com | dieter@email.com | Informatie Vlaanderen  |  HUWELIJK |
            | log4 | 25-04-2018  | 7a2razw2e | pascal@email.com | dieter@email.com | Departement Omgeving   |  SOCIALEWONING |
            | log5 | 26-03-2018  | utpoaojks | daniel@email.com | tien@email.com   | Informatie Vlaanderen  |  HUWELIJK |
            | log6 | 27-04-2018  | 86jd9xjas | pascal@email.com | tien@email.com   | Departement Omgeving   |  SOCIALEWONING |

    #####
    # DPO Log Access
    # DPO's: auditor_aiv + auditor_omgeving
    #####
    Scenario: auditor_aiv can read all logs within the AIV department
        When I use the identity auditor_aiv
        Then I should have the following assets of type be.vlaanderen.audittrail.LogEntry
            | log_id | timestamp | carbon_hash | accessed_by    | data_owner       | department_name        | context |
            | log1 | 22-01-2018  | qgfv34afa | daniel@email.com | adam@email.com   | Informatie Vlaanderen  |  BOUWVERGUNNING |
            | log3 | 24-03-2018  | wawew2eaa | daniel@email.com | dieter@email.com | Informatie Vlaanderen  |  HUWELIJK |
            | log5 | 26-03-2018  | utpoaojks | daniel@email.com | tien@email.com   | Informatie Vlaanderen  |  HUWELIJK |
        And I should not have the following assets of type be.vlaanderen.audittrail.LogEntry
            | log_id | timestamp | carbon_hash | accessed_by    | data_owner       | department_name        | context |
            | log2 | 23-02-2018  | fafvawqfu | pascal@email.com | adam@email.com   | Departement Omgeving   |  SUBSIDIE |
            | log4 | 25-04-2018  | 7a2razw2e | pascal@email.com | dieter@email.com | Departement Omgeving   |  SOCIALEWONING |
            | log6 | 27-04-2018  | 86jd9xjas | pascal@email.com | tien@email.com   | Departement Omgeving   |  SOCIALEWONING |

    Scenario: auditor_aiv can read all logs within the AIV department
        When I use the identity auditor_omgeving
        Then I should have the following assets of type be.vlaanderen.audittrail.LogEntry
            | log_id | timestamp | carbon_hash | accessed_by    | data_owner       | department_name        | context |
            | log2 | 23-02-2018  | fafvawqfu | pascal@email.com | adam@email.com   | Departement Omgeving   |  SUBSIDIE |
            | log4 | 25-04-2018  | 7a2razw2e | pascal@email.com | dieter@email.com | Departement Omgeving   |  SOCIALEWONING |
            | log6 | 27-04-2018  | 86jd9xjas | pascal@email.com | tien@email.com   | Departement Omgeving   |  SOCIALEWONING |
        And I should not have the following assets of type be.vlaanderen.audittrail.LogEntry
            | log_id | timestamp | carbon_hash | accessed_by    | data_owner       | department_name        | context |
            | log1 | 22-01-2018  | qgfv34afa | daniel@email.com | adam@email.com   | Informatie Vlaanderen  |  BOUWVERGUNNING |
            | log3 | 24-03-2018  | wawew2eaa | daniel@email.com | dieter@email.com | Informatie Vlaanderen  |  HUWELIJK |
            | log5 | 26-03-2018  | utpoaojks | daniel@email.com | tien@email.com   | Informatie Vlaanderen  |  HUWELIJK |

    #####
    # Department - Log Creation
    # Public Servants: daniel1 + pascal1
    #####
    Scenario: Daniel should be able to create new NewLogEntry transactions for Adam, Adam can read them, Dieter can't
        When I use the identity daniel1
        And I submit the following transaction of type be.vlaanderen.audittrail.NewLogEntry
            | log_id  | carbon_hash | accessed_by      | data_owner     | department_name | context        |
            | testlog | jkljlkfa    | daniel@email.com | adam@email.com | AIV             | BOUWVERGUNNING |
        Then I should have received the following event of type be.vlaanderen.audittrail.LogEntryAdded
            | log_id   |
            | testlog  |

        When I use the identity adam1
        Then I should have the following assets of type be.vlaanderen.audittrail.LogEntry
            | log_id  | timestamp | carbon_hash | accessed_by      | data_owner     | department_name | context |
            | testlog | *         | jkljlkfa    | daniel@email.com | adam@email.com | AIV | BOUWVERGUNNING |
        When I use the identity dieter1
        Then I should not have the following assets of type be.vlaanderen.audittrail.LogEntry
            | log_id  | timestamp | carbon_hash | accessed_by      | data_owner     | department_name | context |
            | testlog | *         | jkljlkfa    | daniel@email.com | adam@email.com | AIV | BOUWVERGUNNING |

    Scenario: Pascal should be able to create new NewLogEntry transactions for Dieter, Dieter can read them, Adam can't
        When I use the identity pascal1
        And I submit the following transaction of type be.vlaanderen.audittrail.NewLogEntry
            | log_id  | carbon_hash | accessed_by      | data_owner        | department_name | context        |
            | testlog2 | jkljlkfa    | pascal@email.com | dieter@email.com  | OMGEVING             | BOUWVERGUNNING |

        When I use the identity dieter1
        Then I should have the following assets of type be.vlaanderen.audittrail.LogEntry
            | log_id  | timestamp | carbon_hash | accessed_by      | data_owner     | department_name | context |
            | testlog2 | *         | jkljlkfa    | pascal@email.com | dieter@email.com | OMGEVING | BOUWVERGUNNING |
        When I use the identity adam1
        Then I should not have the following assets of type be.vlaanderen.audittrail.LogEntry
            | log_id  | timestamp | carbon_hash | accessed_by      | data_owner     | department_name | context |
            | testlog2 | *         | jkljlkfa    | pascal@email.com | dieter@email.com | OMGEVING | BOUWVERGUNNING |

    #####
    # Audit Request - Read Access
    # civilians: adam1, dieter1
    # DPO's: auditor_aiv + auditor_omgeving
    ####
    Scenario: Adam & Dieter can read each their own audit request submissions (and can't read each other's)
        When I use the identity adam1
        Then I should have the following assets of type be.vlaanderen.audittrail.AuditRequest
            | audit_id | issue_context | contact_email | contact_channel | sender | auditor | log_to_review | timestamp | request_state |
            | audit1 | free text | contact_email | contact_channel | adam@email.com | auditor1@email.com | log2 | 24-03-2018 | REQUESTED |
        Then I should not have the following assets of type be.vlaanderen.audittrail.AuditRequest
            | audit_id | issue_context | contact_email | contact_channel | sender | auditor | log_to_review | timestamp | request_state |
            | audit2 | free text 2 | contact_email | contact_channel | dieter@email.com | auditor2@email.com | log3 | 25-03-2018 | REQUESTED |

        When I use the identity dieter1
        Then I should have the following assets of type be.vlaanderen.audittrail.AuditRequest
            | audit_id | issue_context | contact_email | contact_channel | sender | auditor | log_to_review | timestamp | request_state |
            | audit2 | free text 2 | contact_email | contact_channel | dieter@email.com | auditor2@email.com | log3 | 25-03-2018 | REQUESTED |
        Then I should not have the following assets of type be.vlaanderen.audittrail.AuditRequest
            | audit_id | issue_context | contact_email | contact_channel | sender | auditor | log_to_review | timestamp | request_state |
            | audit1 | free text | contact_email | contact_channel | adam@email.com | auditor1@email.com | log2 | 24-03-2018 | REQUESTED |

    Scenario: Auditors can read audit requests from their own departments
        When I use the identity auditor_omgeving
        Then I should have the following assets of type be.vlaanderen.audittrail.AuditRequest
            | audit_id | issue_context | contact_email | contact_channel | sender | auditor | log_to_review | timestamp | request_state |
            | audit1 | free text | contact_email | contact_channel | adam@email.com | auditor1@email.com | log2 | 24-03-2018 | REQUESTED |
        Then I should not have the following assets of type be.vlaanderen.audittrail.AuditRequest
            | audit_id | issue_context | contact_email | contact_channel | sender | auditor | log_to_review | timestamp | request_state |
            | audit2 | free text 2 | contact_email | contact_channel | dieter@email.com | auditor2@email.com | log3 | 25-03-2018 | REQUESTED |

        When I use the identity auditor_aiv
        Then I should have the following assets of type be.vlaanderen.audittrail.AuditRequest
            | audit_id | issue_context | contact_email | contact_channel | sender | auditor | log_to_review | timestamp | request_state |
            | audit2 | free text 2 | contact_email | contact_channel | dieter@email.com | auditor2@email.com | log3 | 25-03-2018 | REQUESTED |
        Then I should not have the following assets of type be.vlaanderen.audittrail.AuditRequest
            | audit_id | issue_context | contact_email | contact_channel | sender | auditor | log_to_review | timestamp | request_state |
            | audit1 | free text | contact_email | contact_channel | adam@email.com | auditor1@email.com | log2 | 24-03-2018 | REQUESTED |

    #####
    # Audit Request - Creation / Transaction Access
    # civilians: adam1, dieter1
    # DPO's: auditor_aiv + auditor_omgeving
    ####
    Scenario: Adam can create audit requests, the correct auditor can access them
        When I use the identity adam1
        And I submit the following transaction of type be.vlaanderen.audittrail.NewAuditRequest
            | audit_id  | sender         | auditor            | log_to_review | issue_context     | contact_email |
            | audittest | adam@email.com | auditor1@email.com | log3          | import issue here | email@domain.com |
        Then I should have the following assets of type be.vlaanderen.audittrail.AuditRequest
            | audit_id  | timestamp | request_state | sender         | auditor            | log_to_review | issue_context     | contact_email |
            | audittest | *         | REQUESTED     | adam@email.com | auditor1@email.com | log3          | import issue here | email@domain.com |
        And I should have received the following event of type be.vlaanderen.audittrail.AuditRequestAdded
            | audit_id   |
            | audittest  |

        When I use the identity dieter1
        Then I should not have the following assets of type be.vlaanderen.audittrail.AuditRequest
            | audit_id  | timestamp | request_state | sender         | auditor            | log_to_review | issue_context     | contact_email |
            | audittest | *         | REQUESTED     | adam@email.com | auditor1@email.com | log3          | import issue here | email@domain.com |

        When I use the identity auditor_aiv
        Then I should have the following assets of type be.vlaanderen.audittrail.AuditRequest
            | audit_id  | timestamp | request_state | sender         | auditor            | log_to_review | issue_context     | contact_email |
            | audittest | *         | REQUESTED     | adam@email.com | auditor1@email.com | log3          | import issue here | email@domain.com |

        When I use the identity auditor_omgeving
        Then I should not have the following assets of type be.vlaanderen.audittrail.AuditRequest
            | audit_id  | timestamp | request_state | sender         | auditor            | log_to_review | issue_context     | contact_email |
            | audittest | *         | REQUESTED     | adam@email.com | auditor1@email.com | log3          | import issue here | email@domain.com |

    #####
    # Audit Request Updating - Transaction Access
    # civilians: adam1, dieter1
    # DPO's: auditor_aiv + auditor_omgeving
    ####
    Scenario: Auditors can change audit requests states of their audit requests
        When I use the identity auditor_aiv
        And I submit the following transaction of type be.vlaanderen.audittrail.ChangeAuditRequestState
            | audit_id | new_state |
            | audit2   | UNDERREVISION |
        Then I should have the following assets of type be.vlaanderen.audittrail.AuditRequest
            | audit_id | issue_context | contact_email | contact_channel | sender | auditor | log_to_review | timestamp | request_state |
            | audit2 | free text 2 | contact_email | contact_channel | dieter@email.com | auditor2@email.com | log3 | 25-03-2018 | UNDERREVISION |
        And I should have received the following event of type be.vlaanderen.audittrail.AuditRequestUpdated
            | audit_id   |
            | audit2     |

        When I use the identity dieter1
        Then I should have the following assets of type be.vlaanderen.audittrail.AuditRequest
            | audit_id | issue_context | contact_email | contact_channel | sender | auditor | log_to_review | timestamp | request_state |
            | audit2 | free text 2 | contact_email | contact_channel | dieter@email.com | auditor2@email.com | log3 | 25-03-2018 | UNDERREVISION |

    Scenario: Auditor can't change audit requests from other departments
        When I use the identity auditor_omgeving
        And I submit the following transaction of type be.vlaanderen.audittrail.ChangeAuditRequestState
            | audit_id | new_state |
            | audit2   | UNDERREVISION |
        Then I should get an error

    