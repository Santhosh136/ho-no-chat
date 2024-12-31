import { Kafka } from "kafkajs";

export const kakfaClient = new Kafka({
  clientId: 'my-app',
  brokers: ["localhost:9092"]
});
