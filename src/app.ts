import { Hono } from 'hono';
import chat from './features/chat/chat.router';
import logger from './common/logger';

const app = new Hono();
app.route('/api/chats', chat);

app.get('/', (c) => {
  return c.text('Hello There!')
});

app.notFound((c) => c.json({ error: "Not Found :-("}, 404));
app.onError((err, c) => {
  logger.error(`Error while handling request ${c.req.path}, Stack trace: ${err.stack}`)
  return c.json({ error: 'Internal Server Error'}, 500);
})

export default {
  port: 3030,
  fetch: app.fetch
};