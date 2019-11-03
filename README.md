
# Node.js Async Crawler

## Requirements

Recursively crawl popular blogging website https://medium.com using Node.js and harvest all possible hyperlinks that belong to medium.com and store them in a database.

What is needed to be stored?
1. Every unique URL encountered.
2. The total reference count of every URL.
3. A complete unique list of parameters associated with this URL


### Prerequisites

Following things are required in order to run the code in development mode:

```
1) Node.js
2) MongodB
```

### Running server in development mode

After mongodb server is up and running, run following commands:

```
1) npm install
2) npm start dev-server
```

Once the server starts:

```
1) It will start crawling data and then it will upload it to database.
2) User can get all the uploaded data till that instant by sending a GET request to 'http://localhost:3000/api/url/getAllData'.
```

## Deployment in production mode

```
docker-compose build
docker-compose up
```
Once the server starts, it will follow same steps mentioned in the above section.

## Built With

* [Node.js](https://nodejs.org) - Server
* [MongodB](https://www.mongodb.com/) - Database
* [Docker](https://www.docker.com/) - Container Platform