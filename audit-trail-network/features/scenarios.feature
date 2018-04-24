#
# Flemish Government - Vlaamse Overheid
# Author: Adam 'Blvck' Blazejczak
#

Feature: Scenarios

    Background:
        Given I have deployed the business network definition ..
        And I have added the following participants of type be.vlaanderen.audittrail.ParticipantCivilian
            | civilian_id       | first_name| last_name |
            | adam@email.com    | Adam      | B         |
            | dieter@email.com  | Dieter    | V         |
        And I have added the following participants of type be.vlaanderen.audittrail.ParticipantPublicServant
            | public_servant_id | department              | 
            | daniel@email.com    | Informatie Vlaanderen  |
            | pascal@email.com    | Departement Omgeving   |
        And I have added the following participants of type be.vlaanderen.audittrail.ParticipantAuditor
            | auditor_id        |
            | auditor@email.com |
        And I have added the following assets of type be.vlaanderen.audittrail.LogEntry
            | log_id | timestamp | carbon_hash | accessed_by | data_owner | category | context |
            | log1 | 22-01-2018  | qgfv34afa | be.vlaanderen.audittrail.ParticipantPublicServant#daniel@email.com | be.vlaanderen.audittrail.ParticipantCivilian#adam@email.com   | aanvraag | aanvraag |
            | log2 | 23-02-2018  | fafvawqfu | be.vlaanderen.audittrail.ParticipantPublicServant#pascal@email.com | be.vlaanderen.audittrail.ParticipantCivilian#adam@email.com   | rijksregister | bouwvergunning |
            | log3 | 24-03-2018  | wawew2eaa | be.vlaanderen.audittrail.ParticipantPublicServant#daniel@email.com | be.vlaanderen.audittrail.ParticipantCivilian#dieter@email.com | geboorteplaats | bouwvergunning |
            | log3 | 25-04-2018  | 7a2razw2e | be.vlaanderen.audittrail.ParticipantPublicServant#pascal@email.com | be.vlaanderen.audittrail.ParticipantCivilian#dieter@email.com | aanvraag | bouwvergunning |
        And I have added the following assets of type be.vlaanderen.audittrail.AuditRequest
            | audit_id | timestamp | request_state | sender | auditor | log_to_review |
            | audit1 | 24-03-2018 | REQUESTED | be.vlaanderen.audittrail.ParticipantCivilian#adam@email.com | be.vlaanderen.audittrail.ParticipantAuditor#adauditor@email.com | be.vlaanderen.audittrail.LogEntry#log2 |
            | audit1 | 24-03-2018 | REQUESTED | be.vlaanderen.audittrail.ParticipantCivilian#dieter@email.com | be.vlaanderen.audittrail.ParticipantAuditor#adauditor@email.com | be.vlaanderen.audittrail.LogEntry#log3 |

        And I have issued the participant be.vlaanderen.audittrail.ParticipantCivilian#adam@email.com with the identity adam
        And I have issued the participant be.vlaanderen.audittrail.ParticipantCivilian#dieter@email.com with the identity dieter
        And I have issued the participant be.vlaanderen.audittrail.ParticipantPublicServant#daniel@email.com with the identity daniel
        And I have issued the participant be.vlaanderen.audittrail.ParticipantPublicServant#pascal@email.com with the identity pascal
        And I have issued the participant be.vlaanderen.audittrail.ParticipantAuditor#auditor@email.com with the identity auditor

    # Scenario: Alice can read all of the assets
    #     When I use the identity alice1
    #     Then I should have the following assets of type be.vlaanderen.audittrail.SampleAsset
    #         | assetId | owner           | value |
    #         | 1       | alice@email.com | 10    |
    #         | 2       | bob@email.com   | 20    |

    # Scenario: Bob can read all of the assets
    #     When I use the identity alice1
    #     Then I should have the following assets of type be.vlaanderen.audittrail.SampleAsset
    #         | assetId | owner           | value |
    #         | 1       | alice@email.com | 10    |
    #         | 2       | bob@email.com   | 20    |

    # Scenario: Alice can add assets that she owns
    #     When I use the identity alice1
    #     And I add the following asset of type be.vlaanderen.audittrail.SampleAsset
    #         | assetId | owner           | value |
    #         | 3       | alice@email.com | 30    |
    #     Then I should have the following assets of type be.vlaanderen.audittrail.SampleAsset
    #         | assetId | owner           | value |
    #         | 3       | alice@email.com | 30    |

    # Scenario: Alice cannot add assets that Bob owns
    #     When I use the identity alice1
    #     And I add the following asset of type be.vlaanderen.audittrail.SampleAsset
    #         | assetId | owner           | value |
    #         | 3       | bob@email.com   | 30    |
    #     Then I should get an error matching /does not have .* access to resource/

    # Scenario: Bob can add assets that he owns
    #     When I use the identity bob1
    #     And I add the following asset of type be.vlaanderen.audittrail.SampleAsset
    #         | assetId | owner           | value |
    #         | 4       | bob@email.com   | 40    |
    #     Then I should have the following assets of type be.vlaanderen.audittrail.SampleAsset
    #         | assetId | owner           | value |
    #         | 4       | bob@email.com   | 40    |

    # Scenario: Bob cannot add assets that Alice owns
    #     When I use the identity bob1
    #     And I add the following asset of type be.vlaanderen.audittrail.SampleAsset
    #         | assetId | owner           | value |
    #         | 4       | alice@email.com | 40    |
    #     Then I should get an error matching /does not have .* access to resource/

    # Scenario: Alice can update her assets
    #     When I use the identity alice1
    #     And I update the following asset of type be.vlaanderen.audittrail.SampleAsset
    #         | assetId | owner           | value |
    #         | 1       | alice@email.com | 50    |
    #     Then I should have the following assets of type be.vlaanderen.audittrail.SampleAsset
    #         | assetId | owner           | value |
    #         | 1       | alice@email.com | 50    |

    # Scenario: Alice cannot update Bob's assets
    #     When I use the identity alice1
    #     And I update the following asset of type be.vlaanderen.audittrail.SampleAsset
    #         | assetId | owner           | value |
    #         | 2       | bob@email.com   | 50    |
    #     Then I should get an error matching /does not have .* access to resource/

    # Scenario: Bob can update his assets
    #     When I use the identity bob1
    #     And I update the following asset of type be.vlaanderen.audittrail.SampleAsset
    #         | assetId | owner         | value |
    #         | 2       | bob@email.com | 60    |
    #     Then I should have the following assets of type be.vlaanderen.audittrail.SampleAsset
    #         | assetId | owner         | value |
    #         | 2       | bob@email.com | 60    |

    # Scenario: Bob cannot update Alice's assets
    #     When I use the identity bob1
    #     And I update the following asset of type be.vlaanderen.audittrail.SampleAsset
    #         | assetId | owner           | value |
    #         | 1       | alice@email.com | 60    |
    #     Then I should get an error matching /does not have .* access to resource/

    # Scenario: Alice can remove her assets
    #     When I use the identity alice1
    #     And I remove the following asset of type be.vlaanderen.audittrail.SampleAsset
    #         | assetId |
    #         | 1       |
    #     Then I should not have the following assets of type be.vlaanderen.audittrail.SampleAsset
    #         | assetId |
    #         | 1       |

    # Scenario: Alice cannot remove Bob's assets
    #     When I use the identity alice1
    #     And I remove the following asset of type be.vlaanderen.audittrail.SampleAsset
    #         | assetId |
    #         | 2       |
    #     Then I should get an error matching /does not have .* access to resource/

    # Scenario: Bob can remove his assets
    #     When I use the identity bob1
    #     And I remove the following asset of type be.vlaanderen.audittrail.SampleAsset
    #         | assetId |
    #         | 2       |
    #     Then I should not have the following assets of type be.vlaanderen.audittrail.SampleAsset
    #         | assetId |
    #         | 2       |

    # Scenario: Bob cannot remove Alice's assets
    #     When I use the identity bob1
    #     And I remove the following asset of type be.vlaanderen.audittrail.SampleAsset
    #         | assetId |
    #         | 1       |
    #     Then I should get an error matching /does not have .* access to resource/

    # Scenario: Alice can submit a transaction for her assets
    #     When I use the identity alice1
    #     And I submit the following transaction of type be.vlaanderen.audittrail.SampleTransaction
    #         | asset | newValue |
    #         | 1     | 50       |
    #     Then I should have the following assets of type be.vlaanderen.audittrail.SampleAsset
    #         | assetId | owner           | value |
    #         | 1       | alice@email.com | 50    |
    #     And I should have received the following event of type be.vlaanderen.audittrail.SampleEvent
    #         | asset   | oldValue | newValue |
    #         | 1       | 10       | 50       |

    # Scenario: Alice cannot submit a transaction for Bob's assets
    #     When I use the identity alice1
    #     And I submit the following transaction of type be.vlaanderen.audittrail.SampleTransaction
    #         | asset | newValue |
    #         | 2     | 50       |
    #     Then I should get an error matching /does not have .* access to resource/

    # Scenario: Bob can submit a transaction for his assets
    #     When I use the identity bob1
    #     And I submit the following transaction of type be.vlaanderen.audittrail.SampleTransaction
    #         | asset | newValue |
    #         | 2     | 60       |
    #     Then I should have the following assets of type be.vlaanderen.audittrail.SampleAsset
    #         | assetId | owner         | value |
    #         | 2       | bob@email.com | 60    |
    #     And I should have received the following event of type be.vlaanderen.audittrail.SampleEvent
    #         | asset   | oldValue | newValue |
    #         | 2       | 20       | 60       |

    # Scenario: Bob cannot submit a transaction for Alice's assets
    #     When I use the identity bob1
    #     And I submit the following transaction of type be.vlaanderen.audittrail.SampleTransaction
    #         | asset | newValue |
    #         | 1     | 60       |
    #     Then I should get an error matching /does not have .* access to resource/
