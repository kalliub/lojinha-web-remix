FROM node:18-alpine3.17

WORKDIR /app

COPY package.json .

RUN yarn install

COPY . .

RUN yarn build

COPY .env .

COPY .env build/

COPY .env public/build/

EXPOSE 3000

CMD ["yarn", "start"]