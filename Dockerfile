# FROM node:14-alpine3.16
# FROM node:15.0-alpine3.10
# FROM node:15.7.0-alpine3.11
FROM node:16.20.0-alpine3.17

WORKDIR /app
ADD package.json /app/package.json
# ADD package-lock.json /app/package-lock.json

RUN apk update
RUN apk add --no-cache git
RUN npm i --quiet -f

# RUN rm /app/node_modules/kool/lib/index.d.ts

ADD . /app
# EXPOSE PORT
# RUN npm run build
CMD node index