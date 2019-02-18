FROM node:alpine as builder
RUN mkdir /app
WORKDIR /app

COPY ./ /app/web
RUN rm -rf ./web/node_modules
RUN npm --prefix ./web install ./web
RUN npm --prefix ./web run build

FROM nginx:alpine
COPY --from=builder /app/web/dist /usr/share/nginx/html
COPY ./default.conf /etc/nginx/conf.d/defualt.conf

EXPOSE 80
