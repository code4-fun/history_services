import { Kafka } from 'kafkajs';
import log from '../utils/logger'

const kafka = new Kafka({
  clientId: 'user-service',
  brokers: ['localhost:9092']
});

const producer = kafka.producer();
const admin = kafka.admin();

const connect = async () => {
  await Promise.all([producer.connect(), admin.connect()]);
};

const sendMessage = async (topic: string, message: any) => {
  try {
    const topics = await admin.listTopics();
    if (!topics.includes(topic)) {
      await createTopic(topic);
    }

    await producer.send({
      topic,
      messages: [{ value: JSON.stringify(message) }],
    });

    console.log('Message sent successfully');
  } catch (error) {
    console.error('Error sending message:', error);
  }
};

const createTopic = async (topic: string) => {
  try {
    await admin.createTopics({
      validateOnly: false,
      waitForLeaders: true,
      timeout: 5000,
      topics: [{
        topic,
        numPartitions: 1,
        replicationFactor: 1,
      }],
    });

    log.info('Topic created successfully:', topic);
  } catch (error) {
    log.error('Error creating topic:', error);
  }
};

export default { connect, sendMessage };
