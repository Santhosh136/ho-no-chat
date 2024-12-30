import { Hono } from 'hono';
import { logger } from 'hono/logger';
import chat from './features/chat/chat.router';
import { createTopic } from './features/chat/chat.kafka.admin';
import { produceMessage } from './features/chat/chat.kafka.producer';
import { consumeMessages } from './features/chat/chat.kafka.consumer';

const app = new Hono();
app.use(logger());

createTopic();
consumeMessages();

app.route('/api/chats', chat);

app.get('/', (c) => {
  return c.text('Hello There!')
});

app.post('/produce', async (c) => {
  await produceMessage();
  return c.json({ "message": "Produced"}, 200);
})

app.notFound((c) => c.json({ error: "Not Found :-("}, 404));
app.onError((err, c) => {
  console.error(`Error while handling request ${c.req.path}, Stack trace: ${err.stack}`)
  return c.json({ error: 'Internal Server Error'}, 500);
})

export default {
  port: 3030,
  fetch: app.fetch
};