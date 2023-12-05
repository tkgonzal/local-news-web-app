import scrapy
from scrapy.crawler import CrawlerProcess
from scrapy.utils.project import get_project_settings

from spiders.modbee import ModbeeSpider
from spiders.oakdaleleader import OakdaleLeaderSpider
from spiders.riponpress import RiponPressSpider
from spiders.riverbanknews import RiverbankNewsSpider
from spiders.tracypress import TracypressSpider
from spiders.turlockjournal import TurlockJournalSpider


settings = get_project_settings()
process = CrawlerProcess(settings)
process.crawl(ModbeeSpider)
process.crawl(OakdaleLeaderSpider)
process.crawl(RiponPressSpider)
process.crawl(RiverbankNewsSpider)
process.crawl(TracypressSpider)
process.crawl(TurlockJournalSpider)

process.start()

# from dotenv import dotenv_values
# import pymongo
# import certifi
#
# env = dotenv_values(".env")
# connection = pymongo.MongoClient(
#     host=env['MONGODB_URI'],
#     port=int(env['PORT']),
#     tlsCAFile=certifi.where(),
# )
#
# database = connection[env['DB_NAME']]
# articles = database["article"].delete_many({'source': 'modbee'})
# connection.close()