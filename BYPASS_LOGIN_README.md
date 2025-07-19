# Bypass de Login - Modo Desenvolvimento

## Resumo das Modificações

Foi implementado um sistema de bypass de login que permite aos desenvolvedores escolher entre fazer login real ou usar um usuário mock durante o desenvolvimento.

## Funcionalidades Implementadas

### 1. Botão "Usar Usuário Mock"
- Aparece apenas em modo de desenvolvimento
- Permite login instantâneo sem necessidade de credenciais
- Cria um usuário mock com dados pré-definidos

### 2. Detecção Automática do Modo Desenvolvimento
- Ativado automaticamente quando `import.meta.env.DEV` é true (modo dev do Vite)
- Pode ser forçado através da variável de ambiente `VITE_ENABLE_MOCK_LOGIN=true`

### 3. Usuário Mock
- **ID**: 999
- **Username**: usuario_mock
- **Email**: mock@exemplo.com
- **Sessão**: Token mock com validade de 24 horas

## Arquivos Modificados

### 1. `src/components/auth/LoginForm.tsx`
- Adicionado botão "Usar Usuário Mock"
- Implementada função `handleMockLogin()`
- Adicionada detecção de modo desenvolvimento
- Interface visual com separador "Modo Desenvolvimento"

### 2. `src/contexts/AuthContext.tsx`
- Adicionada função `loginWithMock()` na interface
- Implementada lógica de login mock
- Modificada função `checkAuth()` para lidar com usuários mock
- Atualizada função `logout()` para limpar dados mock
- Adicionado suporte ao flag `is_mock_user` no localStorage

### 3. `.env.example` (novo arquivo)
- Arquivo de exemplo com variáveis de ambiente
- Inclui `VITE_ENABLE_MOCK_LOGIN` para controle manual

## Como Usar

### Modo Automático (Desenvolvimento)
1. Execute `npm run dev`
2. Acesse a página de login
3. Clique no botão "Usar Usuário Mock"
4. Será redirecionado automaticamente para a aplicação

### Modo Manual (Produção com Flag)
1. Crie um arquivo `.env` baseado no `.env.example`
2. Defina `VITE_ENABLE_MOCK_LOGIN=true`
3. Execute a aplicação
4. O botão mock estará disponível

## Segurança

- O botão mock só aparece em modo desenvolvimento ou com flag específica
- Dados do usuário mock são claramente identificados no localStorage
- Não interfere com o sistema de autenticação real
- Pode ser facilmente desabilitado para produção

## Dados Armazenados (Mock)

Quando o usuário mock é usado, os seguintes dados são salvos no localStorage:
- `session_token`: Token mock único
- `user_id`: 999
- `expires_at`: Data de expiração (24h)
- `is_mock_user`: true (flag identificadora)

## Logout

O logout funciona normalmente para usuários mock, limpando todos os dados do localStorage, incluindo a flag `is_mock_user`.

## Compatibilidade

- Totalmente compatível com o sistema de autenticação existente
- Não quebra funcionalidades existentes
- Pode ser removido facilmente se necessário

