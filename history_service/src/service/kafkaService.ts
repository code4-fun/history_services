import { Kafka, EachMessagePayload } from 'kafkajs';
import log from '../utils/logger';
import { History } from '../db/models/history';

const kafka = new Kafka({
  clientId: 'history-service',
  brokers: [process.env.KAFKA_BROKER || 'localhost:9092'],
});

const consumer = kafka.consumer({ groupId: 'history-group' });

const connect = async () => {
  await consumer.connect();
};

const consumeMessages = async (topic: string) => {
  await consumer.subscribe({ topic, fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }: EachMessagePayload) => {
      const msgValue = message.value?.toString();
      if (msgValue) {
        const event = JSON.parse(msgValue);
        log.info(`Consumed event from topic ${topic}:`, event);
        await handleEvent(event);
      }
    },
  });
};

const handleEvent = async (event: any) => {
  try {
    const newHistory = await History.create({
      user_id: event.user.id,
      action: event.action,
      details: event.user,
    } as History);
    log.info('History record created:', newHistory);
  } catch (error) {
    log.error('Error processing event:', error);
  }
};

export default { connect, consumeMessages };
