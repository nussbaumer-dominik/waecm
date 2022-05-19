FROM node:17-alpine AS build-stage

WORKDIR /app

ADD ./package.json ./
ADD ./package-lock.json ./

RUN npm install

ADD ./ ./
RUN npm run build

FROM nginx:alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*

COPY --from=build-stage /app/dist .
COPY ./app.conf /etc/nginx/conf.d/default.conf
COPY ./mime.types /etc/nginx/

ENV TZ="Europe/Vienna"
EXPOSE 4444
CMD ["nginx", "-g", "daemon off;"]
