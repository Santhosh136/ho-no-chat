import { randomUUIDv7 } from "bun"
import { createTopic, deleteTopic, getAllTopics } from "../../common/kafka/kafka.admin"
import { TOPIC_NAME } from "./chat.constants"
import type { Message } from "./chat.type";
import { produceMessage } from "../../common/kafka/kafka.producer";
import { consumeMessages } from "../../common/kafka/kafka.consumer";

const _getTopicName = (chatId: string) => `${TOPIC_NAME}-${chatId}`;

const createChat = async () : Promise<any> => {
  const chatId = randomUUIDv7();
  const topicName = _getTopicName(chatId);
  const isTopicCreated = await createTopic(topicName);
  if (isTopicCreated) await consumeMessages(topicName);
  return { success: isTopicCreated, chatId };
}

const deleteChat = async (chatId: string) : Promise<any> => {
  const topicName = _getTopicName(chatId);
  const success = await deleteTopic(topicName);
  return { success };
}

const getAllChats = async () : Promise<string[]> => {
  const chats = await getAllTopics();
  return chats;
}

const createMessage = async (chatId: string, message: Message) : Promise<any> => {
  const topicName = _getTopicName(chatId);
  const success = await produceMessage(topicName, message)
  return { success };
}

export default {
  createChat,
  deleteChat,
  getAllChats,
  createMessage
}