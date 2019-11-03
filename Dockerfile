FROM node:latest
RUN mkdir -p /usr/src/Web-Crawler
WORKDIR /usr/src/Web-Crawler
COPY package.json /usr/src/Web-Crawler/
RUN npm install
COPY . /usr/src/Web-Crawler
EXPOSE 3000
CMD ["npm","start"]