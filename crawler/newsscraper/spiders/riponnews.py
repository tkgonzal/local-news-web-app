import scrapy


class RiponnewsSpider(scrapy.Spider):
    name = "riponnews"
    allowed_domains = ["www.myripon.com"]
    start_urls = ["https://www.myripon.com/"]
    custom_settings = {
        "DEPTH_LIMIT": 2
    }

    def parse(self, response: scrapy.http.Response):
        ARTICLE_LINK_SELECTOR = 'article a'
        article_links = response.css(ARTICLE_LINK_SELECTOR)
        yield from response.follow_all(article_links, self.parse_article)

    def parse_article(self, response: scrapy.http.Response):
        ARTICLE_BODY_SELECTOR = 'article:not(.package) > :not(div)'  # all non-package articles
        ARTICLE_BODY_SELECTOR = '.post-content__body div[data-id=rich-content-viewer] > div > * > span > *'
        ARTICLE_DATE_SELECTOR = '.post-metadata__date::text'
        ARTICLE_TITLE_SELECTOR = '.post-title__text > span::text'

        ARTICLE_LINK_SELECTOR = 'article a'
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
            span_text = section.css('span::text').get()
            if span_text is None:
                span_text = section.css('span > *').get()
                if 'role' in section.css('span > *').attrib:
                    span_text = '<br/>'


            body.append(span_text)


        yield {
            'source': self.name,
            'sourceUrl': response.url,
            'title': title.strip("\n "),
            'date': date.strip("\n "),
            'body': body,
        }
