# Sistema Especializado em Livros Infantis para Amazon KDP

## Visão Geral

Este documento descreve um sistema especializado para criação automatizada de livros infantis para Amazon KDP, focando em livros de baixo/alto conteúdo (no/low-content) como livros de colorir, activity books e picture books ilustrados. O sistema utiliza inteligência artificial para gerar textos, imagens consistentes e layouts prontos para impressão.

## Escopo do Sistema

### Tipos de Livros Suportados
1. **Picture books**: 10–20 páginas, 1 cena ilustrada + 1–3 frases por página
2. **Livros de colorir**: 30–50 páginas, apenas imagens line art
3. **Activity books simples**: 20–40 páginas, mazes, "spot the difference", "I-spy"

### Saída
- PDF prontos para impressão (8.5x8.5 ou 8.5x11, 300 DPI, preto e branco ou colorido)
- Arquivo de capa separado (frente + lombada + verso, KDP)
- Metadados para publicação (título, descrição, keywords, categorias)

### Público Alvo
- Idades: 3–5, 4–8, 8–10 (selecionável)

## Fluxo Principal do Usuário

1. **Escolher tipo de livro**:
   - História ilustrada
   - Livro de colorir
   - Activity book

2. **Configurar projeto**:
   - Idioma: PT/EN
   - Idade alvo
   - Tema: ex. "dinossauros", "unicórnios", "emoções", "espaço"
   - Número de páginas (ex.: 24, 32, 40)

3. **Gerar conteúdo**:
   - História: gerar outline + texto por página
   - Colorir: gerar lista de cenas (1 prompt por página)
   - Activity: gerar lista de atividades com instruções

4. **Gerar imagens**:
   - 1 imagem por página (mesmo estilo/personagem)
   - Opção de regenerar página específica

5. **Layout e preview**:
   - Visualização página a página
   - Ajustar texto, trocar imagem, reordenar páginas

6. **Exportar para KDP**:
   - PDF interior + PDF capa
   - Sugestão de título, subtítulo, sinopse, keywords, categorias

## Arquitetura Funcional (Módulos)

### Módulo A – Assistente de Projeto Infantil
**Campos:**
- Tipo de livro
- Idade alvo
- Tema
- Tom: "fofo", "engraçado", "educativo", "emocional"

**IA (prompt base):**

**História infantil:**
```
Crie um outline de [num_páginas] páginas para um livro infantil ilustrado sobre [tema], para crianças de [idade], tom [tom]. Cada página deve ter: (1) uma frase curta (máx. 25 palavras) e (2) uma descrição visual da cena para o ilustrador.
```

**Livro de colorir:**
```
Liste [num_páginas] ideias de páginas de livro de colorir infantil sobre [tema], idade [idade]. Cada item com: (1) nome da cena, (2) descrição detalhada da linha do desenho, sem sombras, fundo simples.
```

**Activity book:**
```
Gere [num_páginas] atividades infantis sobre [tema], idade [idade], alternando entre: labirinto, ache as diferenças, encontre objetos, caça-palavras simples. Para cada página, descreva o que deve haver na ilustração e a instrução para a criança.
```

### Módulo B – Gerador de Texto por Página (história)
Para cada página do outline:
- Campo texto (editável)
- Botão "Reescrever em linguagem infantil (idade X)":
  - Prompt: "Reescreva esta frase para uma criança de [idade], vocabulário simples, tom [tom], máximo 25 palavras: [texto]."

### Módulo C – Gerador de Imagens Consistentes
**Parâmetros globais:**
- Estilo: cartoon, aquarela, 3D simples, line art (colorir)
- Personagens principais (nome, aparência)
- Fundo (simples vs detalhado)

**Prompt base:**

**História ilustrada (colorido):**
```
Ilustração de livro infantil, [descrição visual], personagem principal [descrição], estilo [estilo], cores suaves, enquadramento para página 8.5x8.5, alta resolução.
```

**Livro de colorir (PB):**
```
Desenho para livro de colorir infantil, [descrição visual], traço limpo em preto, sem tons de cinza, fundo simples, estilo line art, sem sombras, alta resolução.
```

O sistema deve:
- Salvar "seed de estilo" do projeto para manter consistência
- Permitir ir página a página e trocar só a imagem daquela página

