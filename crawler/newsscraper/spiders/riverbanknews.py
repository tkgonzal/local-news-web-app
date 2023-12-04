import scrapy
from newsscraper.spiders.tro import TroSpider


class RiverbankNewsSpider(TroSpider):
    name = "riverbanknews"
    town = "Riverbank"
    allowed_domains = ["www.theriverbanknews.com"]
    start_urls = [
        "https://www.theriverbanknews.com/news/",
    ]