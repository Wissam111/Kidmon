from kafka import KafkaProducer
from kafka.errors import KafkaError
import logging
logging.basicConfig(level=logging.DEBUG)

configs = {
    # 'client_id': 'FinalProject',
    'bootstrap_servers': 'glider.srvs.cloudkafka.com:9094',
    'sasl_plain_password': 'm0ZU-KkjjzzxgI-kTM_4KHWL6hiu9x_2',
    'sasl_plain_username': 'xhgnclly',
    'sasl_mechanism': 'SCRAM-SHA-512',
    'security_protocol': 'SASL_SSL',
}

producer = KafkaProducer(**configs)

future = producer.send('xhgnclly-transactions', 'aaaaaaaaaaaa'.encode('utf-8'))

try:
    record_metadata = future.get(timeout=10)
except KafkaError:
    # Decide what to do if produce request failed...
    print("Producing error")
    pass


print('sent finally')
