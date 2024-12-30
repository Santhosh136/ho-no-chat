import { type Admin } from "kafkajs";
import { kakfaClient } from "./chat.kafka.client";
import { TOPIC_NAME } from "./chat.kafka.constants";

export const createTopic = async () => {
  
  const admin: Admin = kakfaClient.admin();
  
  try {
    await admin.connect();
    console.log('Connected with admin');

    const topics = await admin.listTopics();
    console.log("Exsiting Topics :", topics);

    if (topics.includes(TOPIC_NAME)) {
      await admin.deleteTopics({
        topics: [TOPIC_NAME]
      });
      console.log('Deleted existing topic');
    }

    const isTopicCreated = await admin.createTopics({
      topics: [
        {
          topic: TOPIC_NAME
        }
      ]
    });

    if (isTopicCreated) console.log(`Topic: ${TOPIC_NAME} created`);
    else throw new Error('Topic not created');

    await admin.disconnect();
    console.log('Disconnected with admin');  
  } catch (error) {
    console.log(`Error while creating topic ${error}`);
  }
};