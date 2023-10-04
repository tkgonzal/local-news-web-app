import scrapy


class ModbeeSpider(scrapy.Spider):
    name = "modbee"
    allowed_domains = ["modbee.com"]
    start_urls = ["https://modbee.com"]
    custom_settings = {
        "DEPTH_LIMIT": 2
    }

    def parse(self, response: scrapy.http.Response):
        ARTICLE_LINK_SELECTOR = 'h3 > a'
        article_links = response.css(ARTICLE_LINK_SELECTOR)
        yield from response.follow_all(article_links, self.parse_article)
    def parse_article(self, response : scrapy.http.Response):
        ARTICLE_BODY_SELECTOR = 'article:not(.package) > :not(div)'  # all non-package articles
        ARTICLE_BODY_SELECTOR = 'article.story-body > p:not(.summary), article.story-body > ul'
        ARTICLE_DATE_SELECTOR = 'article.story-body > p.summary > span::text'
        ARTICLE_TITLE_SELECTOR = 'h1.h1::text'

        ARTICLE_LINK_SELECTOR = 'h3 > a'
        article_links = response.css(ARTICLE_LINK_SELECTOR)
        yield from response.follow_all(article_links, self.parse_article)

        title = response.css(ARTICLE_TITLE_SELECTOR).get()
        date = response.css(ARTICLE_DATE_SELECTOR).get()
        body = response.css(ARTICLE_BODY_SELECTOR).getall()

        if title is None: return
        if date is None: return
        if body is None: return

        yield {
            'source': self.name,
            'sourceUrl': response.url,
            'title': title.strip("\n "),
            'date': date.strip("\n "),
            'body': body,
        }
