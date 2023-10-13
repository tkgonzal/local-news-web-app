import scrapy
import json

class TroSpider(scrapy.Spider):
    name = "tro"
    allowed_domains = ["www.oakdaleleader.com", "www.theriverbanknews.com", "www.turlockjournal.com"]
    start_urls = [
        "https://www.oakdaleleader.com/news/",
        "https://www.theriverbanknews.com/news/",
        "https://www.turlockjournal.com/news/"
    ]
    custom_settings = {
        "DEPTH_LIMIT": 2
    }

    def parse(self, response: scrapy.http.Response):
        ARTICLE_LINK_SELECTOR = 'a.anvil-content-box__link,a.anvil-content-list__text'
        article_links = response.css(ARTICLE_LINK_SELECTOR)
        yield from response.follow_all(article_links, self.parse_article)

    def parse_article(self, response: scrapy.http.Response):
        ARTICLE_BODY_SELECTOR = '.anvil-article__body > div > .anvil-article__stream-wrapper > div > div > *'
        ARTICLE_META_SELECTOR = 'script[type="application/ld+json"]::text'
        ARTICLE_TITLE_SELECTOR = '.anvil-article__title::text'

        ARTICLE_LINK_SELECTOR = 'a.anvil-content-box__link,a.anvil-content-list__text'
        article_links = response.css(ARTICLE_LINK_SELECTOR)
        yield from response.follow_all(article_links, self.parse_article)

        title = response.css(ARTICLE_TITLE_SELECTOR).get()
        meta = response.css(ARTICLE_META_SELECTOR).getall()[-1]


        if title is None:
            print('empty title')
            return
        if meta is None:
            print('empty meta')
            return

        meta = json.loads(meta)
        date = meta["datePublished"]
        print(meta)

        images: list[dict] = []

        body_sections = response.css(ARTICLE_BODY_SELECTOR)
        if body_sections is None:
            print('empty body')
            return

        body: list[str] = []
        for section in body_sections:
            section_text = section.css('p::text').get()
            if section_text is None:
                section_image = section.css('figure').get()
                if section_image is None:
                    continue
                image = {
                    'url': section_image.css('img').attrib['src'],
                    'caption': section_image.css('figcaption::text').get().strip("\n ")
                }

                images.append(image)
                continue

            body.append(section_text)

        yield {
            'source': response.css('head > title::text').get().split('-')[-1].strip(),
            'sourceUrl': response.url,
            'title': title.strip("\n "),
            'date': date.strip("\n "),
            'body': body,
        }
