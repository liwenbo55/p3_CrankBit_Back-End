#!/bin/bash

# Extract the GitHub SHA and environment from the environment variable
GITHUB_SHA=${GITHUB_SHA:0:7}  
ENVIRONMENT=${TARGET_ENV}

# Update image version in the task-definition.json file
sed -i 's/349498089405.dkr.ecr.ap-southeast-2.amazonaws.com\/crankbit-backend-main:latest/349498089405.dkr.ecr.ap-southeast-2.amazonaws.com\/crankbit-backend-'"$ENVIRONMENT"':'"$GITHUB_SHA"'/g' .github/workflows/task_definition.json

# Update  container name in the task-definition.json file (containerDefinitions block)
sed -i 's/"name": "crankbit-backend-.*"/"name": "crankbit-backend-'"$ENVIRONMENT"'"/' .github/workflows/task_definition.json

# Update family value in the task-definition.json file
sed -i 's/"family": "crankbit_backend_task_main"/"family": "crankbit_backend_task_'"$ENVIRONMENT"'"/' .github/workflows/task_definition.json

#Update executionRoleArn value in the task-definition.json file
sed -i 's/"executionRoleArn": "arn:aws:iam::349498089405:role\/ecs-task-execution-role-main"/"executionRoleArn": "arn:aws:iam::349498089405:role\/ecs-task-execution-role-'"$ENVIRONMENT"'"/' .github/workflows/task_definition.json