import redis
import pymongo
import json
from threading import Thread


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


# update purchases count 
def update_purchases_count(doc):
    redisClient.incr('PURCHASES_COUNT')
        


# update products overall count
# def update_products_count():
#     redisClient.incr('PRODUCTS_COUNT')


# # update users count
def update_user_counter(update):
    redisClient.incr('USER_COUNT')






def watch_activities_collection():
    # watch for changes
    purchases_stream = activitiesCollection.watch(
        [{'$match': {'fullDocument.type': 'purchase'}}])
    print('watching activities collection')

    for change in purchases_stream:
        if (change["operationType"] == 'insert'):
            doc = change["fullDocument"]
            print('new document', doc)
            update_sold_product_counter(doc)
            update_top_products_sold(doc)
            recent_product_sold(doc)
            update_products_sold_count(doc)
            update_categories_counters(doc)
            redisClient.publish('dashboard:update',
                                'dashboard updated successfully')

    

def watch_users_collection():
    # watch for changes
    pipeline = [{'$match': {'operationType': 'insert'}}]
    users_stream = usersCollection.watch(pipeline)
    print('watching users collection')

    for change in users_stream:
        doc = change["fullDocument"]
        print('new user document', doc)
        redisClient.incr('USERS:COUNT')
        redisClient.publish('dashboard:update',
                            'dashboard updated successfully')

    


def watch_products_collection():
    # watch for changes
    pipeline = [{'$match': {'operationType': 'insert'}}]
    products_stream = products_collection.watch(pipeline)
    print('watching products collection')

    for change in products_stream:
        doc = change["fullDocument"]
        print('new product document', doc)
        redisClient.incr('PRODUCTS:COUNT')
        redisClient.publish('dashboard:update',
                            'dashboard updated successfully')

    


t1 = Thread(target= watch_activities_collection)
t2 = Thread(target=watch_products_collection)
t3 = Thread(target=watch_users_collection)

t1.start()
t2.start()
t3.start()

t1.join()
t2.join()
t3.join()
