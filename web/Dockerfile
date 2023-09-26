FROM node:16.18.0 as base

WORKDIR /home/node/web

COPY package*.json ./

RUN npm i

COPY . .

CMD ["npm", "start"]