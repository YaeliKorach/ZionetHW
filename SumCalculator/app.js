const express = require('express');
const app = express();
app.use(express.json());

// RabbitMQ binding endpoint for processing tasks
app.post('/task-queue', (req, res) => {
  const { a, b } = req.body;

  if (typeof a !== 'number' || typeof b !== 'number') {
    return res.status(400).send('Invalid data received');
  }

  const sum = a + b;
  console.log(`Calculated sum: ${sum}`);
  res.status(200).send({ sum });
});

app.listen(3003, () => console.log('Sum Calculator listening on port 3003'));
