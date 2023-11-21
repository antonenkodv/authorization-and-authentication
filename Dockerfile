FROM node:18 as build

WORKDIR /app

COPY package*.json ./

RUN yarn install

COPY . .

RUN yarn prisma generate

ENV NODE_ENV development

RUN yarn build

COPY api-entrypoint.sh ./
ENTRYPOINT ["sh", "api-entrypoint.sh"]
#RUN npx prisma migrate deploy

EXPOSE 3000

#CMD ["yarn", "start:dev"]