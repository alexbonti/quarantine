FROM node:12.7.0-alpine

WORKDIR /app

COPY . .

RUN npm install --silent
RUN npm install -g serve

RUN npm run build

EXPOSE 3087

CMD ["serve", "-s", "build", "-l", "3087"]
