require('dotenv').config();
const fs = require('fs');
const envPath = require('path').join(__dirname, '.env');

// Auto-criar arquivo .env se não existir
if (!fs.existsSync(envPath)) {
  const envContent = `GROQ_API_KEY=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
PORT=3000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173`;
  fs.writeFileSync(envPath, envContent);
  console.log('✅ Arquivo .env criado automaticamente!');
}

const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Servir arquivos estáticos da pasta public
app.use(express.static(path.join(__dirname, '../public')));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'TAURIAN is running!' });
});

// Generate eBook content
app.post('/api/generate-content', async (req, res) => {
  try {
        console.log('📥 Requisição recebida:', req.body);
    const { title, topic, language = 'pt', ageRange = '4-6' } = req.body;
    const prompt = `Crie um outline detalhado para um eBook infantil intitulado "${title}" sobre ${topic} para crianças de ${ageRange} anos`;    
    const response = await axios.post('https://api.groq.com/openai/v1/chat/completions', {
      model: 'llama-3.3-70b-versatile',      messages: [{ role: 'user', content: prompt }],
      max_tokens: 2000
    }, {
    
    res.json({ content: response.data.choices[0].message.content });
  } catch (error) {
    console.error('❌ Erro na API:', error.response?.data || error.message);
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
