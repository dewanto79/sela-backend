FROM node:iron-alpine

ARG VERSION=NON_VERSION
ARG VERSION_MESSAGE=NON_VERSION_MESSAGE

# Setting Version
ENV VERSION=$VERSION
ENV VERSION_MESSAGE=$VERSION_MESSAGE

# Application Dir
RUN mkdir -p /app
WORKDIR /app
COPY ./ /app

# ADD DEPS
RUN apk --no-cache add curl

# Build Project
RUN npm install
RUN npm run build

# Running Migration
# RUN npm run typeorm:migration:run

# Running App
CMD ["node" ,"/app/dist/main.js"] 