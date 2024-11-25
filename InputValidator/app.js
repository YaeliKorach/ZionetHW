const express = require('express');
const { DaprClient } = require('@dapr/dapr');

const app = express();
const daprClient = new DaprClient("localhost", "3502");
app.use(express.json());

app.post('/validate', async (req, res) => {
  const { a, b } = req.body;

  if (typeof a !== 'number' || typeof b !== 'number') {
    return res.status(400).send('Inputs must be numbers');
  }

  try {
    // Publish message to RabbitMQ using Dapr Client
    await daprClient.binding.send("rabbitmq-binding", "create", { a, b });
    res.status(200).send('Task queued successfully');
  } catch (error) {
    res.status(500).send(`Failed to enqueue task: ${error.message}`);
  }
});

app.listen(3002, () => console.log('Input Validator listening on port 3002'));
