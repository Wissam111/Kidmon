import redis
import pymongo
from kafka import KafkaConsumer
import json


# mongodb database
mongoDbClient = pymongo.MongoClient(
    'mongodb+srv://tarik:tarik212@cluster0.vw8geyt.mongodb.net/?retryWrites=true&w=majority')
db = mongoDbClient['test']
usersCollection = db['users']
activitiesCollection = db['activities']


# redis connection
redisClient = redis.Redis()


# update products sold count counter
def update_sold_product_counter(update):
    pass


def update_top_products_sold(update):
    pass


def recent_product_sold(update):
    pass



# update users count
def update_user_counter(update):
    pass


# watch for changes
stream = activitiesCollection.watch()
for change in stream:
    print(change)
