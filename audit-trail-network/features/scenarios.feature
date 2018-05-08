#
# Flemish Government - Vlaamse Overheid
# Author: Adam 'Blvck' Blazejczak
# smartie.be
#

Feature: Scenarios

    Background:
        Given I have deployed the business network definition ..
        And I have added the following participants of type be.vlaanderen.audittrail.ParticipantCivilian
            | civilian_id       | first_name| last_name |
            | adam@email.com    | Adam      | B         |
            | dieter@email.com  | Dieter    | V         |
            | tien@email.com    | Tien      | T         |
        And I have added the following participants of type be.vlaanderen.audittrail.ParticipantPublicServant
            | public_servant_id   | department            | 
            | daniel@email.com    | InformatieVlaanderen  |
            | pascal@email.com    | DepartementOmgeving   |
        And I have added the following participants of type be.vlaanderen.audittrail.ParticipantAuditor
            | auditor_id        |
            | auditor1@email.com |
            | auditor2@email.com |
        And I have added the following assets of type be.vlaanderen.audittrail.LogEntry
            | log_id | timestamp | carbon_hash | accessed_by | data_owner | category | context |
            | log1 | 22-01-2018  | qgfv34afa | daniel@email.com | adam@email.com   | BOUWVERGUNNING | aanvraag |
            | log2 | 23-02-2018  | fafvawqfu | pascal@email.com | adam@email.com   | SUBSIDIE | bouwvergunning |
            | log3 | 24-03-2018  | wawew2eaa | daniel@email.com | dieter@email.com | HUWELIJK | bouwvergunning |
            | log4 | 25-04-2018  | 7a2razw2e | pascal@email.com | dieter@email.com | SOCIALEWONING | bouwvergunning |
            | log5 | 26-03-2018  | utpoaojks | daniel@email.com | tien@email.com | HUWELIJK | bouwvergunning |
            | log6 | 27-04-2018  | 86jd9xjas | pascal@email.com | tien@email.com | SOCIALEWONING | bouwvergunning |
        And I have added the following assets of type be.vlaanderen.audittrail.AuditRequest
            | audit_id | timestamp | request_state | sender | auditor | log_to_review |
            | audit1 | 24-03-2018 | REQUESTED | adam@email.com | auditor1@email.com | log2 |
            | audit2 | 24-03-2018 | REQUESTED | dieter@email.com | auditor2@email.com | log3 |

        And I have issued the participant be.vlaanderen.audittrail.ParticipantCivilian#adam@email.com with the identity adam1
        And I have issued the participant be.vlaanderen.audittrail.ParticipantCivilian#dieter@email.com with the identity dieter1
        And I have issued the participant be.vlaanderen.audittrail.ParticipantCivilian#tien@email.com with the identity tien1
        And I have issued the participant be.vlaanderen.audittrail.ParticipantPublicServant#daniel@email.com with the identity daniel1
        And I have issued the participant be.vlaanderen.audittrail.ParticipantPublicServant#pascal@email.com with the identity pascal1
        And I have issued the participant be.vlaanderen.audittrail.ParticipantAuditor#auditor1@email.com with the identity auditor1
        And I have issued the participant be.vlaanderen.audittrail.ParticipantAuditor#auditor2@email.com with the identity auditor2

    #####
    # Civilian Log Access
    # Cilians: Adam, Dieter, Tien
    #####
    Scenario: Adam can view his own Participant Profile
        When I use the identity adam1
        Then I should have the following participant of type be.vlaanderen.audittrail.ParticipantCivilian
            | civilian_id       | first_name| last_name |
            | adam@email.com    | Adam      | B         |

    Scenario: Adam can read his own logs
        When I use the identity adam1 
        Then I should have the following assets of type be.vlaanderen.audittrail.LogEntry
            | log_id | timestamp | carbon_hash | accessed_by | data_owner | category | context |
            | log1 | 22-01-2018  | qgfv34afa | daniel@email.com | adam@email.com   | BOUWVERGUNNING | aanvraag |
            | log2 | 23-02-2018  | fafvawqfu | pascal@email.com | adam@email.com   | SUBSIDIE | bouwvergunning |

    Scenario: Adam cannot read other's logs        
        When I use the identity adam1
        Then I should not have the following assets of type be.vlaanderen.audittrail.LogEntry
            | log_id | timestamp | carbon_hash | accessed_by | data_owner | category | context |
            | log3 | 24-03-2018  | wawew2eaa | daniel@email.com | dieter@email.com | HUWELIJK | bouwvergunning |
            | log4 | 25-04-2018  | 7a2razw2e | pascal@email.com | dieter@email.com | SOCIALEWONING | bouwvergunning |
            | log5 | 26-03-2018  | utpoaojks | daniel@email.com | tien@email.com | HUWELIJK | bouwvergunning |
            | log6 | 27-04-2018  | 86jd9xjas | pascal@email.com | tien@email.com | SOCIALEWONING | bouwvergunning |

    Scenario: Dieter can read his own logs
        When I use the identity dieter1 
        Then I should have the following assets of type be.vlaanderen.audittrail.LogEntry
            | log_id | timestamp | carbon_hash | accessed_by | data_owner | category | context |
            | log3 | 24-03-2018  | wawew2eaa | daniel@email.com | dieter@email.com | HUWELIJK | bouwvergunning |
            | log4 | 25-04-2018  | 7a2razw2e | pascal@email.com | dieter@email.com | SOCIALEWONING | bouwvergunning |

    Scenario: Dieter cannot read other's logs        
        When I use the identity dieter1
        Then I should not have the following assets of type be.vlaanderen.audittrail.LogEntry
            | log_id | timestamp | carbon_hash | accessed_by | data_owner | category | context |
            | log1 | 22-01-2018  | qgfv34afa | daniel@email.com | adam@email.com   | BOUWVERGUNNING | aanvraag |
            | log2 | 23-02-2018  | fafvawqfu | pascal@email.com | adam@email.com   | SUBSIDIE | bouwvergunning |
            | log5 | 26-03-2018  | utpoaojks | daniel@email.com | tien@email.com | HUWELIJK | bouwvergunning |
            | log6 | 27-04-2018  | 86jd9xjas | pascal@email.com | tien@email.com | SOCIALEWONING | bouwvergunning |

    Scenario: Tien can read his own logs
        When I use the identity tien1 
        Then I should have the following assets of type be.vlaanderen.audittrail.LogEntry
            | log_id | timestamp | carbon_hash | accessed_by | data_owner | category | context |
            | log5 | 26-03-2018  | utpoaojks | daniel@email.com | tien@email.com | HUWELIJK | bouwvergunning |
            | log6 | 27-04-2018  | 86jd9xjas | pascal@email.com | tien@email.com | SOCIALEWONING | bouwvergunning |

    Scenario: Tien cannot read other's logs        
        When I use the identity tien1
        Then I should not have the following assets of type be.vlaanderen.audittrail.LogEntry
            | log_id | timestamp | carbon_hash | accessed_by | data_owner | category | context |
            | log1 | 22-01-2018  | qgfv34afa | daniel@email.com | adam@email.com   | BOUWVERGUNNING | aanvraag |
            | log2 | 23-02-2018  | fafvawqfu | pascal@email.com | adam@email.com   | SUBSIDIE | bouwvergunning |
            | log3 | 24-03-2018  | wawew2eaa | daniel@email.com | dieter@email.com | HUWELIJK | bouwvergunning |
            | log4 | 25-04-2018  | 7a2razw2e | pascal@email.com | dieter@email.com | SOCIALEWONING | bouwvergunning |

    #####
    # Department Log Access
    # Public Servants: Daniel + Pascal
    #####
    Scenario: Daniel can read informatie vlaanderen logs
        When I use the identity daniel1
        Then I should have the following assets of type be.vlaanderen.audittrail.LogEntry
            | log_id | timestamp | carbon_hash | accessed_by | data_owner | category | context |
            | log1 | 22-01-2018  | qgfv34afa | daniel@email.com | adam@email.com   | BOUWVERGUNNING | aanvraag |
            | log3 | 24-03-2018  | wawew2eaa | daniel@email.com | dieter@email.com | HUWELIJK | bouwvergunning |
            | log5 | 26-03-2018  | utpoaojks | daniel@email.com | tien@email.com | HUWELIJK | bouwvergunning |

    Scenario: Daniel cannot read other department's logs
        When I use the identity daniel1
        Then I should not have the following assets of type be.vlaanderen.audittrail.LogEntry
            | log_id | timestamp | carbon_hash | accessed_by | data_owner | category | context |
            | log2 | 23-02-2018  | fafvawqfu | pascal@email.com | adam@email.com   | SUBSIDIE | bouwvergunning |
            | log4 | 25-04-2018  | 7a2razw2e | pascal@email.com | dieter@email.com | SOCIALEWONING | bouwvergunning |
            | log6 | 27-04-2018  | 86jd9xjas | pascal@email.com | tien@email.com | SOCIALEWONING | bouwvergunning |

    Scenario: Pascal can read informatie vlaanderen logs
        When I use the identity pascal1
        Then I should have the following assets of type be.vlaanderen.audittrail.LogEntry
            | log_id | timestamp | carbon_hash | accessed_by | data_owner | category | context |
            | log2 | 23-02-2018  | fafvawqfu | pascal@email.com | adam@email.com   | SUBSIDIE | bouwvergunning |
            | log4 | 25-04-2018  | 7a2razw2e | pascal@email.com | dieter@email.com | SOCIALEWONING | bouwvergunning |
            | log6 | 27-04-2018  | 86jd9xjas | pascal@email.com | tien@email.com | SOCIALEWONING | bouwvergunning |

    Scenario: Pascal cannot read other department's logs
        When I use the identity pascal1
        Then I should not have the following assets of type be.vlaanderen.audittrail.LogEntry
            | log_id | timestamp | carbon_hash | accessed_by | data_owner | category | context |
            | log1 | 22-01-2018  | qgfv34afa | daniel@email.com | adam@email.com   | BOUWVERGUNNING | aanvraag |
            | log3 | 24-03-2018  | wawew2eaa | daniel@email.com | dieter@email.com | HUWELIJK | bouwvergunning |
            | log5 | 26-03-2018  | utpoaojks | daniel@email.com | tien@email.com | HUWELIJK | bouwvergunning |

    #####
    # Department Log Creation Access
    # Public Servants: Daniel + Pascal
    #####
    Scenario: Daniel should be able to create new NewLogEntry transactions for Adam, Adam can read them, Dieter can't
        When I use the identity daniel1
        And I submit the following transaction of type be.vlaanderen.audittrail.NewLogEntry
            | log_id | carbon_hash | accessed_by | data_owner | category | context |
            | testlog | jkljlkfa    | daniel@email.com | adam@email.com | BOUWVERGUNNING | aanvraag |
        Then I should have received the following event of type be.vlaanderen.audittrail.LogEntryAdded
            | log_id   |
            | testlog  |

        When I use the identity adam1
        Then I should have the following assets of type be.vlaanderen.audittrail.LogEntry
            | log_id | timestamp | carbon_hash | accessed_by | data_owner | category | context |
            | testlog | * | jkljlkfa    | daniel@email.com | adam@email.com | BOUWVERGUNNING | aanvraag |
        When I use the identity dieter1
        Then I should not have the following assets of type be.vlaanderen.audittrail.LogEntry
            | log_id | timestamp | carbon_hash | accessed_by | data_owner | category | context |
            | testlog | * | jkljlkfa    | daniel@email.com | adam@email.com | BOUWVERGUNNING | aanvraag |

    Scenario: Pascal should be able to create new NewLogEntry transactions for Dieter, Dieter can read them, Adam can't
        When I use the identity pascal1
        And I submit the following transaction of type be.vlaanderen.audittrail.NewLogEntry
            | log_id | carbon_hash | accessed_by | data_owner | category | context |
            | testlog2 | jkljlkfa    | pascal@email.com | dieter@email.com | BOUWVERGUNNING | aanvraag |
        When I use the identity adam1
        Then I should not have the following assets of type be.vlaanderen.audittrail.LogEntry
            | log_id | timestamp | carbon_hash | accessed_by | data_owner | category | context |
            | testlog2 | * | jkljlkfa    | pascal@email.com | dieter@email.com | BOUWVERGUNNING | aanvraag |
        When I use the identity dieter1
        Then I should have the following assets of type be.vlaanderen.audittrail.LogEntry
            | log_id | timestamp | carbon_hash | accessed_by | data_owner | category | context |
            | testlog2 | * | jkljlkfa    | pascal@email.com | dieter@email.com | BOUWVERGUNNING | aanvraag |

    #####
    # Audit Request Creation + Access Test
    # Public servants: Daniel + Pascal
    # 
    #####
    Scenario: Adam & Dieter can read each their own audit request submissions (and can't read each other's)
        When I use the identity adam1
        Then I should have the following assets of type be.vlaanderen.audittrail.AuditRequest
            | audit_id | timestamp | request_state | sender | auditor | log_to_review |
            | audit1 | 24-03-2018 | REQUESTED | adam@email.com | auditor1@email.com | log2 |
        Then I should not have the following assets of type be.vlaanderen.audittrail.AuditRequest
            | audit_id | timestamp | request_state | sender | auditor | log_to_review |
            | audit2 | 24-03-2018 | REQUESTED | dieter@email.com | auditor@email.com | log3 |

        When I use the identity dieter1
        Then I should have the following assets of type be.vlaanderen.audittrail.AuditRequest
            | audit_id | timestamp | request_state | sender | auditor | log_to_review |
            | audit2 | 24-03-2018 | REQUESTED | dieter@email.com | auditor2@email.com | log3 |
        Then I should not have the following assets of type be.vlaanderen.audittrail.AuditRequest
            | audit_id | timestamp | request_state | sender | auditor | log_to_review |
            | audit1 | 24-03-2018 | REQUESTED | adam@email.com | auditor1@email.com | log2 |

    Scenario: Auditors can read the audit requests
        When I use the identity auditor1
        Then I should have the following assets of type be.vlaanderen.audittrail.AuditRequest
            | audit_id | timestamp | request_state | sender | auditor | log_to_review |
            | audit1 | 24-03-2018 | REQUESTED | adam@email.com | auditor1@email.com | log2 |
            | audit2 | 24-03-2018 | REQUESTED | dieter@email.com | auditor2@email.com | log3 |
        When I use the identity auditor2
        Then I should have the following assets of type be.vlaanderen.audittrail.AuditRequest
            | audit_id | timestamp | request_state | sender | auditor | log_to_review |
            | audit1 | 24-03-2018 | REQUESTED | adam@email.com | auditor1@email.com | log2 |
            | audit2 | 24-03-2018 | REQUESTED | dieter@email.com | auditor2@email.com | log3 |

    Scenario: Adam can create audit requests and can read them, dieter can't and the auditors can too. 
        When I use the identity adam1
        And I submit the following transaction of type be.vlaanderen.audittrail.NewAuditRequest
            | audit_id | sender | auditor | log_to_review |
            | audittest | adam@email.com | auditor1@email.com | log3 |
        Then I should have the following assets of type be.vlaanderen.audittrail.AuditRequest
            | audit_id | timestamp | request_state | sender | auditor | log_to_review |
            | audittest | * | REQUESTED | adam@email.com | auditor1@email.com | log3 |
        And I should have received the following event of type be.vlaanderen.audittrail.AuditRequestAdded
            | audit_id   |
            | audittest     |

        When I use the identity dieter1
        Then I should not have the following assets of type be.vlaanderen.audittrail.AuditRequest
            | audit_id | timestamp | requsest_state | sender | auditor | log_to_review |
            | audittest | * | REQUESTED | adam@email.com | auditor1@email.com | log3 |

        When I use the identity auditor1
        Then I should have the following assets of type be.vlaanderen.audittrail.AuditRequest
            | audittest | * | REQUESTED | adam@email.com | auditor1@email.com | log3 |

        When I use the identity auditor2
        Then I should have the following assets of type be.vlaanderen.audittrail.AuditRequest
            | audittest | * | REQUESTED | adam@email.com | auditor1@email.com | log3 |


    Scenario: Auditors can change audit requests states
        When I use the identity auditor1
        And I submit the following transaction of type be.vlaanderen.audittrail.ChangeAuditRequestState
            | audit_id | new_state |
            | audit1   | UNDERREVISION |
        Then I should have the following assets of type be.vlaanderen.audittrail.AuditRequest
            | audit_id | timestamp | request_state | sender | auditor | log_to_review |
            | audit1 | 24-03-2018 | UNDERREVISION | adam@email.com | auditor1@email.com | log2 |
        And I should have received the following event of type be.vlaanderen.audittrail.AuditRequestUpdated
            | audit_id   |
            | audit1     |

    # Scenario: Bob cannot update Alice's assets
    #     When I use the identity bob1
    #     And I update the following asset of type be.vlaanderen.audittrail.SampleAsset
    #         | assetId | owner           | value |
    #         | 1       | alice@email.com | 60    |
    #     Then I should get an error matching /does not have .* access to resource/
    