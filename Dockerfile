## builder

FROM node:16-alpine AS builder

WORKDIR /var/www/builder

COPY package.json ./
COPY yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

## production

FROM node:16-alpine AS production

WORKDIR /var/www/production

COPY --from=builder /var/www/builder/package.json ./
COPY --from=builder /var/www/builder/yarn.lock ./

RUN yarn install --production

COPY --from=builder /var/www/builder/dist ./dist
COPY --from=builder /var/www/builder/src/app.js ./src/app.js

EXPOSE 3000

CMD ["node", "./src/app.js"]
