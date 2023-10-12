import scrapy


class TracypressSpider(scrapy.Spider):
    name = "tracypress"
    allowed_domains = ["ttownmedia.com"]
    start_urls = ["https://www.ttownmedia.com/tracy_press/"]
    custom_settings = {
        "DEPTH_LIMIT": 3
    }

    def parse(self, response: scrapy.http.Response):
        ARTICLE_LINK_SELECTOR = 'a.tnt-asset-link'
        article_links = response.css(ARTICLE_LINK_SELECTOR)
        yield from response.follow_all(article_links, self.parse_article)

    def parse_article(self, response: scrapy.http.Response):
        ARTICLE_BODY_SELECTOR = '#article-body > *'
        ARTICLE_DATE_SELECTOR = 'time::text'
        ARTICLE_TITLE_SELECTOR = '.headline > span::text'

        ARTICLE_LINK_SELECTOR = 'a.tnt-asset-link'
        article_links = response.css(ARTICLE_LINK_SELECTOR)
        yield from response.follow_all(article_links, self.parse_article)

        title = response.css(ARTICLE_TITLE_SELECTOR).get()
        date = response.css(ARTICLE_DATE_SELECTOR).get()

        if title is None: return
        if date is None: return

        body_sections = response.css(ARTICLE_BODY_SELECTOR)
        if body_sections is None: return

        body: list[str] = []
        for section in body_sections:
            section_text = section.css('p::text').get()
            if section_text is not None:
                body.append(section_text)

        yield {
            'source': self.name,
            'sourceUrl': response.url,
            'title': title.strip("\n "),
            'date': date.strip("\n "),
            'body': body,
        }
