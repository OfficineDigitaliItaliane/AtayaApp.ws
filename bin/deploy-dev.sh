#!/bin/bash

ssh -i ~/.ssh/id_rsa -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null -o GlobalKnownHostsFile=/dev/null -p45000 $SSH_DEV_USER@$DEV_HOST << EOF
      cd /home/ruah
      sudo su
      git pull 
      pm2 reload ruah --update-env 
EOF