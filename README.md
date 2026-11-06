# AsianCult 🎬

Dashboard sobre cinema asiático (Coreia do Sul, Japão, China e Tailândia) com gráficos interativos e um diário pessoal de filmes assistidos.

Projeto **A02 — Dashboard com HTML, CSS e JS** · Unicap · Sistemas para Internet  

- 🌐 **Site publicado:** [# AsianCult 🎬

Dashboard sobre cinema asiático (Coreia do Sul, Japão, China e Tailândia) com gráficos interativos e um diário pessoal de filmes assistidos.

Projeto **A02 — Dashboard com HTML, CSS e JS** · Unicap · Sistemas para Internet  

- 🌐 **Site publicado:** []

---

## 📌 Sobre o Projeto

O **AsianCult** reúne duas partes que conversam entre si:

1. **Panorama (Dashboard):** três gráficos construídos com **Chart.js** a partir de um `dados.json` curado, acompanhados de filtro por país.
2. **Diário (CRUD):** o usuário busca um filme na API do **TMDB**, o formulário é preenchido automaticamente com título, ano, país sugerido e pôster, permitindo registrar a própria nota e comentário. Os registros são salvos no **Back4App**.

O tema visual é *dark/neon* com um *glassmorphism*.

---

## 🎯 Requisitos da Atividade

| Requisito | Como foi atendido |
| :--- | :--- |
| **Dashboard com 3 gráficos (2+ tipos)** | Barras (filmes por país), linha (filmes por década) e rosca (filmes por gênero), construídos com Chart.js e alimentados por `dados.json`. |
| **Interatividade em JS** | Seletor de país que atualiza em tempo real os gráficos de década e gênero. |
| **CRUD com back-end** | Criar, listar, editar e excluir filmes do diário, integrado ao Back4App (Parse REST API). |
| **API pública** | Consumo da API do TMDB (com suporte a CORS): busca de filmes por título e preenchimento automático do formulário. |
| **CSS responsivo** | Layout responsivo construído em Grid/Flexbox, com menu hambúrguer para dispositivos móveis (testado de 360px até desktop). |

---

## ⚙️ Funcionalidades

### Dashboard
- **País (barras):** Panorama completo da distribuição do conjunto de dados.
- **Década (linha):** Décadas sem filmes aparecem com valor zero, garantindo a integridade visual da linha de tendência temporal.
- **Gênero (rosca):** Distribuição por gênero principal de cada filme.
- **Filtro por país:** Atualiza dinamicamente os gráficos de gênero e década. O eixo das décadas é mantido fixo, calculado com base na lista completa.

### Diário
- **Listar:** Exibição de cards com pôster ao fundo, país, ano, nota e comentário.
- **Criar e Editar:** Um único formulário atende ambas as operações (um campo oculto armazena o `objectId` durante a edição).
- **Excluir:** Ação de remoção com confirmação prévia antes de apagar o registro.
- **Busca no TMDB:** Sugere o país a partir do idioma original do filme (`ko`, `ja`, `zh`/`cn`, `th`). A nota e o comentário são sempre personalizados pelo usuário.

### Interface
- Navbar fixa com destaque para o link da seção visível e menu hambúrguer para telas menores.
- Painéis com efeito de vidro (*glassmorphism*), brilho neon e animações discretas que respeitam a preferência de acessibilidade (`prefers-reduced-motion`).

---

## 🛠️ Tecnologias Utilizadas

- **HTML5**, **CSS3** (Variáveis, CSS Grid, Flexbox) e **JavaScript (Vanilla / ES Modules)**
- **Chart.js 4.4.7** (via CDN)
- **Back4App** (Banco de dados e API REST via Parse)
- **TMDB API** (API Pública de Terceiros)
- **Google Fonts** (*Bebas Neue* e *DM Sans*)

---

## 📁 Estrutura do Projeto

```text
/
├── index.html
├── dados.json            # Dados dos gráficos (filmes curados)
├── css/
│   ├── variaveis.css     # Paleta, fontes e espaçamentos
│   └── style.css         # Layout e componentes
├── js/
│   ├── main.js           # Dashboard: dados, gráficos, filtro e navbar
│   ├── graficos.js       # Criação e atualização dos gráficos (Chart.js)
│   ├── diario.js         # Tela do diário: lista, formulário e busca
│   ├── crud.js           # Comunicação REST com o Back4App
│   ├── tmdb.js           # Comunicação com a API do TMDB
│   └── config.js         # Chaves e credenciais de acesso às APIs
└── README.md

```

*Separação de responsabilidades:* `crud.js` e `tmdb.js` tratam apenas requisições de rede; `diario.js` e `graficos.js` gerenciam o DOM e visualizações; `main.js` orquestra a execução.

---

## 📊 Dados dos Gráficos

O arquivo `dados.json` foi montado a partir de um conjunto de dados do Kaggle, filtrado para produções da **Coreia do Sul**, **Japão**, **China** (incluindo Hong Kong e Taiwan) e **Tailândia**. Os campos foram padronizados com quatro países fixos e um gênero principal por filme.

**Exemplo do formato JSON:**

```json
{
  "id": 1,
  "titulo": "Oldboy",
  "pais": "Coreia do Sul",
  "ano": 2003,
  "genero": "Ação",
  "nota": 8.3
}

```

---

## 🗄️ Estrutura do Back4App

Classe: **`Filme`**

| Coluna | Tipo |
| --- | --- |
| `titulo` | String |
| `pais` | String |
| `ano` | Number |
| `nota` | Number |
| `comentario` | String |
| `poster` | String |

---

## 🚀 Como Executar Localmente

1. **Clonar o repositório:**
```bash
git clone [https://github.com/gabrielliweb/dashboard-asiancult.git](https://github.com/gabrielliweb/dashboard-asiancult.git)

```


2. **Configurar as credenciais de API:**
Crie o arquivo `js/config.js` na raiz da pasta `js/` com a seguinte estrutura:
```javascript
export const APP_ID = "SEU_APPLICATION_ID";
export const REST_KEY = "SUA_REST_API_KEY";
export const URL_BASE = "[https://parseapi.back4app.com/classes/Filme](https://parseapi.back4app.com/classes/Filme)";
export const TMDB_KEY = "SUA_CHAVE_V3_DO_TMDB";

```


3. **Executar em um servidor local:**
Abra o projeto utilizando um servidor local (ex: extensão **Live Server** no VS Code).
*Nota: Abrir o `index.html` diretamente via arquivo local (`file://`) não funcionará devido às restrições do navegador para Módulos ES e requisições `fetch`.*

---

## 💡 Decisões Técnicas

* **Dados brutos no JSON, agregação no JS:** O `dados.json` armazena um filme por registro e as contagens são calculadas dinamicamente via JavaScript, permitindo o recalculo em tempo de execução ao aplicar filtros.
* **Reutilização de instâncias no Chart.js:** As instâncias dos gráficos são mantidas na memória e atualizadas via método `.update()`, evitando o erro de recriar instâncias sobre o mesmo elemento `<canvas>`.

---

## ⚠️ Limitações Conhecidas

* Os gráficos utilizam o conjunto estático de `dados.json` e são independentes dos registros dinâmicos salvos no diário via Back4App.
* O país sugerido na busca via TMDB é inferido a partir do idioma original da obra, podendo necessitar de ajuste manual do usuário.

---

## 📜 Créditos e Atribuição

* **Busca de dados e pôsteres:** *This product uses the TMDB API but is not endorsed or certified by TMDB.*
* **Tipografia:** Google Fonts (*Bebas Neue* e *DM Sans*).
* **Biblioteca de Gráficos:** Chart.js.

---

## ✒️ Autoria

**Ana Gabrielli** — [@gabrielliweb](https://github.com/gabrielliweb)]

---

## 📌 Sobre o Projeto

O **AsianCult** reúne duas partes que conversam entre si:

1. **Panorama (Dashboard):** três gráficos construídos com **Chart.js** a partir de um `dados.json` curado, acompanhados de filtro por país.
2. **Diário (CRUD):** o usuário busca um filme na API do **TMDB**, o formulário é preenchido automaticamente com título, ano, país sugerido e pôster, permitindo registrar a própria nota e comentário. Os registros são salvos no **Back4App**.

O tema visual é *dark/neon* com um *glassmorphism*.

---

## 🎯 Requisitos da Atividade

| Requisito | Como foi atendido |
| :--- | :--- |
| **Dashboard com 3 gráficos (2+ tipos)** | Barras (filmes por país), linha (filmes por década) e rosca (filmes por gênero), construídos com Chart.js e alimentados por `dados.json`. |
| **Interatividade em JS** | Seletor de país que atualiza em tempo real os gráficos de década e gênero. |
| **CRUD com back-end** | Criar, listar, editar e excluir filmes do diário, integrado ao Back4App (Parse REST API). |
| **API pública** | Consumo da API do TMDB (com suporte a CORS): busca de filmes por título e preenchimento automático do formulário. |
| **CSS responsivo** | Layout responsivo construído em Grid/Flexbox, com menu hambúrguer para dispositivos móveis (testado de 360px até desktop). |

---

## ⚙️ Funcionalidades

### Dashboard
- **País (barras):** Panorama completo da distribuição do conjunto de dados.
- **Década (linha):** Décadas sem filmes aparecem com valor zero, garantindo a integridade visual da linha de tendência temporal.
- **Gênero (rosca):** Distribuição por gênero principal de cada filme.
- **Filtro por país:** Atualiza dinamicamente os gráficos de gênero e década. O eixo das décadas é mantido fixo, calculado com base na lista completa.

### Diário
- **Listar:** Exibição de cards com pôster ao fundo, país, ano, nota e comentário.
- **Criar e Editar:** Um único formulário atende ambas as operações (um campo oculto armazena o `objectId` durante a edição).
- **Excluir:** Ação de remoção com confirmação prévia antes de apagar o registro.
- **Busca no TMDB:** Sugere o país a partir do idioma original do filme (`ko`, `ja`, `zh`/`cn`, `th`). A nota e o comentário são sempre personalizados pelo usuário.

### Interface
- Navbar fixa com destaque para o link da seção visível e menu hambúrguer para telas menores.
- Painéis com efeito de vidro (*glassmorphism*), brilho neon e animações discretas que respeitam a preferência de acessibilidade (`prefers-reduced-motion`).

---

## 🛠️ Tecnologias Utilizadas

- **HTML5**, **CSS3** (Variáveis, CSS Grid, Flexbox) e **JavaScript (Vanilla / ES Modules)**
- **Chart.js 4.4.7** (via CDN)
- **Back4App** (Banco de dados e API REST via Parse)
- **TMDB API** (API Pública de Terceiros)
- **Google Fonts** (*Bebas Neue* e *DM Sans*)

---

## 📁 Estrutura do Projeto

```text
/
├── index.html
├── dados.json            # Dados dos gráficos (filmes curados)
├── css/
│   ├── variaveis.css     # Paleta, fontes e espaçamentos
│   └── style.css         # Layout e componentes
├── js/
│   ├── main.js           # Dashboard: dados, gráficos, filtro e navbar
│   ├── graficos.js       # Criação e atualização dos gráficos (Chart.js)
│   ├── diario.js         # Tela do diário: lista, formulário e busca
│   ├── crud.js           # Comunicação REST com o Back4App
│   ├── tmdb.js           # Comunicação com a API do TMDB
│   └── config.js         # Chaves e credenciais de acesso às APIs
└── README.md

```

*Separação de responsabilidades:* `crud.js` e `tmdb.js` tratam apenas requisições de rede; `diario.js` e `graficos.js` gerenciam o DOM e visualizações; `main.js` orquestra a execução.

---

## 📊 Dados dos Gráficos

O arquivo `dados.json` foi montado a partir de um conjunto de dados do Kaggle, filtrado para produções da **Coreia do Sul**, **Japão**, **China** (incluindo Hong Kong e Taiwan) e **Tailândia**. Os campos foram padronizados com quatro países fixos e um gênero principal por filme.

**Exemplo do formato JSON:**

```json
{
  "id": 1,
  "titulo": "Oldboy",
  "pais": "Coreia do Sul",
  "ano": 2003,
  "genero": "Ação",
  "nota": 8.3
}

```

---

## 🗄️ Estrutura do Back4App

Classe: **`Filme`**

| Coluna | Tipo |
| --- | --- |
| `titulo` | String |
| `pais` | String |
| `ano` | Number |
| `nota` | Number |
| `comentario` | String |
| `poster` | String |

---

## 🚀 Como Executar Localmente

1. **Clonar o repositório:**
```bash
git clone [https://github.com/gabrielliweb/dashboard-asiancult.git](https://github.com/gabrielliweb/dashboard-asiancult.git)

```


2. **Configurar as credenciais de API:**
Crie o arquivo `js/config.js` na raiz da pasta `js/` com a seguinte estrutura:
```javascript
export const APP_ID = "SEU_APPLICATION_ID";
export const REST_KEY = "SUA_REST_API_KEY";
export const URL_BASE = "[https://parseapi.back4app.com/classes/Filme](https://parseapi.back4app.com/classes/Filme)";
export const TMDB_KEY = "SUA_CHAVE_V3_DO_TMDB";

```


3. **Executar em um servidor local:**
Abra o projeto utilizando um servidor local (ex: extensão **Live Server** no VS Code).
*Nota: Abrir o `index.html` diretamente via arquivo local (`file://`) não funcionará devido às restrições do navegador para Módulos ES e requisições `fetch`.*

---

## 💡 Decisões Técnicas

* **Dados brutos no JSON, agregação no JS:** O `dados.json` armazena um filme por registro e as contagens são calculadas dinamicamente via JavaScript, permitindo o recalculo em tempo de execução ao aplicar filtros.
* **Reutilização de instâncias no Chart.js:** As instâncias dos gráficos são mantidas na memória e atualizadas via método `.update()`, evitando o erro de recriar instâncias sobre o mesmo elemento `<canvas>`.

---

## ⚠️ Limitações Conhecidas

* Os gráficos utilizam o conjunto estático de `dados.json` e são independentes dos registros dinâmicos salvos no diário via Back4App.
* O país sugerido na busca via TMDB é inferido a partir do idioma original da obra, podendo necessitar de ajuste manual do usuário.

---

## 📜 Créditos e Atribuição

* **Busca de dados e pôsteres:** *This product uses the TMDB API but is not endorsed or certified by TMDB.*
* **Tipografia:** Google Fonts (*Bebas Neue* e *DM Sans*).
* **Biblioteca de Gráficos:** Chart.js.

---

## ✒️ Autoria

**Ana Gabrielli** — [@gabrielliweb](https://github.com/gabrielliweb)