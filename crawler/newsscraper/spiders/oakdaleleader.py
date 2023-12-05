import scrapy
from newsscraper.spiders.tro import TroSpider


class OakdaleLeaderSpider(TroSpider):
    name = "oakdaleleader"
    town = "Oakdale"
    allowed_domains = ["www.oakdaleleader.com"]
    start_urls = [
        "https://www.oakdaleleader.com/news/",
    ]
