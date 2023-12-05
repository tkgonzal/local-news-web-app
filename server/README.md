# MoNews Server
A REST API express server that provides the means to interact with the MongoDB database for the MoNews App.

## Tech Stack
* TypeScript
* Node

### Modules Used
* [bcrypt](https://www.npmjs.com/package/bcrypt)
* [case](https://www.npmjs.com/package/case)
* [cors](https://www.npmjs.com/package/cors)
* [dotenv](https://www.npmjs.com/package/dotenv)
* [express](https://www.npmjs.com/package/express)
* [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
* [mongodb](https://www.npmjs.com/package/mongodb)
* [ts-node](https://www.npmjs.com/package/ts-node)

## Usage 
Server runs in perpetuity and provides a REST API for the client, crawler, and cron to make requests to to get and alter data from the database for the app. *Note: A valid .env file __must__ be present in the server folder for the server to start.*

