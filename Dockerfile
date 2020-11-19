# -- compiler --
FROM node:lts AS compiler
WORKDIR /var/app
COPY package*.json ./
RUN set -ex && \
    npm set progress=false && \
    npm config set registry https://registry.npm.taobao.org && \
    npm i
COPY tsconfig*.json *.config.js ./
COPY src ./src
COPY build ./build
COPY public ./public
RUN npm run build

# -- runtime --
FROM nginx:alpine
LABEL maintainer="zzj <zhjlydia@foxmail.com>"
COPY --from=compiler /var/app/dist /var/www/html
COPY proxy.conf /etc/nginx/