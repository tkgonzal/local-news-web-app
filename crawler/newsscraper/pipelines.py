from newsscraper.items import NewsArticle, Image
from itemadapter import ItemAdapter
import pymongo
import certifi
from dotenv import dotenv_values
from scrapy.exceptions import DropItem
from titlecase import titlecase


class ArticleDataValidationPipeline:
    def process_item(self, item: NewsArticle, spider):
        if len(item['body']) <= 3:
            raise DropItem(f"Body len={len(item['body'])} too short at article: {item['sourceUrl']}")
        # if len(item['images']) == 0:
        #     raise DropItem(f"Missing image at article: {item['sourceUrl']}")
        if len(item['authors']) == 0:
            raise DropItem(f"Missing authors at article: {item['sourceUrl']}")
        item['heading'] = titlecase(item['heading'])
        return item

class ArticleTagsPipeline:
    def tag_in_tags(self, tag: str, raw_tags: list[str]) -> bool:
        for raw_tag in raw_tags:
            if raw_tag.lower() in tag.lower():
                return True
            if tag.lower() in raw_tag.lower():
                return True
        return False

    def process_item(self, item, spider):
        possible_tags = ["Breaking News",
                      "Local News",
                      "Crime",
                      "Government",
                      "Education",
                      "Sports"]
        sports = ["Football", "Basketball", "Baseball", "Hockey", "Soccer", "Tennis", "Volleyball", "Boxing",
                  "Golf", "Lacrosse", "NBA", "MLB", "NFL", "MLS", "Softball", "Swimming", "Cross Country"]
        pretty_tags = set()
        raw_tags = item['tags']
        for tag in possible_tags:
            if self.tag_in_tags(tag, raw_tags):
                pretty_tags.add(tag)
            if tag == "Sports":
                for sport in sports:
                    if self.tag_in_tags(sport, raw_tags):
                        pretty_tags.add(tag)
                        pretty_tags.add(sport)
                        continue
            if tag == "Local News":
                if tag in pretty_tags:
                    if not self.tag_in_tags('local', raw_tags):
                        pretty_tags.remove(tag)
                        continue
                else:
                    if self.tag_in_tags('high school', raw_tags):
                        pretty_tags.add(tag)
                        continue
                    if self.tag_in_tags(spider.town, raw_tags):
                        pretty_tags.add(tag)
                        continue



        item["tags"] = list(pretty_tags)
        if len(item['tags']) == 0:
            raise DropItem(f"Missing tags at article: {item['sourceUrl']}")
        return item


class MongoPipeline:
    database: any
    connection: any

    def __init__(self):
        pass

    def open_spider(self, spider):
        env = dotenv_values(".env")
        self.connection = pymongo.MongoClient(
            host=env['MONGODB_URI'],
            port=int(env['PORT']),
            tlsCAFile=certifi.where(),
        )

        self.database = self.connection[env['DB_NAME']]

    def close_spider(self, spider):
        self.connection.close()

    def process_item(self, item, spider):
        item["images"] = list(map(lambda image: ItemAdapter(image).asdict(), item["images"]))
        parsed_item = ItemAdapter(item).asdict()
        print(type(parsed_item), ":", parsed_item)
        self.database["article"].insert_one(parsed_item)
        return item
