# Define here the models for your scraped items
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/items.html

import scrapy


class Image(scrapy.Item):
    url = scrapy.Field(serializer=str)
    caption = scrapy.Field(serializer=str)


class NewsArticle(scrapy.Item):
    source = scrapy.Field(serializer=str)
    sourceUrl = scrapy.Field(serializer=str)
    heading = scrapy.Field(serializer=str)
    publishedDate = scrapy.Field(serializer=str)
    authors = scrapy.Field(serializer=list[str])
    tags = scrapy.Field(serializer=list[str])
    images = scrapy.Field(serializer=list[Image])
    description = scrapy.Field(serializer=str)
    body = scrapy.Field(serializer=list[str])
