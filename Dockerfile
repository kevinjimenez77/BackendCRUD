FROM node:alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ENV PORT=4200
EXPOSE 4200
CMD [ "npm", "start" ]
#docker build --pull --rm -f "Dockerfile" -t backend-crud-g2-g6:latest "./"
#docker push serchiboi/frontend_vmnode_p2so1