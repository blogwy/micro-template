FROM node:10.13.0-slim as builder

ENV TIME_ZONE=Asia/Shanghai

COPY package.json yarn.lock /app/

WORKDIR /app/

RUN yarn --register=http://r.cnpmjs.org/ && yarn cache clean

COPY . /app/

RUN npm run build:test

FROM nginx as prod

COPY --from=0 /app/dist/ /usr/share/nginx/html
