FROM node:alpine
WORKDIR /app
RUN mkdir -p userData
RUN apk add --no-cache curl
COPY package.json package-lock.json ./
RUN npm install --production
COPY . .
EXPOSE 3000
CMD node index.js