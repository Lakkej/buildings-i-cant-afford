FROM node:16.18.0 as base

WORKDIR /home/node/app

COPY package*.json ./

RUN npm i

COPY . .

ENV HOST=db

HEALTHCHECK CMD curl --fail http://server:5000/health || exit 1 

CMD ["npm", "run", "start"]