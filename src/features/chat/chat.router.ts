import { Hono } from "hono";

const chat = new Hono();

chat.get('/', (c) => c.text('all chats'));
chat.post('/', (c => c.text(`create chat with payload ${c.json}`, )));
chat.put('/:id', (c) => c.text(`update with id ${c.req.param('id')}`));
chat.delete('/:id', (c) => c.text(`delete with id ${c.req.param('id')}`));

export default chat;