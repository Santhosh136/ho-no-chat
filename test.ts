import { Kafka } from "kafkajs";

export const kakfaClient = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092']
});

const admin = kakfaClient.admin();
await admin.connect();
const topics = await admin.listTopics();
console.log("topics", topics);
await admin.disconnect();
