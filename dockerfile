FROM node:18-alpine3.19

WORKDIR /server

COPY package*.json /server

COPY . /server

RUN npm install

RUN npm run build && \
    npm prune --production

EXPOSE 3000

CMD [ "npm","run","start" ]