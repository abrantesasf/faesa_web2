FROM node:14.16.0

WORKDIR /opt/web2/back

COPY . .

RUN npm install --only=production

EXPOSE 3005

ENV NODE_ENV='production'

CMD ["node", "server.js"]