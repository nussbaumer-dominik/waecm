FROM node:16-alpine

WORKDIR /app

COPY . /app/

RUN npm run build

FROM nginx:1.16.0-alpine
COPY --from=build /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d

ENV TZ="Europe/Vienna"
EXPOSE 4444
CMD ["nginx", "-g", "daemon off;"]