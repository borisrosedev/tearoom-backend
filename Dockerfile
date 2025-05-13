FROM node:22.13.1
WORKDIR /backend
COPY package.json package-lock.json ./
COPY . ./
RUN npm install 
EXPOSE 3000
CMD [ "npm", "run", "start" ]