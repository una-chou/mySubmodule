# build stage
FROM node:lts-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN export SASS_BINARY_SITE="https://npm.taobao.org/mirrors/node-sass" && \ 
   npm install  --registry=https://registry.npm.taobao.org
COPY . .
ARG action
RUN if [ "$action" ];then \
        echo $action ; \
        npm run $action; \
     else \
        echo $action ; \
        npm run build; \
     fi

# production stage
FROM nginx:alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
