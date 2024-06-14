import { Kafka, Producer, Admin } from 'kafkajs';
import log from '../utils/logger';
import {User} from "../db/models/user";

interface userMessage {
  action: string
  user: User
}

class KafkaProducerService {
  private kafka: Kafka;
  private producer: Producer;
  private admin: Admin;

  constructor(clientId: string, brokers: string[]) {
    this.kafka = new Kafka({ clientId, brokers });
    this.producer = this.kafka.producer();
    this.admin = this.kafka.admin();
  }

  public async connect() {
    try {
      await Promise.all([this.producer.connect(), this.admin.connect()]);
      log.info('Kafka producer and admin connected');
    } catch (error) {
      log.error('Error connecting Kafka producer and admin.');
    }
  }

  public async sendMessage(topic: string, message: userMessage) {
    try {
      const topics = await this.admin.listTopics();
      if (!topics.includes(topic)) {
        await this.createTopic(topic);
      }

      await this.producer.send({
        topic,
        messages: [{ value: JSON.stringify(message) }],
      });

      log.info(`Message for %s user with id '%s' sent successfully.`, message.action, message.user.id);
    } catch (error) {
      log.error('Error sending message.');
    }
  }

  private async createTopic(topic: string) {
    try {
      await this.admin.createTopics({
        validateOnly: false,
        waitForLeaders: true,
        timeout: 5000,
        topics: [{
          topic,
          numPartitions: 1,
          replicationFactor: 1,
        }],
      });

      log.info(`Topic '%s' created successfully.`, topic);
    } catch (error) {
      log.error('Error creating topic.');
    }
  }
}

const kafkaBroker = process.env.KAFKA_BROKER || 'localhost:9092';
const kafkaProducerService = new KafkaProducerService('user-service', [kafkaBroker]);

export default kafkaProducerService;
