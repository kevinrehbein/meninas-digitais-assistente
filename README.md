# Assistente Meninas Digitais

Assistente acadêmico que responde perguntas sobre os artigos do **WIT — Women in
Information Technology** usando um grafo de agentes (LangGraph) com recuperação
GraphRAG sobre o Neo4j.

O projeto tem duas interfaces:

- **Web (atual)** — frontend Next.js + backend FastAPI, publicados juntos na Vercel.
- **Streamlit (legado)** — interface original em `src/app.py`, mantida para uso local.

---

## Arquitetura

```
meninas-digitais-v2/
├── src/                  # backend Python
│   ├── api/              # FastAPI (streaming SSE)
│   ├── agents/           # grafo LangGraph (supervisor, decompositor, pesquisador, redator, planejador, verificador)
│   ├── retrieval/        # busca híbrida (vetor + grafo) no Neo4j
│   ├── ingestion/        # carga e indexação dos artigos
│   ├── config.py         # configuração e variáveis de ambiente
│   └── app.py            # frontend Streamlit (legado)
├── web/                  # frontend Next.js 16 (App Router, Tailwind 4)
├── media/                # manual de identidade e logos (não vai para produção)
├── vercel.json           # Vercel Services: web + api
└── .vercelignore
```

### Fluxo de uma pergunta

1. O frontend envia `POST /api/chat` com `{ "question": "..." }`.
2. O backend responde com **Server-Sent Events**:
   - `meta` — versão do contrato e `request_id`;
   - `status` — etapas do agente (supervisor, pesquisa, redação, verificação…);
   - `final` — resposta em Markdown, fontes, plano (quando houver) e métricas;
   - `error` — falha com mensagem amigável e indicação de nova tentativa.
3. Cada pergunta é **independente**: não há memória entre mensagens.

O histórico recente fica apenas no `localStorage` do navegador.

---

## Rodando localmente

### 1. Backend (FastAPI)

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r src/requirements.txt   # dependências do backend
cp .env.example .env                  # preencha as variáveis (veja abaixo)

PYTHONPATH=src uvicorn api.main:app --port 8000 --reload
```

- API: <http://127.0.0.1:8000/api>
- Saúde: <http://127.0.0.1:8000/api/health>
- Documentação: <http://127.0.0.1:8000/api/docs>

### 2. Frontend (Next.js)

Requer Node.js 20+ (testado com Node 26).

```bash
cd web
npm install
npm run dev
```

Abra <http://localhost:3000>. Em desenvolvimento, o `next.config.ts` encaminha
`/api/*` para `http://127.0.0.1:8000` automaticamente.

Outros comandos:

```bash
npm run typecheck   # tsc --noEmit
npm run build       # build de produção
npm start           # servir o build
```

## Variáveis de ambiente

Crie um `.env` na raiz. O backend valida as chaves obrigatórias no início de cada
execução (`src/config.py`).

| Variável | Obrigatória | Uso |
| --- | --- | --- |
| `NEO4J_URI` | sim | conexão com o Neo4j (Aura ou local) |
| `NEO4J_USERNAME` | sim | usuário do Neo4j |
| `NEO4J_PASSWORD` | sim | senha do Neo4j |
| `EMBEDDING_SPACE` | sim | URL do Space de embeddings (Hugging Face) |
| `GOOGLE_API_KEY` | recomendada | provedor principal de LLM |
| `GROQ_API_KEY` | opcional | fallback de LLM |
| `OPENROUTER_API_KEY` | opcional | fallback de LLM |
| `ALLOWED_ORIGINS` | opcional | origens de CORS (padrão: `localhost:3000`) |
| `RATE_LIMIT_PER_MINUTE` | opcional | limite de perguntas por IP (padrão `20`) |
| `SSE_HEARTBEAT_SECONDS` | opcional | intervalo de heartbeat do SSE (padrão `12`) |
| `MAX_STREAM_SECONDS` | opcional | tempo máximo de uma resposta (padrão `280`) |
| `MAX_CONCURRENT_RUNS` | opcional | execuções simultâneas por instância (padrão `2`) |

No frontend, apenas:

| Variável | Uso |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | URL pública usada em metadados/Open Graph |

> **Segurança:** nenhuma chave de LLM ou do Neo4j é exposta ao navegador. O
> frontend conversa apenas com `/api/chat` no mesmo domínio.

---

## Deploy na Vercel

O projeto usa **Vercel Services** para publicar os dois serviços em um único
projeto e domínio:

- `web` → Next.js, com `root: "web/"`;
- `api` → FastAPI, com `root: "src/"` e `entrypoint: "api.main:app"`.

```bash
# na raiz do repositório
vercel link
vercel env add NEO4J_URI production
# ...adicione as demais variáveis de backend
vercel env add NEXT_PUBLIC_SITE_URL production

vercel deploy --prod
```

Configuração principal em [`vercel.json`](./vercel.json):

- rewrite de `/api/(.*)` para o serviço `api`;
- rewrite de `/(.*)` para o serviço `web`;
- função da API com `maxDuration: 300` e `memory: 1024`.

O backend precisa de um runtime Python 3.12 (definido em `src/.python-version`),
e as dependências ficam em `src/requirements.txt`.

---

## Qualidade

```bash
# Python (a partir da raiz)
pytest
ruff check src tests

# Frontend
cd web && npm run typecheck && npm run build
```

---

## Identidade visual

As cores, a tapeçaria e o logo seguem o **Manual de Identidade Visual do Programa
Meninas Digitais — versão 2.0**. O logo vetorial foi extraído do EPS original em
`media/` e otimizado em `web/public/brand/logo-md.svg`. A tipografia web usa
Poppins e Pathway Gothic One como adaptações das fontes institucionais.

O projeto é acadêmico e não representa uma posição oficial do Programa Meninas
Digitais ou da SBC.