### Módulo D – Montador de Livro (Layout)
**Configurações:**
- Tamanho de página: 8.5x8.5 (padrão kids) ou 8.5x11
- Margens internas seguras para KDP
- Fonte e tamanho (ex.: 24–32 pt)

**Regras:**
- Página de rosto (título, autor)
- Opcional: página de direitos autorais (modelo fixo)
- Histórias: 1 imagem + texto abaixo ou em caixa
- Colorir: imagem ocupa quase toda página, sem texto
- Activities: imagem + instrução curta

**Preview:**
- Navegação page-flip simples
- Indicação do número total de páginas

### Módulo E – Exportação KDP
**Saídas:**

**PDF interior:**
- CMYK ou RGB (conforme sua decisão inicial)
- 300 DPI
- Páginas ímpares/par alinhadas

**PDF capa:**
- Input: número de páginas, tipo de papel, tamanho, moeda/preço
- Cálculo da lombada
- Layout: frente com ilustração, lombada com título, verso com sinopse simples

**Gerar também:**
- Título sugerido
- Subtítulo
- Descrição/sinopse (para a página da Amazon)
- 7 keywords
- Sugestão de 2–3 categorias (em estrutura KDP/BR)

## Estrutura de Telas (versão PWA)

### Tela "Novo Livro Infantil"
- Tipo de livro (3 cards)
- Idade alvo (chips: 3–5, 4–8, 8–10)
- Tema + tom
- Botão "Gerar Estrutura"

### Tela "Roteiro & Páginas"
- Lista de páginas com:
  - Nome da cena/atividade
  - Texto (história) ou instrução
  - Botão "Gerar/Reescrever"

### Tela "Imagens"
- Grade de páginas
- Clicar abre página:
  - Preview da imagem
  - Botão "Gerar imagem" ou "Regenerar"
  - Campo "ajuste de prompt" rápido

### Tela "Preview do Livro"
- Simulação página a página
- Botões:
  - "Editar texto"
  - "Trocar imagem"

### Tela "Exportar para KDP"
- Escolher tamanho (8.5x8.5 / 8.5x11)
- Quantidade final de páginas
- Gerar: PDF interior, PDF capa
- Mostrar também: título, descrição, keywords para copy/paste

## Especializações que Diferenciam o Sistema

### Check de adequação infantil:
- Pipeline extra de IA para checar se o texto evita temas inadequados (violência, palavras difíceis)

### Sugestão de moral/tema educativo:
- Campo "moral desejada" (amizade, coragem, diversidade)

### Templates prontos de nicho:
- "Livro de colorir dinossauros 4–8 anos"
- "História sobre emoções, 3–5 anos"
- "Caderno de atividades espaço, 6–8 anos"

## Etapa 1 – Fundamentos Comuns (para os 3 tipos)

### 1.1 Entidades principais (coleções no Antigravity)
#### projects
- id
- type ("story", "coloring", "activity")
- language ("pt-BR", "en-US")
- age_range ("3-5", "4-8", "8-10")
- theme (texto livre)
- tone ("fofo", "engraçado", "educativo")
- trim_size ("8.5x8.5", "8.5x11")
- page_count (int, >=24)
- status ("draft", "in_progress", "ready")

#### pages
- id
- project_id
- page_number
- type ("story", "coloring", "activity", "extra")
- text (texto curto ou instrução)
- image_prompt
- image_url

#### kdp_meta
- project_id
- title
- subtitle
- description
- keywords[]
- categories[]

### 1.2 Telas base (PWA)
- Tela 1 – Dashboard / Novo Projeto infantil
- Tela 2 – Editor de páginas
- Tela 3 – Gerador de imagens
- Tela 4 – Preview & Layout
- Tela 5 – Exportar para KDP (PDF + capa + metadados)

## Etapa 2 – Tipo 1: História ilustrada (Picture Book)

Foco: 24–32 páginas, 1 imagem + 1–3 frases por página, tamanho 8.5x8.5 (padrão).

### 2.1 Tela "Novo Livro de História"
**Componentes:**
- Select type = story
- Select age_range
- Input theme (ex.: "dinossauro que tem medo do escuro")
- Select tone (fofo/engraçado/educativo)
- Slider page_count (24–32)

