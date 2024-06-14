import { Kafka, Consumer, EachMessagePayload, logLevel, LogEntry } from 'kafkajs';
import log from '../utils/logger';
import { History } from '../db/models/history';
import { createLogger, transports } from 'winston';

class KafkaConsumerService {
  private kafka: Kafka;
  private consumer: Consumer;

  constructor(clientId: string, brokers: string[], groupId: string) {
    const toWinstonLogLevel = (level: logLevel): string => {
      switch(level) {
        case logLevel.ERROR:
        case logLevel.NOTHING:
          return 'error';
        case logLevel.WARN:
          return 'warn';
        case logLevel.INFO:
          return 'info';
        case logLevel.DEBUG:
          return 'debug';
      }
    };

    const WinstonLogCreator = logLevel => {
      const logger = createLogger({
        level: toWinstonLogLevel(logLevel),
        transports: [
          new transports.Console(),
          new transports.File({ filename: 'myapp.log' })
        ]
      })

      return ({ namespace, level, label, log }: LogEntry) => {
        const { message, ...extra } = log;
        logger.log({
          level: toWinstonLogLevel(level),
          message: `[${namespace}] ${message}`,
          extra,
        });
      };
    };

    this.kafka = new Kafka({
      clientId,
      brokers,
      logLevel: logLevel.NOTHING,
      logCreator: WinstonLogCreator
    });
    this.consumer = this.kafka.consumer({ groupId });
  }

  public async connect() {
    try {
      await this.consumer.connect();
      log.info('Connected to Kafka');
    } catch (error) {
      log.error('Error connecting to Kafka.');
    }
  }

  public async consumeMessages(topic: string) {
    await this.consumer.subscribe({ topic, fromBeginning: true });
    log.info(`Subscribed to topic '${topic}'`);

    await this.consumer.run({
      eachMessage: async ({ topic, partition, message }: EachMessagePayload) => {
        try {
          const msgValue = message.value?.toString();
          if (msgValue) {
            const event = JSON.parse(msgValue);
            log.info(`Consumed %s event of user with id '%s' from topic '%s'.`, event.action, event.user.id, topic);
            await this.handleEvent(event);
          }
        } catch (error) {
          log.error('Error processing message.', error);
        }
      },
    });
  }

  private async handleEvent(event: any) {
    try {
      const newHistory = await History.create({
        user_id: event.user.id,
        action: event.action,
        details: event.user,
      } as History);
      log.info(`History record with id '%s' created.`, newHistory.dataValues.id);
    } catch (error) {
      log.error(`Error processing %s event for user with id '%s'.`, event.action, event.user.id);
    }
  }
}

const kafkaBroker = process.env.KAFKA_BROKER || 'localhost:9092';
const kafkaConsumerService = new KafkaConsumerService('history-service', [kafkaBroker], 'history-group');

export default kafkaConsumerService;
