FROM node:16.14.2
WORKDIR /backend_ineuron
ADD package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 4000
CMD [ "node", "build/index.js"]