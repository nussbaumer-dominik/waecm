FROM nginx:alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*

COPY ./dist .

ENV TZ="Europe/Vienna"
EXPOSE 4444
CMD ["nginx", "-g", "daemon off;"]
