import type { Producer } from "kafkajs";
import { kakfaClient } from "./kafka.client";
import logger from "../logger";

export const produceMessage = async ({
  topicName,
  key,
  message
}: {
  topicName: string,
  key: string,
  message: any
}) => {
  try {
    const producer: Producer = kakfaClient.producer();
    await producer.connect();
    
    await producer.send({
      topic: topicName,
      messages: [
        { key ,value: JSON.stringify(message) }
      ]
    });
    
    await producer.disconnect();
    return true;
  } catch (error) {
    logger.error(error, 'Error while produing message');
    return false;
  }
}