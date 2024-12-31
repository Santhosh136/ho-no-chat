import { type Admin } from "kafkajs";
import { kakfaClient } from "./kafka.client";
import logger from "../logger";
import { TOPIC_NAME } from "../../features/chat/chat.constants";
const admin: Admin = kakfaClient.admin();

export const deleteTopic = async (topicName: string) => {
  try {
    await admin.connect();
    await admin.deleteTopics({
      topics: [topicName]
    });
    logger.info(`Topic ${TOPIC_NAME} deleted`);
    await admin.disconnect();
    return true;
  } catch (error) {
    logger.error(error, 'Error while deleting topic');
    return false;
  }
}

export const getAllTopics = async () => {
  await admin.connect();
  const topics = await admin.listTopics();
  await admin.disconnect();
  return topics;
}

export const createTopic = async (topicName: string) => {
  try {
    await admin.connect();
    const isTopicCreated = await admin.createTopics({
      topics: [
        { topic: topicName }
      ]
    });

    if (isTopicCreated) 
      logger.info(`Topic: ${topicName} created`);
    else throw new Error('Topic not created');

    await admin.disconnect();
    return true;
  } catch (error) {
    logger.error(error, `Error while creating topic`);
    await admin.disconnect();
    return false;
  }
};