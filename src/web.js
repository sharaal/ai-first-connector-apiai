require('dotenv').config({ silent: true });

const app = require('express')();
app.listen(process.env.PORT);

const rp = require('request-promise').defaults({
  json: true,
  url: process.env.AI_WEBHOOK_URL,
});

app.post('/', require('body-parser').json(), async (req, res) => {
  const apiaiRequest = req.body;
  const aiRequest = {
    intent: apiaiRequest.result.metadata.intentName,
    params: apiaiRequest.result.parameters,
  };
  const aiResponse = await rp.post({ body: aiRequest });
  const apiaiResponse = {};
  if (aiResponse.say) {
    apiaiResponse.speech = aiResponse.say;
  }
  res.send(apiaiResponse);
});