**Ação Antigravity action_generate_story_outline:**
- Chamada IA com prompt base:
```
Crie um outline para um livro infantil ilustrado com [page_count] páginas sobre [theme], para crianças de [age_range], tom [tone].
Para cada página, retorne:
short_text: frase simples, máx. 25 palavras.
visual_description: descrição da cena para a ilustração.
```

- Resultado: popular coleção pages (page 1..N) com short_text e image_prompt = visual_description.

### 2.2 Tela "Editor de História por Página"
**Componentes:**
- Lista lateral de páginas (1..N)
- Editor de texto para short_text
- Campo editável para image_prompt
- Botão "Simplificar para idade X":
  - Ação IA: reescreve short_text para vocabulário da faixa etária

### 2.3 Tela "Imagens – História"
**Componentes:**
- Grid de páginas com miniaturas
- Ao clicar:
  - Mostra image_prompt
  - Botão "Gerar imagem":
    - IA imagem (Recraft/Pixelcut/Midjourney/etc) com prompt:
```
Ilustração para livro infantil 8.5x8.5, [image_prompt], estilo cartoon, cores suaves, 300 DPI, aspecto 1:1.
```
- Armazena image_url em pages

## Etapa 3 – Tipo 2: Livro de Colorir Infantil

Foco: 40–60 páginas, 8.5x11, imagens line art sem cinza.

### 3.1 Tela "Novo Livro de Colorir"
**Componentes:**
- Select type = coloring
- age_range (2–4, 4–6, 6–8)
- theme (ex.: "animais da fazenda")
- Slider page_count (40–60)

**Ação action_generate_coloring_outline:**
- Prompt IA:
```
Liste [page_count] ideias de páginas de livro de colorir infantil sobre [theme] para crianças de [age_range].
Para cada página, retorne:
title: nome curto da cena.
visual_description: descrição detalhada de um desenho de contorno (line art), sem sombras, fundo simples.
```

- Popular pages (type = coloring, text = title, image_prompt = visual_description)

### 3.2 Tela "Imagens – Colorir"
**Componentes:**
- Lista de páginas
- Ao abrir página:
  - Mostrar image_prompt
  - Botão "Gerar imagem PB (line art)":
    - Prompt imagem:
```
Desenho para livro de colorir infantil 8.5x11, [image_prompt], traços pretos, sem cinza, fundo simples, estilo line art, 300 DPI.
```
- Salva image_url

## Etapa 4 – Tipo 3: Activity Book Infantil

Foco: 60–100 páginas 8.5x11 com mix de atividades.

### 4.1 Tela "Novo Activity Book"
**Componentes:**
- Select type = activity
- age_range (2–4, 4–6, 6–8, 8–12)
- theme (ex.: "espaço", "dinossauros")
- Slider page_count (60–100)

**Ação action_generate_activity_outline:**
- Prompt IA:
```
Crie [page_count] ideias de páginas para um activity book infantil sobre [theme], idade [age_range].
Alterne entre: coloring, mazes, spot-the-difference, I-spy, tracing, simples word search (conforme idade).

Para cada página, retorne:
activity_type (coloring, maze, etc.)
instruction_text (para a criança).
visual_description (para gerar a ilustração ou grade).
```

- Salva em pages com type = activity, text = instruction_text, image_prompt = visual_description

### 4.2 Tela "Editor de Atividades"
**Componentes:**
- Lista de páginas com activity_type
- Editor para instruction_text
- Botão "Simplificar instrução para idade X"

### 4.3 Tela "Imagens – Atividades"
Para cada activity_type, use template específico:
- Maze: gera base com ferramenta própria (pode ser lib ou IA específica)
- Word search: gerar grade via IA + renderizar com componente
- Coloring/Spot-the-difference/I-spy: usar IA imagem com prompt adaptado

## Etapa 5 – Layout, Preview e Export KDP (comum aos 3)

### 5.1 Tela "Preview"
- Seleciona trim_size:
  - Picture: 8.5x8.5
  - Colorir/Activity: 8.5x11
- Calcula:
  - Mín. páginas 24 para paperback
  - Mostra páginas em ordem:
    - Página de rosto (auto)
    - páginas de conteúdo
    - Extras (perguntas, colorir bônus) se precisar aumentar page count

