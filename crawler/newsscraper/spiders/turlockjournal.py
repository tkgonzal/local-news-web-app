import scrapy
from newsscraper.spiders.tro import TroSpider


class TurlockJournalSpider(TroSpider):
    name = "turlockjournal"
    town = "Turlock"
    allowed_domains = ["www.turlockjournal.com"]
    start_urls = [
        "https://www.turlockjournal.com/news/"
    ]

