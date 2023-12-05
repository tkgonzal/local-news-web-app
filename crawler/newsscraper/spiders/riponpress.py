import scrapy
import json
from newsscraper.items import Image, NewsArticle


class RiponPressSpider(scrapy.Spider):
    town = "Ripon"
    name = "riponpress"
    allowed_domains = ["riponpress.com"]
    start_urls = ["https://riponpress.com"]
    ARTICLE_LINK_SELECTOR = '.tnt-headline > a'
    # ARTICLE_BODY_SELECTOR = 'article:not(.package) > :not(div)'  # all non-package articles
    ARTICLE_BODY_SELECTOR = '#article-body > *'
    ARTICLE_HEADING_SELECTOR = 'h1.headline > span::text'
    ARTICLE_IMAGES_SELECTOR = 'div.inline-image > figure'
    ARTICLE_META_SELECTOR = 'script[type="text/javascript"]::text'

    def parse(self, response: scrapy.http.Response):
        if '404' in response.css('meta[property="og:title"]').attrib['content']:
            return

        article_links = response.css(self.ARTICLE_LINK_SELECTOR)
        yield from response.follow_all(article_links, self.parse)

        meta = response.css(self.ARTICLE_META_SELECTOR).get()
        meta = meta.split('dl.push(')[1].split(')')[0]
        meta = json.loads(meta)
        if 'obituaries' in meta['townnews']['content']['taxonomies']['blox_sections']['items']:
            return

        heading = response.css(self.ARTICLE_HEADING_SELECTOR).get()
        authors = [meta['tncms']['asset']['author']]

        date = meta['townnews']['content']["published_time"]
        tags = meta['townnews']['content']["tags"]

        images: list[Image] = []
        for image_selection in response.css(self.ARTICLE_IMAGES_SELECTOR):
            image = Image()
            image["url"] = image_selection.css('div.image > div > meta[itemprop="contentUrl"]').attrib['content']
            caption = image_selection.css('figcaption > span.caption-text > p > span::text').get()
            credit = image_selection.css('figcaption > span.credit > span::text').get()
            if caption is None:
                image["caption"] = ""
                images.append(image)
                continue
            image["caption"] = caption.strip()[:-5]
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
