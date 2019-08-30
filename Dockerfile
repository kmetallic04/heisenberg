#Use node 10.16.3-jessie-slim
FROM mhart/alpine-node:11
COPY . /app
WORKDIR /app
RUN [ "npm", "i" ]
EXPOSE 3000
CMD [ "npm", "run", "prod" ]