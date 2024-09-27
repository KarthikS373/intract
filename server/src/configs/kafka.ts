import { KafkaClient, Producer, Consumer } from 'kafka-node';

const client = new KafkaClient({ kafkaHost: 'kafka:9092' });

const producer = new Producer(client);
const consumer = new Consumer(client, [{ topic: 'notifications', partition: 0 }], {
  autoCommit: true,
});

export { producer, consumer };

