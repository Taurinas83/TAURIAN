#!/bin/bash

echo "🚀 ATUALIZANDO O SISTEMA TAURIAN..."
echo ""

# Parar o servidor atual (se estiver rodando)
echo "⏸️  Parando servidor..."
pkill -f "node.*server.js" 2>/dev/null || true

# Atualizar o código do GitHub
echo "📥 Baixando atualizações do GitHub..."
git pull origin main

# Instalar dependências (caso tenha novas)
echo "📦 Instalando dependências..."
npm install

echo ""
echo "✅ ATUALIZAÇÃO COMPLETA!"
echo ""
echo "🚀 Iniciando servidor..."
echo ""

# Iniciar o servidor
npm run dev
