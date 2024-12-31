import { Hono } from "hono";
import chatService from './chat.service';

const chat = new Hono();

chat.get('/', async (c) => {
  const chats = await chatService.getAllChats();
  return c.json(chats, 200);
});
chat.post('/', async (c) => {
  const response = await chatService.createChat();
  return c.json(response, 201);
});
chat.delete('/:chatId', async (c) => {
  const response = await chatService.deleteChat(c.req.param("chatId"));
  return c.json(response, 200)
});

chat.post('/:chatId/messages', async (c) => {
  const message = await c.req.json();
  const chatId = c.req.param("chatId");
  const response = await chatService.createMessage(chatId, message);
  return c.json(response, 201);
});

export default chat;