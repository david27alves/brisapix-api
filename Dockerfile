#node app docker file
FROM node:lts-alpine3.14

WORKDIR /

COPY package.json ./

COPY . .

RUN yarn install

EXPOSE 3000

#lets run multiple commands first yarn typeorm migration:run then yarn dev

CMD yarn typeorm migration:run && yarn dev

#to run the docker file
#docker build -t node-app .
#docker run -p 3000:3000 node-app