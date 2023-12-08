# MoNews
A local news aggregator for The Valley, made for Bay Valley Tech. Consists of a MERN stack web app that uses the client-server architecture to allow users to read and comment on articles from different media outlets in The Valley, make and post articles to the app, and subscribe to the app to stay up to date on the latest articles. Also consists of a crawler to gather outside source news articles for the app and a cron which schedules a service to send up subscription newsletters to those who sign up.

## Tech Stack
### Client & Server
* Typescript
* MongoDB
* Express
* Node

### Crawler
* Python
* Scrapy

### Cron
* TypeScript
* Node

*Individual modules/libraries used for each of the above mentioned can be viewed in their corresponding README files*

## Usage
The client acts as the frontend and primary means for users to interact with the app. The server provides a REST API from which the client, crawler, and cron can interface with to perform their tasks. The crawler consists of several crawlers which scrape from various Valley news outlets and adds their articles to the app's database. The cron schedules and calls a service to send out subscriptions to users for newsletters to update them on new articles added to the app.