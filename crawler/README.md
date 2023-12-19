# MoNews Crawler
A scrapy project that scrapes local news website and appends their data to a MongoDB server.

## Tech Stack
* TypeScript
* Node
* Express
* MongoDB

### Modules Used
* [scrapy3](https://pypi.org/project/Scrapy3/)
* [python-dotenv](https://pypi.org/project/python-dotenv/)
* [titlecase](https://pypi.org/project/titlecase/)
* [certifi](https://pypi.org/project/certifi/)
* [pymongo](https://pypi.org/project/pymongo303/)

## Usage 
This program is design to be run on a linux / unix system. 

*Note: A valid .env file __must__ be present in the crawler folder for the crawler to connet to the database start.*

### ```Spiders```
* modbee.py
* oakdaleleader.py
* riponpress.py
* riverbanknews.py
* tracypress.py
* tro.py
* turlockjournal.py
### ```Commands```
* scrapy crawl [spidername] - to crawl an individual web page
* python3 newsscraper/main.py - to crawl all web pages
* ./cron.sh - to start the schedules loop