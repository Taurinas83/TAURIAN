#!/bin/bash

# Script para criar arquivo .env automaticamente
# Execute este arquivo na pasta backend do projeto TAURIAN

echo "🚀 Criando arquivo .env..."

# Cria o arquivo .env com a chave da API do Groq
cat > .env << 'EOF'
GROQ_API_KEY=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
PORT=3000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
EOF

echo "✅ Arquivo .env criado com sucesso!"
echo ""
echo "📝 Agora execute:"
echo "   1. npm install (se ainda não instalou)"
echo "   2. npm run dev (para iniciar o backend)"
echo ""
echo "🎉 Depois acesse http://localhost:3000 no navegador!"
