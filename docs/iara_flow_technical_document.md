# Documento Técnico: Aplicação Iara Flow

## 1. Visão Geral da Aplicação

A aplicação Iara Flow é uma plataforma de prototipagem visual para agentes de IA, que permite aos usuários criar e gerenciar fluxos de trabalho complexos envolvendo diferentes funcionalidades de IA. O front-end, acessível via web, oferece uma interface intuitiva para a construção desses fluxos, enquanto o back-end (BFF - Backend for Frontend) provê a lógica de negócios e a integração com diversos serviços de IA e armazenamento de dados.

O objetivo principal da Iara Flow é simplificar o desenvolvimento e a experimentação com agentes de IA, oferecendo um ambiente visual para orquestrar tarefas como análise de sentimento, coleta de reviews, geração de backlog e interação com modelos de linguagem multi-provedor.

## 2. Análise do Front-end

O front-end da aplicação Iara Flow, disponível em http://iara-hub-flow.s3-website-us-east-1.amazonaws.com/, apresenta uma interface de usuário focada na criação e visualização de fluxos de agentes de IA. A interface é dividida em:

*   **Barra Lateral Esquerda:** Contém uma lista de agentes de IA pré-definidos e funcionalidades que podem ser arrastadas e soltas na área de trabalho, como "Chat Assistant", "OpenAI Assistant", "LangChain Agent", "Data Analyzer", "Info Retriever", "Content Generator", "Review Collector", "Sentiment Analyzer", "Backlog Generator" e "Memory Manager".
*   **Área de Trabalho Central:** É o canvas onde os usuários constroem seus fluxos, conectando diferentes agentes e funcionalidades. A imagem fornecida mostra um exemplo de fluxo com "Package Name", "Review Collector", "Sentiment Analyzer" e "Email Sender".
*   **Barra Superior:** Inclui opções para "Salvar", "Exportar", "Config" e "Executar" o fluxo, além de exibir o título "Iara Hub - Visual Prototyping".

A análise visual sugere que o front-end é construído com tecnologias modernas, provavelmente React (dada a estrutura do `package.json` analisado anteriormente), utilizando componentes de UI como Radix UI e Tailwind CSS para um design responsivo e funcional. A interação é baseada em arrastar e soltar, permitindo a criação de fluxos complexos de forma visual e intuitiva.

## 3. Análise da Documentação do BFF (Backend for Frontend)

A documentação da API Iara Flow, acessível no mesmo domínio do front-end, descreve o BFF como uma API poderosa para integração com agentes de IA, sistema de memória avançado e análise de dados. É construída com Flask e Python, atuando como uma camada intermediária entre o front-end e os serviços de backend.

### 3.1. Principais Funcionalidades do BFF:

*   **Chat Multi-Provedor:** Integração com Gemini, OpenAI, Groq e LangChain Agent para conversas inteligentes com memória persistente.
*   **Sistema de Memória V2:** Memória isolada por usuário com persistência de conversas e fatos, independente da sessão. Garante continuidade das conversas mesmo em diferentes dispositivos ou sessões.
    *   **Memória Persistente:** Conversas e fatos salvos por usuário, não por sessão.
    *   **Memória Global:** Extração automática de informações pessoais.
    *   **"Lembre-se disso":** Salvamento explícito de fatos importantes pelo usuário com palavras-chave inteligentes.
    *   **Multi-Provedor:** Funciona com Gemini, OpenAI, Groq e LangChain.
*   **Persistência Avançada:** Armazenamento seguro no SQLite com histórico de conversas e perfis de usuário.
*   **Análise de Reviews:** Coleta e análise de reviews de aplicativos com análise de sentimento avançada.
*   **Seguro e Confiável:** API robusta com autenticação, tratamento de erros e verificações de saúde integradas.
*   **Fácil Integração:** Endpoints RESTful simples e documentação completa para integração rápida.

### 3.2. Arquitetura do BFF:

*   **Frontend:** React, Vue, Angular ou qualquer cliente HTTP.
*   **Iara Flow BFF:** Flask + Python + Memória V2.
*   **Provedores IA:** Gemini, OpenAI, Groq, LangChain.
*   **Banco de Dados:** SQLite + Memória Persistente.

### 3.3. Novidades da Versão 2.0:

*   **Sistema de Memória Isolado V2:** Implementação completamente nova com persistência por usuário, independente da sessão. Inclui novas rotas API V2 para Chat Gemini, persistência de histórico por `user_id` e comandos de memória aprimorados.
*   **Funcionalidade "Lembre-se disso":** Sistema de salvamento explícito de informações pelo usuário, com detecção automática e extração de fatos baseada em palavras-chave como "lembre-se disso:", "importante:", "salvar para depois:".
*   **Correções Críticas:** Resolução de problemas de salvamento e acesso de memórias, bloqueio do banco de dados SQLite, APIs de Login totalmente funcionais e restauração do sistema de configuração de chaves de API.

## 4. Integração Front-end e BFF

A aplicação Iara Flow opera com uma arquitetura clara onde o front-end (interface de usuário) interage com o BFF (Iara Flow API) para orquestrar as operações de IA e gerenciar os dados. O front-end envia requisições ao BFF, que por sua vez, se comunica com os provedores de IA (Gemini, OpenAI, etc.) e o banco de dados SQLite para processar as solicitações e retornar os resultados ao front-end.

Por exemplo, ao arrastar e soltar um "Sentiment Analyzer" no fluxo, o front-end configura visualmente essa etapa. Quando o fluxo é executado, o BFF recebe a instrução, interage com o serviço de análise de sentimento (que pode ser um provedor de IA externo) e gerencia a memória associada a essa operação, persistindo os resultados no SQLite.

## 5. Conclusão

A Iara Flow é uma aplicação robusta e bem arquitetada, projetada para facilitar a prototipagem e o gerenciamento de fluxos de trabalho com agentes de IA. A combinação de um front-end intuitivo e um BFF poderoso com um sistema de memória avançado e integração multi-provedor a torna uma ferramenta valiosa para desenvolvedores e pesquisadores que trabalham com inteligência artificial. A versão 2.0 demonstra um compromisso contínuo com a melhoria da persistência de dados e a usabilidade do sistema de memória.

