import { randomUUIDv7 } from "bun"
import { TOPIC_NAME } from "./chat.constants"
import type { Message } from "./chat.type";
import { produceMessage } from "../../common/kafka/kafka.producer";
import logger from "../../common/logger";
import { createTopic, deleteTopic, getAllTopics } from "../../common/kafka/kafka.admin";
import { consumeMessages } from "../../common/kafka/kafka.consumer";

let chats : string[] = [];

const init = async () => {
  try {
    const topics = await getAllTopics();
    if (topics.includes(TOPIC_NAME)) await deleteTopic(TOPIC_NAME);
    await createTopic(TOPIC_NAME);
    await consumeMessages(TOPIC_NAME);
  } catch (error) {
    logger.error(error, "Error while initializing chat module");
  }
};

const createChat = async () : Promise<any> => {
  const chatId = randomUUIDv7();
  chats.push(chatId);
  return { success: true, chatId };
}

const deleteChat = async (chatId: string) : Promise<any> => {
  chats = chats.filter(chat => chat !== chatId);
  return { succes: true };
}

const getAllChats = async () : Promise<string[]> => {
  return chats;
}

const createMessage = async (chatId: string, message: Message) : Promise<any> => {
  const success = await produceMessage({
    topicName: TOPIC_NAME,
    key: chatId,
    message: message
  })
  return { success };
}

export default {
  init,
  createChat,
  deleteChat,
  getAllChats,
  createMessage
}