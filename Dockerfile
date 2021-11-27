FROM node:10

ENV UNQFY_HOST 'http://host.docker.internal:8080'

WORKDIR /home/node/logging

COPY package.json .
COPY package-lock.json .
RUN ["npm", "install"]

EXPOSE 3002

COPY . /home/node/logging/src

RUN chown -R node:users /home/node/logging

USER node

CMD ["npm", "run", "api"]