# 🚀 TAURIAN - GUIA DE INÍCIO RÁPIDO

## O que é TAURIAN?
Sistema automático que gera livros COMPLETOS prontos para vender na Amazon KDP.

**Fluxo**: Tema → Outline → Capítulos → Capa → PDF/EPUB → Publica no KDP

---

## 🎯 COMO COMEÇAR (3 PASSOS - 5 MINUTOS)

### **PASSO 1: Clone o repositório**
```bash
git clone https://github.com/Taurinas83/TAURIAN.git
cd TAURIAN
```

### **PASSO 2: Configure as variáveis de ambiente**

Crie arquivo `backend/.env` com estas variáveis:

```env
GROQ_API_KEY=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
REPLICATE_API_TOKEN=r8_[ADICIONE_SEU_TOKEN]
FIREBASE_PROJECT_ID=[SEU_PROJECT_ID]
FIREBASE_PRIVATE_KEY=[SUA_CHAVE]
FIREBASE_CLIENT_EMAIL=[SEU_EMAIL]
PORT=3000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

### **PASSO 3: Inicie o sistema**

**Terminal 1 - Backend:**
```bash
cd backend
npm install
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm install
npm run dev
```

Acesse: **http://localhost:5173**

---

## 📊 COMO USAR

1. **Digite um tema** (ex: "Produtividade com IA")
2. **Sistema gera:**
   - ✅ Outline com 12 capítulos
   - ✅ Conteúdo completo (2500-3500 palavras/cap)
   - ✅ Capa profissional com IA
   - ✅ PDF/EPUB pronto para KDP
3. **Faz upload** no Amazon KDP
4. **Começa a gerar renda!**

---

## 💰 RENTABILIDADE

**Livro exemplo: "Automação com IA"**

```
Custo de criação: R$ 2,02
Preço no KDP: R$ 29,90
Lucro por venda: R$ 27,88 (92%!)

50 vendas/mês = R$ 1.394,00 LUCRO
```

---

## 🔑 Chaves de API (Obtenha agora)

1. **Groq API** ✅ Já configurada
   - Acesso: https://console.groq.com
   - Gratisíssimo - bilhões de tokens/mês

2. **Replicate** (Imagens)
   - Acesso: https://replicate.com
   - 5 chamadas FREE/mês
   - Pegue seu token e adicione em `.env`

3. **Firebase** (Database)
   - Acesso: https://console.firebase.google.com
   - 1GB de storage GRATIS
   - Baixe credenciais JSON

---

## ✅ Status da Implementação

- ✅ Repositório criado
- ✅ Groq API configurada
- ⏳ Backend completo (em desenvolvimento)
- ⏳ Frontend completo (em desenvolvimento)
- ⏳ Deploy em Vercel/Firebase Hosting

---

## 📞 Dúvidas?

Tudo está documentado no repositório. Explore os arquivos!

**Repositório:** https://github.com/Taurinas83/TAURIAN
