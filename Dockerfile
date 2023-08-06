FROM node:18-alpine3.18

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

COPY .env .

COPY .env build/

COPY .env public/build/

EXPOSE 3000

CMD ["/bin/sh", "-c", "npm start"]
