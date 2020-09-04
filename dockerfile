FROM node:12.18.3-stretch

RUN mkdir /app

WORKDIR /app

COPY index.js /app
COPY package.json /app
COPY yarn.lock /app
COPY public /app

RUN yarn install

CMD ["yarn", "start"]