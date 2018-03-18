FROM node:8-alpine
COPY . /home/node/app/
WORKDIR /home/node/app
RUN npm install
RUN npm run build
ENTRYPOINT NODE_ENV=production npm start
EXPOSE 3000
