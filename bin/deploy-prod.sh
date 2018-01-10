#!/bin/bash

ssh -i ~/.ssh/id_rsa -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null -o GlobalKnownHostsFile=/dev/null -p45000 $SSH_USER@$EC2_HOST << EOF
      cd /home/ruah
      sudo su
      docker-compose stop
      docker-compose rm -f web
      docker-compose pull web
      docker-compose up -d
EOF