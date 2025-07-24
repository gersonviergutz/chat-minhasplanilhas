# Chat MinhasPlanilhas - Documentação

## 📋 Visão Geral

O **Chat MinhasPlanilhas** é uma aplicação web moderna que simula uma interface de chat similar ao ChatGPT. A aplicação permite aos usuários criar múltiplas conversas, enviar mensagens e receber respostas através de um webhook configurado.

## 🚀 Tecnologias Utilizadas

### Frontend
- **React 18.3.1** - Biblioteca principal para construção da interface
- **TypeScript** - Tipagem estática para maior segurança no desenvolvimento
- **Vite** - Build tool e servidor de desenvolvimento
- **Tailwind CSS** - Framework CSS para estilização
- **shadcn/ui** - Biblioteca de componentes UI baseada em Radix UI

### Principais Dependências
- **@tanstack/react-query** - Gerenciamento de estado e cache de dados
- **react-router-dom** - Roteamento da aplicação
- **lucide-react** - Ícones SVG
- **date-fns** - Manipulação de datas
- **react-hook-form** - Gerenciamento de formulários
- **zod** - Validação de schemas

## 🏗️ Arquitetura do Projeto

```
src/
├── components/           # Componentes reutilizáveis
│   ├── ui/              # Componentes base do shadcn/ui
│   ├── ChatInterface.tsx # Interface principal do chat
│   ├── ChatInput.tsx    # Campo de entrada de mensagens
│   ├── ChatMessage.tsx  # Componente de mensagem individual
│   └── ChatSidebar.tsx  # Barra lateral com conversas
├── hooks/               # Hooks customizados
├── lib/                 # Utilitários e configurações
├── pages/               # Páginas da aplicação
│   ├── Index.tsx        # Página principal
│   └── NotFound.tsx     # Página 404
└── App.tsx              # Componente raiz
```

## 🔧 Funcionalidades

### 1. Gerenciamento de Conversas
- ✅ Criar novas conversas
- ✅ Listar conversas existentes
- ✅ Alternar entre conversas
- ✅ Histórico de mensagens por conversa

### 2. Interface de Chat
- ✅ Envio de mensagens em tempo real
- ✅ Indicador de carregamento ("digitando...")
- ✅ Scroll automático para novas mensagens
- ✅ Suporte a quebras de linha (Shift + Enter)
- ✅ Timestamps das mensagens

### 3. Integração com Webhook
- ✅ Envio de mensagens para webhook externo
- ✅ Processamento de respostas JSON
- ✅ Tratamento de erros de conexão
- ✅ Notificações de sucesso/erro

## 🔌 Integração com Webhook

A aplicação está configurada para enviar mensagens para o webhook:
```
https://webhook.minhasplanilhas.com.br/webhook/c473fbb7-2b77-41d4-933f-1faffd9c7d3f
```

### Formato de Envio
```json
{
  "message": "Mensagem do usuário",
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

### Formato de Resposta Esperado
```json
[
  {
    "output": "Resposta do assistente"
  }
]
```

Ou:
```json
{
  "output": "Resposta do assistente"
}
```

## 🎨 Design System

A aplicação utiliza um sistema de design customizado baseado em variáveis CSS:

### Cores Principais
- **Background**: Branco (#FFFFFF)
- **Foreground**: Azul escuro (#1e293b)
- **Chat Background**: Cinza claro (#f8fafc)
- **Primary**: Azul (#3b82f6)
- **Secondary**: Cinza (#64748b)

### Componentes UI
- Todos os componentes seguem o padrão shadcn/ui
- Suporte a modo escuro (configurado mas não implementado)
- Animações suaves com `transition-smooth`
- Design responsivo com Tailwind CSS

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+ ou Bun
- npm, yarn ou bun

### Instalação
```bash
# Instalar dependências
npm install
# ou
bun install

# Executar em modo desenvolvimento
npm run dev
# ou
bun dev

# Build para produção
npm run build
# ou
bun run build
```

### Scripts Disponíveis
- `dev` - Inicia servidor de desenvolvimento
- `build` - Gera build de produção
- `build:dev` - Gera build de desenvolvimento
- `lint` - Executa linting do código
- `preview` - Visualiza build de produção

## 📁 Estrutura de Dados

### Interface Message
```typescript
interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}
```

### Interface Conversation
```typescript
interface Conversation {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: Date;
  messages: Message[];
}
```

## 🔄 Fluxo de Funcionamento

1. **Inicialização**: A aplicação carrega com uma conversa padrão
2. **Nova Conversa**: Usuário pode criar novas conversas via sidebar
3. **Envio de Mensagem**: 
   - Mensagem é adicionada imediatamente à interface
   - Indicador de carregamento é exibido
   - Requisição é enviada ao webhook
   - Resposta é processada e exibida
4. **Gerenciamento de Estado**: Todas as conversas são mantidas em estado local

## 🛠️ Configurações

### Vite Config
- Servidor configurado para porta 8080
- Suporte a SWC para compilação rápida
- Aliases configurados para imports limpos

### TypeScript
- Configuração estrita desabilitada para flexibilidade
- Suporte a JSX e imports de extensões TS
- Target ES2020 para compatibilidade moderna

### Tailwind CSS
- Configuração customizada com variáveis CSS
- Suporte a animações personalizadas
- Design system integrado

## 🔮 Possíveis Melhorias

- [ ] Persistência de dados (localStorage/IndexedDB)
- [ ] Autenticação de usuários
- [ ] Modo escuro funcional
- [ ] Upload de arquivos
- [ ] Markdown rendering nas mensagens
- [ ] Busca em conversas
- [ ] Exportação de conversas
- [ ] Configurações de webhook personalizáveis
- [ ] Suporte a múltiplos idiomas
- [ ] PWA (Progressive Web App)

## 📝 Notas de Desenvolvimento

- O projeto utiliza ESLint para linting com configurações modernas
- Componentes seguem padrões de composição do React
- Estado é gerenciado localmente sem bibliotecas externas
- Tratamento de erros implementado para requisições HTTP
- Interface responsiva para diferentes tamanhos de tela

---

**Desenvolvido com ❤️ usando React + TypeScript + Vite**