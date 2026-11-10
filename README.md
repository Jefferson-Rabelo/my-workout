# 💪 My Workout

**My Workout** é um aplicativo pessoal para organização e gerenciamento de treinos, desenvolvido para facilitar o acompanhamento dos exercícios e a montagem de rotinas de treinamento.

O projeto foi desenvolvido como uma aplicação web instalável (PWA), com interface responsiva, funcionamento offline e armazenamento local dos dados.

## ✨ Funcionalidades

- **Dashboard:** visão geral dos treinos e estatísticas.
- **Gerenciamento de treinos:** crie, edite e exclua seus treinos.
- **Gerenciamento de exercícios:** adicione, edite e remova exercícios dos seus treinos.
- **Biblioteca de exercícios:** catálogo com 50 exercícios organizados por grupos musculares.
- **Pesquisa e filtros:** encontre exercícios por nome, grupo muscular ou categoria.
- **Detalhes dos exercícios:** consulte instruções, músculos trabalhados, equipamentos e sugestões de séries e repetições.
- **Adição rápida:** adicione exercícios da biblioteca diretamente aos seus treinos.
- **Backup e restauração:** exporte seus dados em JSON e restaure-os quando necessário.
- **Temas personalizáveis:** escolha entre os temas verde-limão e rosa na seção Configurações. A preferência fica salva localmente neste navegador.
- **PWA:** instale o aplicativo no computador ou celular.
- **Funcionamento offline:** acesse o aplicativo mesmo sem conexão com a internet após o carregamento inicial.

## 🛠️ Tecnologias utilizadas

| Tecnologia      | Finalidade                             |
| --------------- | -------------------------------------- |
| React           | Construção da interface                |
| TypeScript      | Tipagem estática e segurança do código |
| Vite            | Ferramenta de desenvolvimento e build  |
| Tailwind CSS v4 | Estilização da interface               |
| Dexie.js        | Gerenciamento do IndexedDB             |
| IndexedDB       | Armazenamento local dos dados          |
| vite-plugin-pwa | Recursos de Progressive Web App        |
| Workbox         | Cache e funcionamento offline          |
| Lucide          | Ícones da interface                    |

## 🎨 Interface

O My Workout utiliza uma identidade visual moderna, com tema escuro, tons de grafite e duas opções de cores de destaque:

- **Verde-limão:** tema original do aplicativo.
- **Rosa:** alternativa personalizável.

A interface foi desenvolvida com foco em:

- Design responsivo.
- Experiência mobile-first.
- Navegação simples e intuitiva.
- Organização visual dos treinos.
- Facilidade de utilização em diferentes dispositivos.

## 💾 Armazenamento dos dados

Os dados dos treinos são armazenados localmente no navegador, utilizando IndexedDB com Dexie.js.

O projeto não utiliza:

- Backend.
- Banco de dados remoto.
- Sistema de login.
- Serviços pagos de infraestrutura.

**Importante:** os dados ficam armazenados no navegador e dispositivo utilizados. Para evitar perda de informações, recomenda-se realizar backups periódicos através da funcionalidade de exportação JSON.

A instalação do aplicativo em outro dispositivo não transfere automaticamente os dados existentes.

## 🚀 Como executar o projeto localmente

### Pré-requisitos

- [Node.js](https://nodejs.org/)
- npm

### 1. Clone o repositório

```bash
git clone https://github.com/Jefferson-Rabelo/my-workout.git
```

### 2. Entre na pasta do projeto

```bash
cd my-workout
```

### 3. Instale as dependências

```bash
npm install
```

### 4. Execute o ambiente de desenvolvimento

```bash
npm run dev
```

O Vite disponibilizará um endereço local no terminal, normalmente:

```text
http://localhost:5173/
```

Acesse esse endereço no navegador para utilizar o aplicativo.

## 📦 Build de produção

Para verificar a compilação do projeto:

```bash
npm run build
```

Os arquivos de produção serão gerados na pasta `dist/`.

Para visualizar a versão compilada localmente:

```bash
npm run preview
```

## 📱 Instalação como aplicativo

O My Workout utiliza a tecnologia PWA (Progressive Web App), permitindo sua instalação em dispositivos compatíveis.

- **Android:** acesse o aplicativo pelo navegador e utilize a opção de instalação.
- **iPhone:** abra o aplicativo pelo Safari, toque em Compartilhar e selecione "Adicionar à Tela de Início".
- **Desktop:** utilize a opção de instalação disponibilizada pelo navegador, quando compatível.

Após o primeiro carregamento bem-sucedido, os recursos armazenados em cache permitem utilizar o aplicativo offline.

## 🌐 Publicação

O projeto utiliza GitHub para versionamento do código e Vercel para hospedagem e publicação.

Cada atualização enviada para a branch `main` pode iniciar automaticamente uma nova implantação na Vercel.

## 🗺️ Melhorias futuras

O My Workout é um projeto em constante evolução. Novas funcionalidades e melhorias poderão ser implementadas conforme a necessidade de utilização.

Algumas possibilidades:

- Imagens ilustrativas dos exercícios.
- Melhorias na biblioteca de exercícios.
- Novos recursos de acompanhamento dos treinos.
- Aprimoramentos na experiência do usuário.

## 👨‍💻 Desenvolvedor

Desenvolvido por **Jefferson Rabelo**.

Projeto criado com o objetivo de aplicar conhecimentos em desenvolvimento web, explorar novas tecnologias e construir uma ferramenta prática para organização de treinos.

---

**My Workout — Organize seus treinos. Evolua no seu ritmo.** 💚💗
