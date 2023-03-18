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



configs = {
    'client_id': 'FinalProject',
    'bootstrap_servers': 'glider.srvs.cloudkafka.com:9094',
    'sasl_plain_username': 'xhgnclly',
    'sasl_plain_password': 'm0ZU-KkjjzzxgI-kTM_4KHWL6hiu9x_2',
    'sasl_mechanism': 'SCRAM-SHA-512',
    'security_protocol': 'SASL_SSL',
}

consumer = KafkaConsumer('xhgnclly-transactions',
                         group_id='xhgnclly-transactios-g1',
                         auto_offset_reset='earliest',
                         enable_auto_commit=True,
                         value_deserializer=lambda x: json.loads(
                             x.decode('utf-8')),
                         **configs)





# make transaction
def make_transaction(id: str, senderId: str, receiveId: str, amount: int):
    try:
        session = mongoDbClient.start_session()
        session.start_transaction()

        sender = usersCollection.find_one({'_id': senderId}, session=session)
        reciver = usersCollection.find_one({'_id': receiveId}, session=session)

        if (not sender or not reciver):
            print('no found')

        if sender['credits'] < amount:
            print('transaction cant be made because of insufficient credits')
            return

        # update send credits
        usersCollection.update_one({'_id': senderId, 'version': sender['version']},  {
            '$inc': {'credits': -amount, 'version': 1}}, session=session)
        usersCollection.update_one({'_id': receiveId, 'version': reciver['version']}, {
            '$inc': {'credits':  amount, 'version': 1}}, session=session)

        # insert to activity
        activitiesCollection.insert_one({
            '_id': id,
            'type': 'transaction',
            'from': senderId,
            'to': receiveId,
            'amount': amount,
        }, session=session)

        # update redis transaction counter
        redisClient.incr('transactions:count', 1)
        
        session.commit_transaction()
        print('transaction was made successfully')
    except:
        session.abort_transaction()
    finally:
        session.end_session()






def check_if_exists(id):
    """
        check if the transaction already exists

    """
    return activitiesCollection.find_one({'_id': id}) is not None







print('listening for kafka transactions')

for message in consumer:
    # message value and key are raw bytes -- decode if necessary!
    # e.g., for unicode: `message.value.decode('utf-8')`
    print(message.value)

    if check_if_exists(message.value['id']):
        print('"Duplicate" transaction was not made')
        continue

    make_transaction(**message.value)

