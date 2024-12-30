import type { Producer } from "kafkajs";
import { kakfaClient } from "./chat.kafka.client";
import { TOPIC_NAME } from "./chat.kafka.constants";

export const produceMessage = async () => {

  const producer: Producer = kakfaClient.producer();
  await producer.connect();
  console.log('Producer connected...');

  await producer.send({
    topic: TOPIC_NAME,
    messages: [
      { value: JSON.stringify({ message: "hello" }) }
    ]
  });
  
  await producer.disconnect();
}