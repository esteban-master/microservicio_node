FROM node:12.18.1-alpine
WORKDIR /usr/src/app
COPY package.json ./
COPY yarn.lock ./
RUN yarn install
COPY ./src ./src
CMD npm start