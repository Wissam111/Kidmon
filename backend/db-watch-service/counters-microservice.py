import redis
import pymongo
import json


# mongodb database
mongoDbClient = pymongo.MongoClient(
    'mongodb+srv://tarik:tarik212@cluster0.vw8geyt.mongodb.net/?retryWrites=true&w=majority')
db = mongoDbClient['test']
usersCollection = db['users']
activitiesCollection = db['activities']
products_collection = db['products']


# redis connection
redisClient = redis.Redis()


def get_product_by_id(id):
    return products_collection.find_one({"_id": id})


# update product sold count counter
def update_sold_product_counter(doc):
    for item in doc["items"]:
        product = get_product_by_id(item["_id"])
        redisClient.hincrby('PRODUCTS_SOLD_COUNTERS',
                             f'{product["title"]}:{item["_id"]}', item["amount"])


# top products sold
def update_top_products_sold(doc):
    for item in doc["items"]:
        product = get_product_by_id(item["_id"])
        redisClient.zincrby('TOP_SOLD_PRODUCTS', item["amount"], f'{product["title"]}:{item["_id"]}')


#  sold product categories counter
def update_categories_counters(doc):
    for item in doc["items"]:
        product = get_product_by_id(item["_id"])
        redisClient.hincrby('CATEGORIES_COUNTERS',
                            product["category"],item["amount"], )


# recent products sold
def recent_product_sold(doc):
    for item in doc["items"]:
        product = get_product_by_id(item["_id"])
        redisClient.lpush('RECENT_SOLD_PRODUCTS', json.dumps(
            {"title": product["title"], "_id": item["_id"]}))


# update products sold count
def update_products_sold_count(doc):
    for item in doc["items"]:
        redisClient.incrby('SOLD_PRODUCTS_COUNT', item["amount"])


# update products overall count
# def update_products_count():
#     redisClient.incr('PRODUCTS_COUNT')


# # update users count
# def update_user_counter(update):
#     redisClient.incr('USER_COUNT')


# watch for changes
stream = activitiesCollection.watch(
    [{'$match': {'fullDocument.type': 'purchase'}}])
print('started watching activites collection in mongodb database')


for change in stream:
    if (change["operationType"] == 'insert'):
        doc = change["fullDocument"]
        print('new document', doc)
        if doc["type"] == 'purchase':
            update_sold_product_counter(doc)
            update_top_products_sold(doc)
            recent_product_sold(doc)
            update_products_sold_count(doc)
            update_categories_counters(doc)
            redisClient.publish('dashboard:update',
                                'dashboard updated successfully')
