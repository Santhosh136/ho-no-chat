import type { Consumer } from "kafkajs";
import { kakfaClient } from "./kafka.client";
import logger from "../logger";

export const consumeMessages = async (topicName: string) => {

  const consumer: Consumer = kakfaClient.consumer({ groupId: 'my-group'});
  await consumer.connect();
  logger.info('Consumer connected...');

  await consumer.subscribe({ topic: topicName, fromBeginning: true});

  await consumer.run({
    eachMessage: async ({ topic, message}) => {
      const parsedMessage = JSON.parse(message.value?.toString() || "");
      console.log(`-> ${parsedMessage.sender} : ${parsedMessage.body}`);
    }
  });

  // await consumer.disconnect();
};


