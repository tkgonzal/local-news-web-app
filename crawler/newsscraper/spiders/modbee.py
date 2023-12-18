import scrapy
import json
from newsscraper.items import Image, NewsArticle


class ModbeeSpider(scrapy.Spider):
    town = "Modesto"
    name = "modbee"
    allowed_domains = ["modbee.com"]
    start_urls = ["https://modbee.com"]
    ARTICLE_LINK_SELECTOR = 'h3 > a'
    # ARTICLE_BODY_SELECTOR = 'article:not(.package) > :not(div)'  # all non-package articles
    ARTICLE_BODY_SELECTOR = 'article.story-body > p:not(.summary), article.story-body > ul'
    ARTICLE_HEADING_SELECTOR = 'h1.h1::text'
    ARTICLE_IMAGES_SELECTOR = 'div.img-container'
    ARTICLE_META_SELECTOR = 'script[type="application/ld+json"]::text'

    def parse(self, response : scrapy.http.Response):
        article_links = response.css(self.ARTICLE_LINK_SELECTOR)
        yield from response.follow_all(article_links, self.parse)

        meta = response.css(self.ARTICLE_META_SELECTOR).get()
        if meta is None:
            return
        meta = json.loads(meta)

        heading = response.css(self.ARTICLE_HEADING_SELECTOR).get()

        date: str = meta["dateModified"]
        authors = list(map(lambda author: author["name"], meta["author"]))
        tags: list[str] = meta["articleSection"].split(" ")

        images: list[Image] = []
        for image_selection in response.css(self.ARTICLE_IMAGES_SELECTOR):
            image = Image()
            image["url"] = image_selection.css('picture .responsive-image').attrib['srcset']
            caption = image_selection.css('figcaption::text').get()
            credit = image_selection.css('figcaption > span::text').get()
            if caption is None:
                image["caption"] = ""
                images.append(image)
                continue
            image["caption"] = caption.strip()
            if credit is None:
                images.append(image)
                continue
            image["caption"] += " " + credit.strip()
            images.append(image)

        body_sections = response.css(self.ARTICLE_BODY_SELECTOR)

        body: list[str] = []
        for section in body_sections:
            section_text = section.css('p::text').get()
            if section_text is not None:
                body.append(section_text)

        article = NewsArticle()
        article['tags'] = tags
        article['source'] = self.name
        article['sourceUrl'] = response.url
        article['heading'] = heading.strip("\n ")
        article['authors'] = authors
        article['publishedDate'] = date
        article['images'] = images
        article['body'] = body

        yield article
