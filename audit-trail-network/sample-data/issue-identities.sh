#!/bin/bash

composer identity issue -u adam -a be.vlaanderen.audittrail.ParticipantCivilian#adam -c admin@audit-trail-network
composer identity issue -u dieter -a be.vlaanderen.audittrail.ParticipantCivilian#dieter -c admin@audit-trail-network
composer identity issue -u bram -a be.vlaanderen.audittrail.ParticipantCivilian#bram -c admin@audit-trail-network

composer identity issue -u daniel -a be.vlaanderen.audittrail.ParticipantPublicServant#daniel -c admin@audit-trail-network
composer identity issue -u pascal -a be.vlaanderen.audittrail.ParticipantPublicServant#pascal -c admin@audit-trail-network

composer identity issue -u auditor_aiv -a be.vlaanderen.audittrail.ParticipantAuditor#auditor_aiv -c admin@audit-trail-network
composer identity issue -u auditor_omgeving -a be.vlaanderen.audittrail.ParticipantAuditor#auditor_omgeving -c admin@audit-trail-network

# move card to a different folder
mv *.card ./cards/