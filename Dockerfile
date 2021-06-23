FROM node:16-alpine3.13 AS development

ENV NODE_ENV build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=development

COPY . .

RUN npm run build

FROM node:16-alpine3.13 AS prodction

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=prodction

COPY . .

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/main"]