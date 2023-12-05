import scrapy
import json
from newsscraper.items import Image, NewsArticle

class TracypressSpider(scrapy.Spider):
    town = "Tracy"
    name = "tracypress"
    allowed_domains = ["ttownmedia.com"]
    start_urls = ["https://www.ttownmedia.com/tracy_press/"]
    ARTICLE_LINK_SELECTOR = 'a.tnt-asset-link'
    ARTICLE_BODY_SELECTOR = '#article-body > *'
    ARTICLE_DATE_SELECTOR = 'time::text'
    ARTICLE_HEADING_SELECTOR = '.headline > span::text'
    ARTICLE_AUTHOR_SELECTOR = 'head > meta[name="author"]::text'
    ARTICLE_IMAGES_SELECTOR = 'div.asset-photo > figure'
    ARTICLE_META_SELECTOR = 'script[type="text/javascript"]::text'

    def parse(self, response: scrapy.http.Response):
        article_links = response.css(self.ARTICLE_LINK_SELECTOR)
        yield from response.follow_all(article_links, self.parse)

        meta = filter(lambda script: 'published_time' in script, response.css(self.ARTICLE_META_SELECTOR).getall()).__next__()
        if meta is None:
            return
        meta = meta.split('dl.push(')[1].split(')')[0]
        meta = json.loads(meta)

        heading = response.css(self.ARTICLE_HEADING_SELECTOR).get()
        authors = list(map(
            lambda author:
                author["first_name"].strip() + " " + author["last_name"].strip(),
            meta['townnews']['content']['authors']
        ))

        date = meta['townnews']['content']["published_time"]
        tags = meta['townnews']['content']["tags"]

        images: list[Image] = []
        for image_selection in response.css(self.ARTICLE_IMAGES_SELECTOR):
            image = Image()
            image["url"] = image_selection.css('div.image > div[itemprop="image"] > img').attrib['src']
            caption = image_selection.css('figcaption > span.caption-text > p::text').get()
            credit = image_selection.css('figcaption > span.credit > span::text').get()
            if caption is None:
                image["caption"] = ""
                images.append(image)
                continue
            image["caption"] = caption.strip()
            if credit is None:
                images.append(image)
                continue
            image["caption"] += " Credit: " + credit.strip()
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
        article['publishedDate'] = date.strip("\n ")
        article['images'] = images
        article['body'] = body

        yield article
