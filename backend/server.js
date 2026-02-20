require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'TAURIAN is running!' });
});

// Generate eBook content
app.post('/api/generate-content', async (req, res) => {
  try {
    const { title, topic, language = 'pt' } = req.body;
    const prompt = `Crie um outline detalhado para um eBook intitulado "${title}" sobre ${topic}`;
    
    const response = await axios.post('https://api.groq.com/openai/v1/chat/completions', {
      model: 'mixtral-8x7b-32768',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 2000
    }, {
      headers: { 'Authorization': `Bearer ${process.env.GROQ_API_KEY}` }
    });
    
    res.json({ content: response.data.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Generate images
app.post('/api/generate-images', async (req, res) => {
  try {
    const { prompt } = req.body;
    const response = await axios.post('https://api.replicate.com/v1/predictions', {
      version: 'db54416d97a4c4fb0b9bfe5da9db2c4eae36472190c35e6d42ef16a9fb9e2d28',
      input: { prompt }
    }, {
      headers: { 'Authorization': `Token ${process.env.REPLICATE_API_TOKEN}` }
    });
    res.json({ image: response.data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`TAURIAN Backend running on port ${PORT}`);
});
