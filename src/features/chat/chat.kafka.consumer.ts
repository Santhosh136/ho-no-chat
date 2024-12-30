import type { Consumer } from "kafkajs";
import { kakfaClient } from "./chat.kafka.client";
import { TOPIC_NAME } from "./chat.kafka.constants";

export const consumeMessages = async () => {

  const consumer: Consumer = kakfaClient.consumer({ groupId: 'my-group'});
  await consumer.connect();
  console.log('Consumer connected...');

  await consumer.subscribe({ topic: TOPIC_NAME, fromBeginning: true});

  await consumer.run({
    eachMessage: async ({ topic, message}) => {
      console.log(`Got message ${JSON.parse(message.value?.toString() || "")} from topic ${TOPIC_NAME}`);
    }
  });

  // await consumer.disconnect();
};