### 5.2 Exportar PDF Interior
**Ação action_export_pdf:**
- Itera pages ordenadas
- Monta PDF:
  - Story: imagem topo + texto em fonte 24–32pt
  - Colorir: imagem full page
  - Activity: imagem + instrução
- Gera PDF 300 DPI com bleed configurado conforme KDP

## Etapa 6 – Módulo de Otimização para KDP (metadados)

### 6.1 Tela "KDP Metadata"
**Campos (ligados à coleção kdp_meta):**
- Título
- Subtítulo
- Descrição
- Keywords (7 campos)
- Categorias (até 3)

**Ação action_generate_kdp_meta:**
- Prompt IA:
```
Com base neste livro infantil:
tipo: [type]
idade: [age_range]
tema: [theme]
resumo das páginas: [concat de textos]
Gere:
Um título chamativo.
Um subtítulo opcional.
Uma descrição em PT-BR (máx. 4000 caracteres) com foco em benefícios para pais e crianças.
7 palavras-chave otimizadas para buscas na Amazon.
Sugestão de 3 categorias KDP (ex.: Livros infantis > Animais).
```

## Etapa 7 – Etapas de Implementação no Antigravity (Roadmap)

### Semana 1 – Core
- Criar coleções projects, pages, kdp_meta
- Tela "Novo Projeto Infantil" + lógica de criação de project
- Integração IA para action_generate_story_outline (tipo story)

### Semana 2 – História ilustrada completa
- Editor de páginas (texto)
- Tela de imagens (história) + integração IA imagens 1:1
- Preview básico e export PDF 8.5x8.5

### Semana 3 – Livro de colorir
- Fluxo type = coloring
- Outline + geração de imagens line art 8.5x11
- Export PDF interior PB

### Semana 4 – Activity book
- Outline atividades + tipos
- Templates por activity_type
- Preview e export adaptados

### Semana 5 – Módulo KDP & refinamentos
- Tela de metadados KDP + ação IA
- Ajustes de trim size, bleed e margens conforme docs KDP
- Testar arquivos no KDP Previewer

## Nichos Mais Vendáveis KDP Infantil (2026)

| Nicho | Exemplo Sub-nicho | Demanda (BSR Médio) | Competição | Royalties Estimado |
|-------|-------------------|---------------------|------------|-------------------|
| Livros de Colorir | Animais oceano, dinossauros, Natal | <5k | Média | $500–2k/mês |
| Activity Books | Spot difference, mazes, dot-to-dot (4–8 anos) | <3k | Baixa | $1k+/dia top |
| Puzzle Books | Word search zoológico, sudoku kids, I-spy | <10k | Média | $300–1k/mês |
| Picture Books | Histórias personalizadas (fadas, Oxford-style) | <8k | Alta | $700/mês |
| Workbooks Educacionais | Letras/números pré-escola, sight words | <4k | Baixa | $400/mês |

## Melhores Ferramentas IA Especializadas

| Ferramenta | Foco | Preço | Vantagens KDP | Limitações |
|------------|------|-------|---------------|------------|
| LitPal.ai | Storybooks ilustrados completos (5min) | $25/mês (25% off) | Gera full book + formato KDP; $7k royalties reportados | Inglês principal |
| BooksGenie.ai | Colorir, puzzles, stories kids | Free trial + $19/mês | 100% rights comerciais; niches testados (crossword, maze) | Foco low-content |
| Leonardo.ai | Imagens colorir/ilustrações (prompts kids) | Free (tokens pagos) | Black/white outlines; estilos cartoon | Precisa Canva para layout |
| Recraft.ai / Pixelcut | Ilustrações storybooks | Free | Consistente characters; high-res PNG para print | Sem texto auto |
| Midjourney + ChatGPT | Histórias + arte custom | $10/mês | Séries Oxford-like; animações Hailuo | Curva prompts |

**Stack Vencedor Reportado:** ChatGPT (história) + Leonardo/Midjourney (imgs) + Canva (layout KDP) + KDP Cover Calculator

## Dicas KDP
- Tamanhos 8.5x8.5" ou 8.5x11", 24–48p, capa colorida
- Evitar plágio IA (use detecção como Smodin)