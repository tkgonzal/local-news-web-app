import scrapy
import json
from newsscraper.items import Image, NewsArticle


class TroSpider(scrapy.Spider):
    ARTICLE_LINK_SELECTOR = 'a.anvil-content-box__link,a.anvil-content-list__text'
    ARTICLE_BODY_SELECTOR = '.anvil-article__body > div > .anvil-article__stream-wrapper > div > div > *'
    ARTICLE_META_SELECTOR = 'script[type="application/ld+json"]::text'
    ARTICLE_HEADING_SELECTOR = '.anvil-article__title::text'
    MAIN_IMAGE_SELECTOR = "article.anvil-article > div.row > div.column > figure"
    name = "tro"
    allowed_domains = [
        "www.turlockjournal.com",
        "www.theriverbanknews.com",
        "www.oakdaleleader.com",
    ]
    start_urls = [
        "https://www.turlockjournal.com/news/",
        "https://www.theriverbanknews.com/news/",
        "https://www.oakdaleleader.com/news/",
    ]
    def parse(self, response: scrapy.http.Response):
        meta = response.css(self.ARTICLE_META_SELECTOR).getall()[-1]
        if meta is None:
            print('empty meta')
            return
        meta = json.loads(meta)

        article_links = response.css(self.ARTICLE_LINK_SELECTOR)
        yield from response.follow_all(article_links, self.parse)
        if meta["@type"] == "WebPage":
            return

        date = meta["datePublished"]
        authors = list(map(lambda author: author["name"], meta["author"]))
        tags = [meta["articleSection"]]

        heading = response.css(self.ARTICLE_HEADING_SELECTOR).get()

        images: list[Image] = []

        main_image = response.css(self.MAIN_IMAGE_SELECTOR)
        image = Image()
        image['url'] = main_image.css('div > img').attrib['src']
        caption = main_image.css('figcaption::text').get()
        if caption is not None:
            image['caption'] = caption.strip("\n ")
        images.append(image)

        body_sections = response.css(self.ARTICLE_BODY_SELECTOR)

        body: list[str] = []
        for section in body_sections:
            section_image = section.css('figure')
            if section_image.get() is None:
                section_text = section.css('p::text').get()
                if section_text is not None:
                    body.append(section_text)
                continue
            image = Image()
            image['url'] = section_image.css('img').attrib['src']
            caption = section_image.css('figcaption::text').get()
            if caption is not None:
                image['caption'] = caption.strip("\n ")
            images.append(image)
            continue

        article = NewsArticle()

        article['tags'] = tags
        article['source'] = response.css('head > title::text').get().split('-')[-1].strip()
        article['sourceUrl'] = response.url
        article['heading'] = heading.strip("\n ")
        article['authors'] = authors
        article['publishedDate'] = date.strip("\n ")
        article['images'] = images
        article['body'] = body

        yield article
