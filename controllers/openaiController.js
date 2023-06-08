const openai = require("../config/openaiConfig");

const generateMeta = async (req, res) => {
  const { title } = req.body;

  const description = await openai.createChatCompletion({
    model: "gpt-4-0314",
    messages: [
      {
        role: "user",
        content: `Come up with a description for Youtube video called ${title}`,
      },
    ],
    max_tokens: 100,
  });

  const tags = await openai.createChatCompletion({
    model: "gpt-4-0314",
    messages: [
      {
        role: "user",
        content: `Come up with 10 keywords for a Youtube video called ${title}`,
      },
    ],
    max_tokens: 100,
  });

  res.status(200).json({
    description: description.data.choices[0].message,
    tags: tags.data.choices[0].message,
  });
};

const generateImage = async (req, res) => {
  const image = await openai.createImage({
    prompt: req.body.prompt,
    n: 1,
    size: "512x512",
  });

  res.json({
    url: image.data.data[0].url,
  });
};

module.exports = { generateMeta, generateImage };
