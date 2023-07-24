# docker image
FROM node:18

# Working directory
# WORKDIR .
WORKDIR /app

# Arguments
ARG MONGO_URI
ARG JWT_SECRET
ARG JWT_SECRET_KEY
ARG JWT_LIFETIME
ARG PORT
ARG EMAIL_SERVER_PASSWORD
ARG EMAIL_SERVER_PORT
ARG EMAIL_SERVER_HOST
ARG EMAIL_FROM
ARG EMAIL_SERVER_USER
ARG SENDGRID_API_KEY

# # ENV
# Use  ENV command to set the environment variables inside the container
ENV MONGO_URI=${MONGO_URI}
ENV JWT_SECRET=${JWT_SECRET}
ENV JWT_LIFETIME=${JWT_LIFETIME}
ENV JWT_SECRET_KEY=${JWT_SECRET_KEY}
ENV PORT=${PORT}
ENV EMAIL_SERVER_PASSWORD=${EMAIL_SERVER_PASSWORD}
ENV EMAIL_SERVER_PORT=${EMAIL_SERVER_PORT}
ENV EMAIL_SERVER_HOST=${EMAIL_SERVER_HOST}
ENV EMAIL_FROM=${EMAIL_FROM}
ENV EMAIL_SERVER_USER=${EMAIL_SERVER_USER}
ENV SENDGRID_API_KEY=${SENDGRID_API_KEY}

# Copy the application code into the container
# COPY . .
COPY . /app

# Install dependencies and run build 
RUN npm install
RUN npm run build

# Expose port 8080
EXPOSE 8080

# Set the entrypoint for the container
# ENTRYPOINT [ "npm", "build" ,"npm", "start:pm2" ]
# ENTRYPOINT npm run start:pm2
# ENTRYPOINT npm run start:pm2 && tail -f /dev/null
# CMD ["npm", "run", "start:pm2"]
CMD ["npm", "start"]
