FROM node:16.18.0 as base

WORKDIR /home/node/app

COPY package*.json ./

RUN npm i

COPY . .

ENV HOST=db

CMD ["npm", "run", "dev"]