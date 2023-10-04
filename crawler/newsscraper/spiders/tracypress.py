import scrapy


class TracypressSpider(scrapy.Spider):
    name = "tracypress"
    allowed_domains = ["www.ttownmedia.com"]
    start_urls = ["https://www.ttownmedia.com/tracy_press/"]
    custom_settings = {
        "DEPTH_LIMIT": 5
    }

    def parse(self, response):
        pass
